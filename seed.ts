import { config } from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
config({ export: true });

const client = new MongoClient(Deno.env.get('MONGODB_URI') || '');
try {
  await client.connect();
  const db = client.db('rad-keyshop');
  const licenses = db.collection('licenses');

  const testKeys = [
    { key: 'RADIANT-STANDARD-001', type: 'standard', used: false },
    { key: 'RADIANT-STANDARD-002', type: 'standard', used: false },
    { key: 'RADIANT-STANDARD-003', type: 'standard', used: false },
    { key: 'RADIANT-LIFETIME-001', type: 'lifetime', used: false },
    { key: 'RADIANT-LIFETIME-002', type: 'lifetime', used: false },
    { key: 'RADIANT-LIFETIME-111', type: 'lifetime', used: false }
  ];

  await licenses.insertMany(testKeys);
  console.log('✅ Lifetime & Standard keys seeded!');
  await client.close();
} catch (err) {
  console.error('❌ DB Error:', err);
} 