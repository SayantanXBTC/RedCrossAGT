import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import chatbotRoutes from './routes/chatbot.routes.js';
import authRoutes from './routes/auth.routes.js';
import volunteerRoutes from './routes/volunteer.routes.js';
import memberRoutes from './routes/member.routes.js';
import contactRoutes from './routes/contact.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import errorMiddleware from './middlewares/error.middleware.js';
import logger from './utils/logger.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use('/api/chatbot', chatbotRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/analytics', analyticsRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Indian Red Cross Society - Tripura API Server',
    timestamp: new Date().toISOString()
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Indian Red Cross Society - Tripura State Branch API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile (requires auth)'
      },
      volunteers: {
        create: 'POST /api/volunteers',
        list: 'GET /api/volunteers (admin only)',
        get: 'GET /api/volunteers/:id (admin only)',
        updateStatus: 'PATCH /api/volunteers/:id/status (admin only)'
      },
      members: {
        create: 'POST /api/members',
        list: 'GET /api/members (admin only)',
        get: 'GET /api/members/:id (admin only)',
        updateStatus: 'PATCH /api/members/:id/status (admin only)'
      },
      contact: {
        create: 'POST /api/contact',
        list: 'GET /api/contact (admin only)',
        get: 'GET /api/contact/:id (admin only)',
        updateStatus: 'PATCH /api/contact/:id/status (admin only)'
      },
      chatbot: {
        message: 'POST /api/chatbot/message'
      },
      analytics: {
        dashboard: 'GET /api/analytics/dashboard (admin only)',
        volunteers: 'GET /api/analytics/volunteers (admin only)',
        members: 'GET /api/analytics/members (admin only)'
      }
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`📍 API Documentation: http://localhost:${PORT}/api`);
  logger.info(`💚 Health Check: http://localhost:${PORT}/health`);
});

export default app;
