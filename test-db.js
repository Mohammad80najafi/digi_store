const { MongoClient } = require('mongodb')

async function test() {
  const uri = 'mongodb+srv://najafimohammad2808_db_user:HTopDI0dHqhblasq@digi-store.gaxlgg4.mongodb.net/'
  
  try {
    const client = await MongoClient.connect(uri, { 
      serverSelectionTimeoutMS: 5000 
    })
    console.log('Connected successfully!')
    const db = client.db('digistore')
    const collections = await db.listCollections().toArray()
    console.log('Collections:', collections.map(c => c.name))
    await client.close()
  } catch (err) {
    console.error('Connection failed:')
    console.error(err.message)
    if (err.reason) console.error('Reason:', err.reason)
  }
}

test()
