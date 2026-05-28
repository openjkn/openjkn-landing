import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query(
      'SELECT id, name, email, organization, role, motivation, created_at FROM members ORDER BY created_at DESC'
    )
    return NextResponse.json(result.rows)
  } catch (err: any) {
    console.error('Error fetching members from DB:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch members list' }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing member ID' }, { status: 400 })
    }

    const numericId = parseInt(id, 10)
    if (isNaN(numericId)) {
      return NextResponse.json({ error: 'Invalid member ID' }, { status: 400 })
    }

    const result = await query('DELETE FROM members WHERE id = $1 RETURNING id', [numericId])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: `Member with ID ${id} not found` }, { status: 404 })
    }

    return NextResponse.json({ success: true, deletedId: numericId })
  } catch (err: any) {
    console.error('Error deleting member from DB:', err)
    return NextResponse.json({ error: err.message || 'Failed to delete member' }, { status: 500 })
  }
}
