import express from 'express';
import { chatbotController } from '../controllers/chatbot.controller.js';

const router = express.Router();

// Chatbot routes - placeholder
router.post('/message', chatbotController.sendMessage);

export default router;
