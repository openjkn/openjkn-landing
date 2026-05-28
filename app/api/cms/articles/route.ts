import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

// Helper to sanitize slug
function sanitizeSlug(slug: string): string {
  if (!slug) return ''
  return slug.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()
}

export async function GET() {
  try {
    const result = await query(
      'SELECT id, slug, title, excerpt, content, image_url, published, published_at, created_at, updated_at FROM articles ORDER BY published_at DESC'
    )
    return NextResponse.json(result.rows)
  } catch (err: any) {
    console.error('Error fetching articles from DB:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch articles' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { id, slug: rawSlug, title, excerpt, content, image_url, published } = await request.json()

    if (!rawSlug || !title || !content) {
      return NextResponse.json({ error: 'Missing required fields: slug, title, and content' }, { status: 400 })
    }

    const slug = sanitizeSlug(rawSlug)
    if (!slug) {
      return NextResponse.json({ error: 'Invalid slug. Use alphanumeric and hyphens.' }, { status: 400 })
    }

    const isPublished = published !== undefined ? published : true
    const cleanImageUrl = image_url || '/icon.png'

    if (id) {
      // 1. UPDATE Article
      const result = await query(
        `UPDATE articles 
         SET slug = $1, title = $2, excerpt = $3, content = $4, image_url = $5, published = $6, updated_at = NOW() 
         WHERE id = $7 RETURNING *`,
        [slug, title, excerpt || '', content, cleanImageUrl, isPublished, id]
      )

      if (result.rowCount === 0) {
        return NextResponse.json({ error: `Article with ID ${id} not found` }, { status: 404 })
      }

      return NextResponse.json({ success: true, article: result.rows[0] })
    } else {
      // 2. CREATE Article
      // Check duplicate slug
      const dupCheck = await query('SELECT id FROM articles WHERE slug = $1', [slug])
      if (dupCheck.rowCount && dupCheck.rowCount > 0) {
        return NextResponse.json({ error: `An article with slug "${slug}" already exists.` }, { status: 400 })
      }

      const result = await query(
        `INSERT INTO articles (slug, title, excerpt, content, image_url, published) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [slug, title, excerpt || '', content, cleanImageUrl, isPublished]
      )

      return NextResponse.json({ success: true, article: result.rows[0] })
    }
  } catch (err: any) {
    console.error('Error saving article to DB:', err)
    return NextResponse.json({ error: err.message || 'Failed to save article' }, { status: 500 })
  }
}
