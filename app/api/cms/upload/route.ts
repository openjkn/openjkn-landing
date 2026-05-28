import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Ensure public/uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate a safe unique name to prevent collisions
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
    const filename = `${timestamp}_${sanitizedName}`

    // Write file
    const filePath = path.join(uploadsDir, filename)
    await fs.writeFile(filePath, buffer)

    console.log(`Image saved locally to: ${filePath}`)

    return NextResponse.json({
      success: true,
      url: `/uploads/${filename}`,
      name: file.name
    })
  } catch (err: any) {
    console.error('Error in local file upload API:', err)
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 })
  }
}
