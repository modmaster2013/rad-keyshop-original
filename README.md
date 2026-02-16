# Rad Keyshop - Deno Version

A license key shop built with Deno, Oak framework, and MongoDB.

## Prerequisites

- [Deno](https://deno.land/) installed on your system
- MongoDB database
- Stripe account for payments

## Setup

1. **Install Deno** (if not already installed):
   ```bash
   # Windows (PowerShell)
   iwr https://deno.land/x/install/install.ps1 -useb | iex
   
   # macOS/Linux
   curl -fsSL https://deno.land/x/install/install.sh | sh
   ```

2. **Create a `.env` file** in the project root:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rad-keyshop
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   PORT=3000
   ```

3. **Seed the database** with test license keys:
   ```bash
   deno run --allow-net --allow-env --allow-read seed.ts
   ```

## Running the Application

### Development Mode (with auto-reload)
```bash
deno run --allow-net --allow-env --allow-read --watch server.ts
```

### Production Mode
```bash
deno run --allow-net --allow-env --allow-read server.ts
```

### Using deno.json scripts
```bash
# Development
deno task dev

# Production
deno task start

# Seed database
deno task seed
```

## Features

- ✅ Stripe payment integration
- ✅ MongoDB database with Deno driver
- ✅ License key management
- ✅ User registration
- ✅ Static file serving
- ✅ Environment variable support

## Project Structure

```
rad-keyshop/
├── deno.json          # Deno configuration
├── server.ts          # Main server file
├── seed.ts            # Database seeding script
├── routes/
│   └── checkout.ts    # Payment and checkout routes
├── public/
│   ├── index.html     # Main page
│   └── style.css      # Styles
└── README.md          # This file
```

## Key Differences from Node.js Version

- Uses **Oak** framework instead of Express
- **ES6 imports** instead of CommonJS require()
- **Deno's built-in MongoDB driver** instead of Mongoose
- **TypeScript** by default
- **No package.json** - dependencies managed via import maps in deno.json
- **Built-in security** with explicit permissions

## Permissions

The application requires the following Deno permissions:
- `--allow-net`: For HTTP server and database connections
- `--allow-env`: For environment variable access
- `--allow-read`: For reading static files

## Troubleshooting

1. **MongoDB Connection Issues**: Ensure MongoDB is running and the connection string is correct
2. **Stripe Errors**: Verify your Stripe secret key is valid
3. **Permission Denied**: Make sure to include all required permissions when running Deno commands 