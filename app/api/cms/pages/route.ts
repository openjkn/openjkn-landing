import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

const CONFIG_PATH = path.join(process.cwd(), 'lib', 'wiki-config.json')

export async function GET() {
  try {
    let wikiOrder = []
    try {
      const data = await fs.readFile(CONFIG_PATH, 'utf-8')
      wikiOrder = JSON.parse(data)
    } catch (e) {
      // Fallback defaults
      wikiOrder = [
        { name: 'wiki', title: 'Overview' },
        { name: 'adaptation-logic', title: 'Adaptation Logic' },
        { name: 'technical-architecture', title: 'Technical Architecture' }
      ]
      await fs.writeFile(CONFIG_PATH, JSON.stringify(wikiOrder, null, 2), 'utf-8')
    }
    return NextResponse.json(wikiOrder)
  } catch (err: any) {
    console.error('Error fetching wiki config:', err)
    return NextResponse.json({ error: err.message || 'Failed to fetch wiki config' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const wikiOrder = await request.json()
    if (!Array.isArray(wikiOrder)) {
      return NextResponse.json({ error: 'Invalid configuration payload' }, { status: 400 })
    }
    await fs.writeFile(CONFIG_PATH, JSON.stringify(wikiOrder, null, 2), 'utf-8')
    return NextResponse.json({ success: true, data: wikiOrder })
  } catch (err: any) {
    console.error('Error saving wiki config:', err)
    return NextResponse.json({ error: err.message || 'Failed to save wiki config' }, { status: 500 })
  }
}
