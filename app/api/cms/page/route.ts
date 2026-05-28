import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const WIKI_DIR = path.join(process.cwd(), 'app', '(wiki)')
const CONFIG_PATH = path.join(process.cwd(), 'lib', 'wiki-config.json')

// Helper to validate and clean slug to prevent directory traversal
function sanitizeSlug(slug: string): string {
  if (!slug) return ''
  // Keep only letters, numbers, and hyphens. Completely reject dots or slashes.
  return slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
}

export async function GET(request: Request) {
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

    const filePath = path.join(WIKI_DIR, slug, 'page.mdx')
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      return NextResponse.json({ slug, content })
    } catch (e) {
      return NextResponse.json({ error: `Page with slug "${slug}" not found` }, { status: 404 })
    }
  } catch (err: any) {
    console.error('Error loading wiki page:', err)
    return NextResponse.json({ error: err.message || 'Failed to load page' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { slug: rawSlug, content, title, oldSlug: rawOldSlug } = await request.json()
    
    if (!rawSlug || !content || !title) {
      return NextResponse.json({ error: 'Missing required fields: slug, title, and content' }, { status: 400 })
    }

    const slug = sanitizeSlug(rawSlug)
    const oldSlug = rawOldSlug ? sanitizeSlug(rawOldSlug) : ''

    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug format. Use only lowercase letters, numbers, and hyphens.' }, { status: 400 })
    }

    // Load current config to update it
    let wikiOrder: { name: string; title: string }[] = []
    try {
      const configData = await fs.readFile(CONFIG_PATH, 'utf-8')
      wikiOrder = JSON.parse(configData)
    } catch (e) {
      wikiOrder = []
    }

    // Handle slug renaming (Move folder if slug changed)
    if (oldSlug && oldSlug !== slug) {
      const oldFolder = path.join(WIKI_DIR, oldSlug)
      const newFolder = path.join(WIKI_DIR, slug)
      
      // Check if old folder actually exists
      let oldExists = false
      try {
        await fs.access(oldFolder)
        oldExists = true
      } catch (e) {}

      if (oldExists) {
        // Move directory
        await fs.rename(oldFolder, newFolder)
      } else {
        // Create new directory if old didn't exist for some reason
        await fs.mkdir(newFolder, { recursive: true })
      }

      // Update config list (rename occurrences)
      wikiOrder = wikiOrder.map(item => {
        if (item.name === oldSlug) {
          return { name: slug, title: title }
        }
        return item
      })
    } else {
      // Just write/update the file directly
      const folderPath = path.join(WIKI_DIR, slug)
      await fs.mkdir(folderPath, { recursive: true })

      // Check if slug already exists in config, otherwise append
      const existsIndex = wikiOrder.findIndex(item => item.name === slug)
      if (existsIndex >= 0) {
        wikiOrder[existsIndex].title = title
      } else {
        wikiOrder.push({ name: slug, title: title })
      }
    }

    // Write the MDX file content
    const filePath = path.join(WIKI_DIR, slug, 'page.mdx')
    await fs.writeFile(filePath, content, 'utf-8')

    // Write updated config
    await fs.writeFile(CONFIG_PATH, JSON.stringify(wikiOrder, null, 2), 'utf-8')

    return NextResponse.json({ success: true, slug, title })
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

    // Prevent deleting the primary overview page if you want safety
    if (slug === 'wiki') {
      return NextResponse.json({ error: 'Cannot delete the primary Wiki Overview page.' }, { status: 400 })
    }

    const folderPath = path.join(WIKI_DIR, slug)
    const filePath = path.join(folderPath, 'page.mdx')

    // Remove file and directory
    try {
      await fs.unlink(filePath)
      await fs.rmdir(folderPath)
    } catch (e) {
      // Folder or file might already be gone, let's proceed to config cleanup
    }

    // Remove from configuration
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
