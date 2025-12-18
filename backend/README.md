# Backend - Humanitarian NGO API

Node.js + Express backend with Gemini API integration for chatbot support.

## Setup

1. Copy `.env.example` to `.env`
2. Add your Gemini API key to `.env`
3. Install dependencies: `npm install`
4. Run: `npm run dev`

## Environment Variables

- `PORT` - Server port (default: 5000)
- `GEMINI_API_KEY` - Your Gemini API key
- `NODE_ENV` - Environment (development/production)

## Structure

- `routes/` - API route definitions
- `controllers/` - Request handlers
- `services/` - Business logic
- `middlewares/` - Express middlewares
- `utils/` - Utility functions
- `config/` - Configuration files
