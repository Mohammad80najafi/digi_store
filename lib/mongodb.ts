import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const MONGODB_DB = process.env.MONGODB_DB || 'digistore'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{
  client: MongoClient
  db: Db
}> {
  if (cachedClient && cachedDb) {
    console.log('[MongoDB] Using cached connection')
    return { client: cachedClient, db: cachedDb }
  }

  console.log('[MongoDB] Connecting to database...')

  try {
    const client = await MongoClient.connect(MONGODB_URI)
    const db = client.db(MONGODB_DB)

    cachedClient = client
    cachedDb = db

    console.log('[MongoDB] Connected successfully')
    console.log(`[MongoDB] Database: ${MONGODB_DB}`)
    console.log(`[MongoDB] URI: ${MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:***@')}`)

    return { client, db }
  } catch (error) {
    console.error('[MongoDB] Connection failed:', error)
    throw error
  }
}
