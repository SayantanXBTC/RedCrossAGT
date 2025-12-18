import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi there! 😊 I\'m Shiro, your friendly Red Cross Tripura assistant! I\'m here to help you learn about our humanitarian services and how you can get involved in making a difference in our community. What would you like to know about?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    
    // Client-side validation
    if (userMessage.length > 500) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: '❌ Message too long. Please keep your message under 500 characters.',
        timestamp: new Date()
      }]);
      return;
    }

    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage, timestamp: new Date() }]);
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/chatbot/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      
      if (data.success && data.reply) {
        // Add source indicator for different response types
        let messageText = data.reply;
        if (data.restricted) {
          messageText = `🚫 ${messageText}`;
        }
        // Remove the obvious fallback note - make it seamless for users
        
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: messageText, 
          timestamp: new Date(),
          source: data.source || 'unknown'
        }]);
      } else if (data.error) {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: `❌ ${data.error}\n\nPlease contact us directly for assistance:\n📞 +91 9774137698\n📧 ircstrp@gmail.com`,
          timestamp: new Date()
        }]);
      } else {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: 'I apologize, I am having trouble responding right now. Please try again or contact us directly at +91 9774137698.',
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: 'I apologize, I am currently unavailable. Please contact us at ircstrp@gmail.com or call +91 9774137698.',
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { icon: '🩸', text: 'Blood Donation', message: 'Hi Shiro! I\'m interested in donating blood. Can you tell me how to get started?' },
    { icon: '🚨', text: 'Emergency Help', message: 'Hello! I\'d like to know about your disaster relief services in Tripura.' },
    { icon: '🤝', text: 'Volunteer', message: 'Hi there! I want to volunteer with Red Cross. How can I join your team?' },
    { icon: '📚', text: 'Learn Skills', message: 'Hello Shiro! What training programs do you offer? I\'d love to learn first aid!' }
  ];

  const handleQuickAction = (message) => {
    setInput(message);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-redcross-red to-red-700 text-white rounded-full shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center justify-center z-50 group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ boxShadow: '0 10px 40px rgba(220, 38, 38, 0.3)' }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </motion.svg>
          )}
        </AnimatePresence>
        
        {/* Pulse effect when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-redcross-red animate-ping opacity-20"></span>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-6 w-[400px] h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-100"
            style={{ boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-redcross-red to-red-700 text-white p-5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-white opacity-5"></div>
              <div className="flex items-center space-x-3 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Shiro - Red Cross Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-red-100">Online • Here to help you! 😊</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-xl transition-all duration-200 relative z-10 backdrop-blur-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-gradient-to-b from-gray-50 to-white border-b"
              >
                <p className="text-xs text-gray-600 mb-3 font-medium">Quick Actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleQuickAction(action.message)}
                      className="flex items-center space-x-2 p-2.5 bg-white border border-gray-200 rounded-xl hover:border-redcross-red hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <span className="text-xl">{action.icon}</span>
                      <span className="text-xs font-medium text-gray-700 group-hover:text-redcross-red">{action.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-white to-gray-50">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${msg.type === 'user' ? 'order-2' : 'order-1'}`}>
                    <div className={`p-3.5 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-br from-redcross-red to-red-700 text-white rounded-br-md shadow-lg shadow-red-500/30' 
                        : 'bg-white text-gray-800 rounded-bl-md shadow-md border border-gray-100'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <p className={`text-[10px] text-gray-400 mt-1 px-1 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white p-4 rounded-2xl rounded-bl-md shadow-md border border-gray-100">
                    <div className="flex space-x-1.5">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0 }}
                        className="w-2 h-2 bg-gradient-to-br from-redcross-red to-red-600 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay: 0.1 }}
                        className="w-2 h-2 bg-gradient-to-br from-redcross-red to-red-600 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0, delay: 0.2 }}
                        className="w-2 h-2 bg-gradient-to-br from-redcross-red to-red-600 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about Red Cross services..."
                    maxLength={500}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-redcross-red focus:border-transparent focus:bg-white transition-all duration-200 text-sm pr-12"
                  />
                  {input.length > 0 && (
                    <span className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-xs ${
                      input.length > 450 ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {input.length}/500
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading || input.length > 500}
                  className="bg-gradient-to-br from-redcross-red to-red-700 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-[10px] text-gray-400">
                  Powered by AI • Shiro Assistant
                </p>
                <p className="text-[10px] text-gray-400">
                  📞 +91 9774137698
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Chatbot;
