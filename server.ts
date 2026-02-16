import { Application } from '@oak/oak';
import { config } from 'dotenv';
import { MongoClient } from 'mongodb';
import { join } from 'https://deno.land/std@0.224.0/path/mod.ts';
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';

// Load environment variables
config({ export: true });

const app = new Application();

// Add CORS middleware
app.use(oakCors());

// MongoDB connection
const mongoUri = Deno.env.get('MONGODB_URI') || '';
console.log('🔍 MongoDB URI loaded:', mongoUri ? 'Yes (length: ' + mongoUri.length + ')' : 'No');

const client = new MongoClient(mongoUri);
let mongoConnected = false;
try {
  console.log('🔄 Attempting MongoDB connection...');
  await client.connect();
  console.log('✅ Connected to MongoDB');
  mongoConnected = true;
} catch (err) {
  console.error('❌ MongoDB connection failed:', err);
  console.error('Error details:', err instanceof Error ? err.message : String(err));
  console.error('Server will start but database operations will fail');
}

// Middleware
app.use(async (ctx, next) => {
  // Serve static files
  if (ctx.request.url.pathname.startsWith('/') && 
      (ctx.request.url.pathname === '/' || 
       ctx.request.url.pathname.endsWith('.html') || 
       ctx.request.url.pathname.endsWith('.css'))) {
    const filePath = join(Deno.cwd(), 'public', ctx.request.url.pathname === '/' ? 'index.html' : ctx.request.url.pathname);
    try {
      const file = await Deno.readFile(filePath);
      const ext = filePath.split('.').pop();
      const contentType = ext === 'css' ? 'text/css' : 'text/html';
      ctx.response.headers.set('Content-Type', contentType);
      ctx.response.body = file;
      return;
    } catch {
      // File not found, continue to next middleware
    }
  }
  await next();
});

// Import and use checkout routes
import { checkoutRouter, initializeDB } from './routes/checkout.ts';
if (mongoConnected) {
  initializeDB(client);
} else {
  console.warn('⚠️  Database not initialized - checkout routes will fail');
}
app.use(checkoutRouter.routes());
app.use(checkoutRouter.allowedMethods());

// Start server
const PORT = parseInt(Deno.env.get('PORT') || '3000');
console.log(`🟢 Live at http://localhost:${PORT}`);
await app.listen({ port: PORT }); 