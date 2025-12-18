import { geminiService } from '../services/gemini.service.js';
import logger from '../utils/logger.js';

const CONTEXT_PROMPT = `You are Shiro, a friendly and knowledgeable AI assistant for the Indian Red Cross Society (IRCS), Tripura State Branch. You're passionate about humanitarian work and love helping people connect with Red Cross services in Tripura.

PERSONALITY & TONE:
- Warm, friendly, and approachable - like talking to a helpful friend
- Enthusiastic about Red Cross mission and community service
- Empathetic and understanding when people share concerns
- Use conversational language with appropriate emojis
- Ask follow-up questions to better understand user needs
- Remember context from the conversation when possible
- Use "I" statements and personal touches (e.g., "I'd be happy to help you with...")

CONVERSATION STYLE:
- Start responses with acknowledgment (e.g., "That's a great question!", "I understand you're interested in...")
- Use transitional phrases to make responses flow naturally
- End with helpful next steps or questions to continue the conversation
- Use varied sentence structures - not just bullet points
- Include encouraging and supportive language

TOPICS YOU EXCEL AT:
- Blood donation programs and how to get involved
- Volunteer opportunities and the application process
- Disaster relief services and emergency preparedness
- First aid training and health programs
- Membership benefits and how to join
- Community outreach initiatives
- Red Cross history and mission in Tripura

CONVERSATION EXAMPLES:
Instead of: "Blood donation information: Visit camps, contact us, bring ID"
Say: "That's wonderful that you're interested in donating blood! 🩸 It's such a meaningful way to help save lives in our Tripura community. We organize regular blood donation camps, and I'd love to help you find the next one near you. Have you donated blood before, or would this be your first time?"

STRICT BOUNDARIES (maintain friendly tone):
- If asked about non-Red Cross topics: "I'd love to chat about that, but I'm specifically here to help with Red Cross Tripura services! Is there anything about our humanitarian work you'd like to know?"
- If uncertain about information: "That's a great question, but I want to make sure I give you the most accurate information. Let me connect you with our team who can help you properly."

EMERGENCY SITUATIONS:
- Respond with immediate empathy and concern
- Provide calm, supportive guidance
- Always emphasize contacting emergency services first
- Offer Red Cross support as additional help

OFFICIAL CONTACT INFO (use naturally in conversation):
- Location: Red Cross Bhavan, Agartala, Tripura 799001
- Phone: +91 9774137698 (mention as "our office number")
- Email: ircstrp@gmail.com
- Office Hours: Monday-Friday, 10 AM-5 PM

Remember: You're not just providing information - you're building connections and inspiring people to get involved with Red Cross Tripura's humanitarian mission! Always introduce yourself as Shiro when greeting new users.

User Query: `;

// Intelligent fallback response generator
const generateFallbackResponse = (message) => {
  // Keywords for different topics
  const keywords = {
    blood: ['blood', 'donate', 'donation', 'donor', 'bank'],
    volunteer: ['volunteer', 'join', 'help', 'work', 'participate'],
    disaster: ['disaster', 'emergency', 'relief', 'flood', 'cyclone', 'earthquake'],
    training: ['training', 'course', 'learn', 'first aid', 'skill'],
    contact: ['contact', 'phone', 'email', 'address', 'location'],
    membership: ['member', 'membership', 'join us', 'become'],
    services: ['service', 'program', 'activity', 'what do you do'],
    greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'namaste']
  };

  // Check for keywords and provide relevant responses
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => message.includes(word))) {
      switch (category) {
        case 'blood':
          return `Hi there! 🩸 I'm so glad you're interested in blood donation - it's one of the most impactful ways to help save lives in our Tripura community!

We organize regular blood donation camps throughout Agartala and other areas. It's actually quite simple to get involved! All you need is to be in good health and bring a valid ID with you.

I'd love to help you find the next camp near you. Are you looking to donate soon, or would you like to know more about the donation process first? 

You can also reach our team directly:
📞 Call us at +91 9774137698
📧 Email: ircstrp@gmail.com

What would be most helpful for you right now? 😊`;

        case 'volunteer':
          return `That's amazing! 🤝 I'm so excited you want to volunteer with us - we always need passionate people like you who want to make a real difference in Tripura!

There are so many ways you can get involved depending on what interests you most. Are you drawn to helping during emergencies, or maybe you'd prefer working with community health programs? We have opportunities in:

• Disaster relief (helping families during floods, cyclones)
• Blood donation drives (organizing camps, helping donors)
• Community health programs (health awareness, first aid)
• Training programs (teaching life-saving skills)
• Awareness campaigns (spreading our humanitarian message)

The best part? You'll meet incredible people and gain skills that last a lifetime! 

What type of volunteer work sounds most interesting to you? I can help you get started! You can reach our volunteer coordinator at 📞 +91 9774137698 or drop by our office at Red Cross Bhavan in Agartala.

Tell me, what motivated you to want to volunteer? 😊`;

        case 'disaster':
          return `I understand you're asking about disaster relief - this is such important work that we're deeply committed to here in Tripura. 🚨

Living in Tripura, we know how floods, cyclones, and other emergencies can affect our communities. That's why our Red Cross team is always ready to help families when disasters strike.

We provide immediate support like emergency response teams, relief materials (food, water, blankets), evacuation help when needed, medical aid, and long-term rehabilitation support to help families rebuild.

Are you currently dealing with an emergency situation, or are you interested in learning about disaster preparedness for your family or community?

**If this is an emergency:** Please call 108 or 102 for immediate help first, then reach us at 📞 +91 9774137698

**For preparedness info:** I'd love to share tips on how to prepare your family for emergencies!

How can I best help you with disaster-related information? 💙`;

        case 'training':
          return `Oh, that's fantastic! 📚 I love that you're interested in learning life-saving skills - these trainings are some of my favorite programs because they truly empower people to help others!

We offer several really practical training programs that can make a huge difference in your community:

**First Aid certification** - Learn to handle medical emergencies (this one's super popular!)
**Disaster preparedness** - Know how to keep your family safe during emergencies
**Community health** - Become a health advocate in your neighborhood
**Volunteer orientation** - Perfect if you're thinking about joining our team
**Youth programs** - Great for students and young people

Which of these sounds most interesting to you? Are you looking to learn for personal knowledge, or maybe you're thinking about a career in healthcare or emergency services?

The trainings are really hands-on and practical - you'll leave feeling confident and prepared! 

Give us a call at 📞 +91 9774137698 during office hours (Mon-Fri, 10 AM-5 PM) and we can chat about upcoming sessions. What's your main goal with the training? 😊`;

        case 'contact':
          return `I'd be happy to help you get in touch with our team! 📞 We're always here to help and would love to hear from you.

Here's how you can reach us:

**Our office** is at Red Cross Bhavan in Agartala (Tripura 799001) - it's easy to find and we welcome visitors!

**Call us** at +91 9774137698 during office hours. Our team is really friendly and can help with any questions you have.

**Email us** at ircstrp@gmail.com if you prefer writing or have detailed questions.

**Office hours:** Monday through Friday, 10 AM to 5 PM (we're closed weekends, but emergencies are always handled!)

Is there something specific you'd like to discuss with our team? I might be able to help you right now, or I can let you know the best person to speak with when you call! 

What brings you to Red Cross today? 😊`;

        case 'membership':
          return `👥 **Membership Information**

Become a member of the Indian Red Cross Society, Tripura Branch and support our humanitarian mission.

**Membership benefits:**
• Be part of a noble cause
• Participate in community service
• Access to training programs
• Networking opportunities

**To apply for membership:**
📞 +91 9774137698
📧 ircstrp@gmail.com
🏢 Visit our office in Agartala

*Together, we can make Tripura a more resilient community.*`;

        case 'services':
          return `🏥 **Our Services**

The Indian Red Cross Society, Tripura Branch provides comprehensive humanitarian services:

**Main Services:**
• 🩸 Blood donation and blood banks
• 🚨 Disaster relief and emergency response
• 🏥 Community health and first aid
• 📚 Training and capacity building
• 🤝 Volunteer programs
• 👥 Membership and awareness campaigns

**Contact us to learn more:**
📞 +91 9774137698
📧 ircstrp@gmail.com`;

        case 'greeting':
          return `Hello there! 🙏 I'm Shiro, and I'm so happy you're here! Welcome to the Indian Red Cross Society - Tripura Branch family!

I absolutely love helping people learn about all the amazing humanitarian work we do right here in Tripura. Whether you're curious about getting involved, need our services, or just want to know more about what we do, I'm here for you!

I can chat with you about:
• **Blood donation** - such a meaningful way to save lives! 🩸
• **Volunteering** - join our incredible team of helpers 🤝
• **Emergency services** - we're here when disasters strike 🚨
• **Training programs** - learn life-saving skills 📚
• **Membership** - become part of our Red Cross family 👥
• **Any questions** about our work in the community!

What brings you to Red Cross today? Are you looking to help others, or is there something specific I can help you with? I'd love to hear your story! 😊

*If you need immediate help, our team is always available at 📞 +91 9774137698*`;

        default:
          break;
      }
    }
  }

  // Default response for unrecognized queries
  return `Hi there! 😊 Thanks for chatting with me! I'm Shiro, your Red Cross Tripura assistant, and I'm here to help you with anything related to our humanitarian work in Tripura.

I'd love to chat about our Red Cross services, but I want to make sure I give you the best information possible! I'm specially trained to help with:

• **Blood donation programs** - want to save lives? 🩸
• **Volunteer opportunities** - join our amazing team! 🤝  
• **Emergency and disaster relief** - we're here when you need us 🚨
• **Training programs** - learn valuable life skills 📚
• **Membership** - become part of our Red Cross family 👥
• **General questions** about our work in the community

Is there something specific about Red Cross Tripura you'd like to know? I'm here to help and would love to learn more about what interests you!

You can also reach our friendly team directly:
📞 +91 9774137698 | 📧 ircstrp@gmail.com
🏢 Red Cross Bhavan, Agartala

What would you like to explore first? 🌟`;
};

// Input validation and sanitization
const validateAndSanitizeMessage = (message) => {
  if (!message || typeof message !== 'string') {
    throw new Error('Invalid message format');
  }

  // Trim and limit message length
  const sanitized = message.trim();

  if (sanitized.length === 0) {
    throw new Error('Message cannot be empty');
  }

  if (sanitized.length > 500) {
    throw new Error('Message too long. Please keep it under 500 characters.');
  }

  // Check for potentially harmful content
  const suspiciousPatterns = [
    /script/i,
    /javascript/i,
    /eval\(/i,
    /onclick/i,
    /onerror/i,
    /<[^>]*>/g // HTML tags
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(sanitized)) {
      throw new Error('Invalid message content');
    }
  }

  return sanitized;
};

// Check if message is related to Red Cross services (more conversational and context-aware)
const isRedCrossRelated = (message) => {
  const redCrossKeywords = [
    'red cross', 'blood', 'donate', 'donating', 'donation', 'volunteer', 'volunteering',
    'disaster', 'relief', 'emergency', 'first aid', 'training', 'health', 'community',
    'humanitarian', 'tripura', 'agartala', 'membership', 'member', 'help', 'service',
    'program', 'contact', 'ircs', 'camp', 'medical', 'assistance', 'support'
  ];

  // Common conversational responses that should be allowed
  const conversationalPhrases = [
    'first time', 'never done', 'new to', 'beginner', 'started', 'how do i',
    'what do i need', 'tell me more', 'interested', 'want to know',
    'yes', 'no', 'okay', 'thanks', 'thank you', 'hello', 'hi', 'hey',
    'good morning', 'good afternoon', 'good evening', 'namaste',
    'i am', 'i\'m', 'i want', 'i need', 'i would like', 'can you',
    'please', 'sure', 'of course', 'definitely', 'maybe', 'probably'
  ];

  const lowerMessage = message.toLowerCase();

  // Check for Red Cross keywords
  const hasRedCrossKeywords = redCrossKeywords.some(keyword => lowerMessage.includes(keyword));

  // Check for conversational phrases (these should always be allowed)
  const isConversational = conversationalPhrases.some(phrase => lowerMessage.includes(phrase));

  // Allow short responses (likely conversational)
  const isShortResponse = message.trim().length <= 50;

  // Allow if it contains Red Cross keywords, is conversational, or is a short response
  return hasRedCrossKeywords || isConversational || isShortResponse;
};

export const chatbotController = {
  sendMessage: async (req, res, next) => {
    try {
      const { message } = req.body;

      // Validate and sanitize input
      let sanitizedMessage;
      try {
        sanitizedMessage = validateAndSanitizeMessage(message);
      } catch (validationError) {
        return res.status(400).json({
          success: false,
          error: validationError.message
        });
      }

      // Check if query is related to Red Cross services (with more lenient checking)
      if (!isRedCrossRelated(sanitizedMessage)) {
        return res.json({
          success: true,
          reply: "Hi there! 😊 I'm Shiro, your Red Cross Tripura assistant. I'd love to help you with anything related to our humanitarian work! I can chat about blood donation, volunteering, disaster relief, training programs, or any of our community services. What would you like to know about Red Cross Tripura?",
          restricted: true
        });
      }

      // Log the query (truncated for privacy)
      logger.info(`Chatbot query: ${sanitizedMessage.substring(0, 50)}${sanitizedMessage.length > 50 ? '...' : ''}`);

      try {
        // Try to get AI response
        if (geminiService.isAvailable()) {
          const reply = await geminiService.generateResponse(CONTEXT_PROMPT + sanitizedMessage);

          logger.info('✅ AI response generated successfully');
          res.json({
            success: true,
            reply: reply,
            source: 'ai'
          });
        } else {
          throw new Error('AI service not available');
        }
      } catch (geminiError) {
        logger.warn(`⚠️ Gemini API error: ${geminiError.message}. Using intelligent knowledge base.`);

        // Use intelligent fallback responses (seamlessly)
        const fallbackReply = generateFallbackResponse(sanitizedMessage.toLowerCase());

        res.json({
          success: true,
          reply: fallbackReply,
          source: 'knowledge_base'
        });
      }
    } catch (error) {
      logger.error('Chatbot controller error:', error);

      res.status(500).json({
        success: false,
        reply: "I apologize, I'm currently experiencing technical difficulties. Please contact the Indian Red Cross Society Tripura Branch directly at +91 9774137698 or ircstrp@gmail.com for assistance.",
        error: 'Internal server error'
      });
    }
  }
};
