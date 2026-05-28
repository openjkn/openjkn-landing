import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

type RouteContext = {
  params: Promise<{ id: string }>
}

export async function DELETE(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    if (!id) {
      return NextResponse.json({ error: 'Missing article ID' }, { status: 400 })
    }

    const numericId = parseInt(id, 10)
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 })
    }

    const result = await query('DELETE FROM articles WHERE id = $1 RETURNING id', [numericId])
    
    if (result.rowCount === 0) {
      return NextResponse.json({ error: `Article with ID ${id} not found` }, { status: 404 })
    }

    return NextResponse.json({ success: true, deletedId: numericId })
  } catch (err: any) {
    console.error('Error deleting article from DB:', err)
    return NextResponse.json({ error: err.message || 'Failed to delete article' }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  context: RouteContext
) {
  try {
    const { id } = await context.params
    if (!id) {
      return NextResponse.json({ error: 'Missing article ID' }, { status: 400 })
    }

    const numericId = parseInt(id, 10)
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid article ID' }, { status: 400 })
    }

    const result = await query(
      'SELECT id, slug, title, excerpt, content, image_url, published, published_at, created_at FROM articles WHERE id = $1',
      [numericId]
    )

    if (result.rowCount === 0) {
      return NextResponse.json({ error: `Article with ID ${id} not found` }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (err: any) {
    console.error('Error fetching article from DB:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch article' }, { status: 500 })
  }
}
