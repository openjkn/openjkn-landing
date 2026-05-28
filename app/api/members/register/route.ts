import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  try {
    const { name, email, organization, role, motivation } = await request.json()

    // 1. Basic Validations
    if (!name || name.trim().length === 0) {
      return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 })
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    const cleanName = name.trim()
    const cleanEmail = email.trim().toLowerCase()
    const cleanOrg = (organization || '').trim()
    const cleanRole = (role || '').trim()
    const cleanMotivation = (motivation || '').trim()

    // 2. Check for duplicate registration
    const checkDup = await query('SELECT id FROM members WHERE email = $1', [cleanEmail])
    if (checkDup.rowCount && checkDup.rowCount > 0) {
      return NextResponse.json(
        { error: 'An applicant with this email is already registered in our Working Group!' },
        { status: 400 }
      )
    }

    // 3. Insert into PostgreSQL
    const result = await query(
      `INSERT INTO members (name, email, organization, role, motivation) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [cleanName, cleanEmail, cleanOrg, cleanRole, cleanMotivation]
    )

    return NextResponse.json({
      success: true,
      message: 'Welcome to the OpenJKN Working Group! Your registration has been received.',
      member: result.rows[0]
    })
  } catch (err: any) {
    console.error('Error during member registration:', err)
    return NextResponse.json({ error: err.message || 'Registration failed. Please try again.' }, { status: 500 })
  }
}
