import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from '../config/env.js';
import logger from '../utils/logger.js';

let genAI = null;
let model = null;

// Initialize Gemini AI
const initializeGemini = () => {
  try {
    const apiKey = config.geminiApiKey?.trim();
    if (apiKey && apiKey.length > 0) {
      genAI = new GoogleGenerativeAI(apiKey);
      model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
      logger.info('✅ Gemini AI initialized successfully');
      return true;
    } else {
      logger.warn('⚠️ Gemini API key not found or empty. Chatbot will use intelligent fallback responses.');
      return false;
    }
  } catch (error) {
    logger.error('❌ Failed to initialize Gemini AI:', error.message);
    return false;
  }
};

// Initialize on service load
const isInitialized = initializeGemini();

export const geminiService = {
  generateResponse: async (prompt) => {
    if (!isInitialized || !model) {
      throw new Error('Gemini AI not initialized');
    }

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text || text.trim().length === 0) {
        throw new Error('Empty response from Gemini');
      }

      return text.trim();
    } catch (error) {
      logger.error('Gemini API error:', error.message);
      throw error;
    }
  },

  isAvailable: () => isInitialized && model !== null
};
