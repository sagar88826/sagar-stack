````markdown
# Sagar Stack

A modern full-stack TypeScript monorepo template built with Turborepo.

## 🚀 Tech Stack

### Frontend (Client)

- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **tRPC** for end-to-end typesafe APIs
- **TanStack Query** (React Query) for data fetching and caching
- **TanStack Table** for powerful and flexible table management
- **React Helmet Async** for managing document head metadata (title, meta tags, etc.)

### Backend (Server)

- **Express.js** with TypeScript
- **tRPC** for type-safe API endpoints
- **Helmet** for setting security HTTP headers
- **Compression** for Gzip compression of responses
- **CORS** with configurable origins for cross-origin resource sharing
- **Rate Limiting** to protect against abuse and excessive requests
- **Cookie Parser** for parsing cookies in incoming requests
- **Morgan** for HTTP request logging

### Development & Build Tools

- **Turborepo** for monorepo management, enabling efficient builds and caching
- **pnpm** as the package manager for fast and efficient dependency management
- **TypeScript** for static typing and improved code maintainability
- **ESLint** for code linting and enforcing coding standards
- **Prettier** for code formatting and consistent style

## 🚦 Getting Started

1. Clone the repository:

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start development servers:

   ```bash
   pnpm dev
   ```

   This command will likely start both the client and server in development mode, thanks to Turborepo.

## 🔧 Environment Variables

### Client (`.env`)

- `VITE_API_URL`: URL for the tRPC API (e.g., `http://localhost:8173/trpc`)

### Server (`.env`)

- `PORT`: Server port (default: `8173`)
- `CLIENT_URL`: Comma-separated list of allowed CORS origins (e.g., `http://localhost:3000`)
- `NODE_ENV`: Environment mode (`development` or `production`)

## 🛠️ Development Features

- Full TypeScript support across the entire stack
- Hot Module Replacement (HMR) for fast and efficient development
- End-to-end type safety with tRPC, ensuring type consistency between frontend and backend
- Automatic API request batching with tRPC for optimized performance
- Centralized error handling on the server and client
- Production-ready security headers implemented with Helmet
- API rate limiting to prevent abuse
- Gzip compression enabled for improved performance
- Development proxy configuration (likely handled by Vite)

## 📦 Production Build

Build all applications:

```bash
pnpm build
```

This command will use Turborepo to efficiently build both the client and server applications for production.

## 🔒 Security Features

- Helmet.js security headers to protect against common web vulnerabilities
- Rate limiting to prevent abuse and protect against denial-of-service attacks
- CORS protection to restrict access to the API from unauthorized origins
- Secure cookie handling (ensure appropriate settings for cookies)
- Request compression to reduce bandwidth usage and improve performance
- Robust error handling middleware to prevent information leakage
````
