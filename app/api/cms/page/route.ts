import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const WIKI_DIR = path.join(process.cwd(), 'app', '(wiki)')
const CONFIG_PATH = path.join(process.cwd(), 'lib', 'wiki-config.json')

function sanitizeSlug(slug: string): string {
  if (!slug) return ''
  return slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawSlug = searchParams.get('slug')
    const locale = searchParams.get('locale') || 'id'
    
    if (!rawSlug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 })
    }

    const slug = sanitizeSlug(rawSlug)
    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    const filename = locale === 'en' ? 'page.en.mdx' : 'page.mdx'
    const filePath = path.join(WIKI_DIR, slug, filename)
    
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      return NextResponse.json({ slug, content, locale })
    } catch (e) {
      // Fallback: If English translation doesn't exist, return a helpful notice or default file
      if (locale === 'en') {
        return NextResponse.json({
          slug,
          content: `# ${slug.toUpperCase()} (EN Translation Required)\n\nThis page does not have an English translation yet. Click write mode to add one!`,
          locale,
          notFound: true
        })
      }
      return NextResponse.json({ error: `Page with slug "${slug}" not found` }, { status: 404 })
    }
  } catch (err: any) {
    console.error('Error loading wiki page:', err)
    return NextResponse.json({ error: err.message || 'Failed to load page' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { slug: rawSlug, content, title, oldSlug: rawOldSlug, locale = 'id' } = await request.json()
    
    if (!rawSlug || !content || !title) {
      return NextResponse.json({ error: 'Missing required fields: slug, title, and content' }, { status: 400 })
    }

    const slug = sanitizeSlug(rawSlug)
    const oldSlug = rawOldSlug ? sanitizeSlug(rawOldSlug) : ''

    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug format.' }, { status: 400 })
    }

    let wikiOrder: { name: string; title: string }[] = []
    try {
      const configData = await fs.readFile(CONFIG_PATH, 'utf-8')
      wikiOrder = JSON.parse(configData)
    } catch (e) {
      wikiOrder = []
    }

    // Handle slug renaming (Folder movement)
    if (oldSlug && oldSlug !== slug) {
      const oldFolder = path.join(WIKI_DIR, oldSlug)
      const newFolder = path.join(WIKI_DIR, slug)
      
      let oldExists = false
      try {
        await fs.access(oldFolder)
        oldExists = true
      } catch (e) {}

      if (oldExists) {
        await fs.rename(oldFolder, newFolder)
      } else {
        await fs.mkdir(newFolder, { recursive: true })
      }

      // Rename inside wiki config
      wikiOrder = wikiOrder.map(item => {
        if (item.name === oldSlug) {
          return { name: slug, title: title }
        }
        return item
      })
    } else {
      const folderPath = path.join(WIKI_DIR, slug)
      await fs.mkdir(folderPath, { recursive: true })

      const existsIndex = wikiOrder.findIndex(item => item.name === slug)
      if (existsIndex >= 0) {
        // Only update title in main config if saving default (ID) locale
        if (locale === 'id') {
          wikiOrder[existsIndex].title = title
        }
      } else {
        wikiOrder.push({ name: slug, title: title })
      }
    }

    // Determine correct filename based on locale selector
    const filename = locale === 'en' ? 'page.en.mdx' : 'page.mdx'
    const filePath = path.join(WIKI_DIR, slug, filename)
    await fs.writeFile(filePath, content, 'utf-8')

    // Write updated config
    await fs.writeFile(CONFIG_PATH, JSON.stringify(wikiOrder, null, 2), 'utf-8')

    return NextResponse.json({ success: true, slug, title, locale })
  } catch (err: any) {
    console.error('Error saving wiki page:', err)
    return NextResponse.json({ error: err.message || 'Failed to save page' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawSlug = searchParams.get('slug')
    
    if (!rawSlug) {
      return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 })
    }

    const slug = sanitizeSlug(rawSlug)
    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug' }, { status: 400 })
    }

    if (slug === 'wiki') {
      return NextResponse.json({ error: 'Cannot delete the primary Wiki Overview page.' }, { status: 400 })
    }

    const folderPath = path.join(WIKI_DIR, slug)
    
    // Delete both ID and EN localizations
    try {
      await fs.unlink(path.join(folderPath, 'page.mdx')).catch(() => {})
      await fs.unlink(path.join(folderPath, 'page.en.mdx')).catch(() => {})
      await fs.rmdir(folderPath)
    } catch (e) {}

    // Clean up config file
    let wikiOrder: { name: string; title: string }[] = []
    try {
      const configData = await fs.readFile(CONFIG_PATH, 'utf-8')
      wikiOrder = JSON.parse(configData)
    } catch (e) {}

    wikiOrder = wikiOrder.filter(item => item.name !== slug)
    await fs.writeFile(CONFIG_PATH, JSON.stringify(wikiOrder, null, 2), 'utf-8')

    return NextResponse.json({ success: true, deletedSlug: slug })
  } catch (err: any) {
    console.error('Error deleting wiki page:', err)
    return NextResponse.json({ error: err.message || 'Failed to delete page' }, { status: 500 })
  }
}
