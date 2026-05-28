import { Pool } from 'pg'

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/openjkn_landing'

export const pool = new Pool({
  connectionString,
  ssl: false // since it's a local postgresql instance
})

let dbInitialized = false

export async function initDb() {
  if (dbInitialized) return

  const client = await pool.connect()
  try {
    // 1. Create members table
    await client.query(`
      CREATE TABLE IF NOT EXISTS members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        organization VARCHAR(255),
        role VARCHAR(100),
        motivation TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 2. Create articles table
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title VARCHAR(255) NOT NULL,
        excerpt TEXT,
        content TEXT NOT NULL,
        image_url VARCHAR(512),
        published BOOLEAN DEFAULT TRUE,
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // 3. Seed initial welcome article if articles table is empty
    const checkArticles = await client.query('SELECT count(*) FROM articles')
    if (parseInt(checkArticles.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO articles (slug, title, excerpt, content, image_url)
        VALUES (
          'welcome-to-openjkn-sandbox',
          'Welcome to the OpenJKN Digital Sandbox!',
          'Discover how OpenJKN accelerates health insurance policy simulations and digital health innovations in Indonesia using openIMIS.',
          '# Welcome to OpenJKN!\\n\\nWe are thrilled to launch the OpenJKN Initiative! OpenJKN serves as a state-of-the-art digital sandbox for policy simulation, academic research, and interoperability testing based on the global openIMIS engine.\\n\\n## Key Features of the Sandbox\\n\\n1. **Tiered Referral Simulation**: Model how patient referrals cascade from Primary Care (Puskesmas) to Advanced Care (FKRTL).\\n2. **HL7 FHIR Interoperability**: Prototype and validate SATUSEHAT payloads safely without interfering with real production servers.\\n3. **Capitation and Case-Mix Simulation**: Study complex health financing variables under realistic Indonesian rules.\\n\\n> [!NOTE]\\n> This article is stored in your local PostgreSQL database! You can edit, delete, or create more articles directly from the newly implemented CMS dashboard at "/cms".\\n\\nStay tuned for upcoming working group events and training programs. Jah bless interoperability!',
          '/icon.png'
        );
      `)
    }

    dbInitialized = true
    console.log('PostgreSQL database initialized successfully.')
  } catch (err) {
    console.error('Failed to initialize PostgreSQL database:', err)
  } finally {
    client.release()
  }
}

export async function query(text: string, params?: any[]) {
  await initDb()
  return pool.query(text, params)
}
