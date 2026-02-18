import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import Mia from '../assets/mia.png'
import { trackChatbotInteraction, trackKeyEvent } from '../utils/analytics';

// KNOWLEDGE BASE - Innosphere Consulting
const knowledgeBase = {
  company: {
    keywords: ['who are you', 'about', 'innosphere', 'what is innnosphere', 'company'],
    response: `We're Innosphere Consulting - a Nigerian IT consultancy delivering digital transformation, SaaS/PaaS solutions, and IT consulting tailored for businesses across Nigeria and internationally. Founded in 2017, we serve tech, finance, education, government, and SMEs with practical, scalable solutions.`
  },
  
  services: {
    keywords: ['service', 'offer', 'what do you do', 'help with', 'provide'],
    response: `Our Services:

• Digital Transformation & Process Automation
• SaaS/PaaS Development
• IT Consulting & Change Management
• Training & Support
• Brand Management
• Digital Marketing (SEO, social media, content)

Which service interests you?`
  },
  
  digitalTransformation: {
    keywords: ['digital transformation', 'automation', 'process', 'streamline', 'integrate'],
    response: `We help businesses streamline operations, reduce manual tasks, integrate systems, and implement automation solutions to boost productivity and efficiency. Our solutions are designed for the Nigerian business environment with measurable outcomes.`
  },
  
  saas: {
    keywords: ['saas', 'paas', 'software', 'platform', 'custom software'],
    response: `We design and build scalable, secure SaaS/PaaS platforms customized for your business needs. Your team can access software, collaborate efficiently, and scale operations without heavy IT infrastructure costs. Request a demo through our consultation page!`
  },
  
  pricing: {
    keywords: ['price', 'cost', 'pricing', 'package', 'how much', 'fee', 'payment'],
    response: `Our Packages:

**Standard**: From ₦750,000
**Premium**: Enhanced features & support
**Enterprise**: Full-scale solutions
**Custom/Bespoke**: Tailored multi-service packages

We offer monthly subscriptions, long-term discounts, and flexible payment plans (30% deposit, remainder on milestones). Book a free consultation for a detailed quote!`
  },
  
  consultation: {
    keywords: ['consultation', 'schedule', 'appointment', 'meeting', 'book', 'demo', 'free'],
    response: `📞 Book a FREE 30-minute consultation!

📧 Email: info@innosphereconsultiong.com
📱 WhatsApp: Available on our website
🌐 Book Online: Use our "Book a Free Consultation" button

We respond within 24 hours and offer virtual meetings via Zoom, Teams, or Google Meet. Ready to get started?`
  },
  
  process: {
    keywords: ['process', 'how do you work', 'delivery', 'timeline', 'steps'],
    response: `Our 7-Step Process:

1. Discovery
2. Planning
3. Validation
4. Implementation
5. Training
6. Monitoring
7. Ongoing Support

Typical projects take 4-12 weeks for SMEs. We measure success through KPIs, ROI analysis, and user satisfaction. Want to learn more?`
  },
  
  training: {
    keywords: ['training', 'support', 'learn', 'ongoing', 'help'],
    response: `Yes! We provide comprehensive role-based training, user manuals, online resources, and ongoing support to ensure your team confidently uses the systems. Training is included in all packages, with continuous optimization available through retainer agreements.`
  },
  
  industries: {
    keywords: ['industry', 'sector', 'serve', 'tech', 'finance', 'education', 'government', 'sme'],
    response: `Industries We Serve:

💼 Tech & Startups
🏦 Finance & Banking
🎓 Education
🏛️ Government & Public Sector
🎭 Entertainment
🏢 SMEs across Nigeria

Every solution considers local challenges and growth potential. What's your industry?`
  },
  
  location: {
    keywords: ['location', 'where', 'office', 'address', 'lagos', 'nigeria'],
    response: `📍 Main Office: Lagos, Nigeria

We operate remotely to serve clients across Nigeria and internationally. You can visit our Lagos office by appointment, or we can meet virtually. Contact us to schedule!`
  },
  
  founder: {
    keywords: ['founder', 'tosin', 'who founded', 'ceo', 'leadership'],
    response: `Innosphere Consulting was founded by Tosin Samuel Ojo, who brings over a decade of expertise in business consulting, IT transformation, and digital strategy. Our leadership team holds SC Clearance and complies with industry standards.`
  },
  
  mission: {
    keywords: ['mission', 'vision', 'values', 'why'],
    response: `🎯 Vision: A digitally empowered Africa where innovation drives inclusion and growth.

🚀 Mission: To deliver reliable, scalable, and context-relevant digital systems for organizations in transition.

We combine international best practices with local market expertise for practical, measurable results.`
  },
  
  portfolio: {
    keywords: ['portfolio', 'case study', 'projects', 'examples', 'references', 'testimonials'],
    response: `We have proven results across government, finance, education, and SMEs with measurable business outcomes. Visit our Case Study / Portfolio page to see client testimonials and detailed project examples. Want to discuss your specific needs?`
  },
  
  brandMarketing: {
    keywords: ['brand', 'marketing', 'digital marketing', 'seo', 'social media', 'content'],
    response: `Our Brand & Marketing Services:

• Brand Strategy & Visual Identity
• SEO & Content Creation
• Social Media Management
• Paid Campaigns & Analytics
• Lead Generation

We create strong, consistent branding that resonates with your target audience and drives revenue. Interested?`
  },
  
  changeManagement: {
    keywords: ['change management', 'adoption', 'stakeholder', 'migration'],
    response: `We guide businesses through technology adoption, system migration, and stakeholder engagement with proven change management frameworks. This ensures smooth transitions and maximizes system adoption across your organization.`
  }
};

// All 50 questions for rotation
const allQuestions = [
  "What is Innosphere Consulting?",
  "Where is Innosphere Consulting located?",
  "How long have you been in business?",
  "What industries do you serve?",
  "Who founded Innosphere Consulting?",
  "What is your mission and vision?",
  "How do you differ from other IT consultancies?",
  "Can you provide references or case studies?",
  "Are you SC cleared or certified?",
  "Do you operate outside Nigeria?",
  "What services do you offer?",
  "Can you explain Digital Transformation?",
  "How can SaaS/PaaS help my business?",
  "What does IT Consulting involve?",
  "Do you provide staff training?",
  "Can you help with Brand Management?",
  "What digital marketing services do you offer?",
  "Are your solutions tailored for Nigerian SMEs?",
  "Do you provide custom software development?",
  "How do I choose the right service?",
  "How do you deliver your services?",
  "Can you explain your 7-step process?",
  "How long does a typical project take?",
  "Do you offer ongoing support?",
  "Can you help with change management?",
  "How do you measure project success?",
  "Will my team need training?",
  "How do you handle system integration?",
  "Do you provide workflow analysis for SMEs?",
  "Can you optimize existing systems?",
  "What are your service packages?",
  "Do you offer custom solutions?",
  "How much does a typical project cost?",
  "Are there monthly subscription options?",
  "Can I book a free consultation?",
  "Do you offer discounts for long-term engagements?",
  "How is payment structured?",
  "Are your packages scalable?",
  "Can I combine services into one package?",
  "Is pricing negotiable for enterprises?",
  "How can I contact you directly?",
  "Do you have a WhatsApp line?",
  "Can I schedule a consultation online?",
  "Do you respond to emails quickly?",
  "Are virtual consultations available?",
  "Can I visit your office in Lagos?",
  "How do I request a demo?",
  "How do I subscribe to your newsletter?",
  "Can you provide testimonials?",
  "Who should I speak to about custom solutions?"
];

const DeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const rotationIntervalRef = useRef(null);

  // Shuffle array function
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Get 5 random questions
  const getRandomQuestions = () => {
    const shuffled = shuffleArray(allQuestions);
    return shuffled.slice(0, 3);
  };

  // Initialize and rotate questionsa
  useEffect(() => {
    setSuggestedQuestions(getRandomQuestions());

    rotationIntervalRef.current = setInterval(() => {
      setSuggestedQuestions(getRandomQuestions());
    }, 20000);

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show welcome message when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
      // Track chatbot opened
trackChatbotInteraction('Chatbot Opened');
      // Show welcome message only once when chat first opens
      if (!hasInteracted && messages.length === 0) {
        setIsTyping(true);
        setTimeout(() => {
          const welcomeMessage = {
            id: 1,
            text: "👋 Hello! I'm Mia, your virtual assistant at Innosphere Consulting. I'm here to help you explore our solutions, answer your questions, and guide you every step of the way. How can I assist you today?",
            sender: 'bot',
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
          setIsTyping(false);
          setHasInteracted(true);
        }, 800);
      }
    }
  }, [isOpen, isMinimized]);

  // Intelligent response matching
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    // Track high-intent queries
  if (lowerMessage.includes('consultation') || lowerMessage.includes('book') || lowerMessage.includes('schedule')) {
    trackKeyEvent('Consultation Interest', { source: 'Chatbot', query: userMessage });
  }
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('package')) {
    trackKeyEvent('Pricing Interest', { source: 'Chatbot', query: userMessage });
  }
  
    // Greetings
    if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)/.test(lowerMessage)) {
      return "👋 Hello! I'm Mia, your virtual assistant at Innosphere Consulting. I'm here to help you explore our solutions, answer your questions, and guide you every step of the way. How can I assist you today?";
    }
    
    // Thanks
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're very welcome! Feel free to ask if you have any other questions. We're here to help! 😊";
    }
    
    // Search through knowledge base
    let bestMatch = null;
    let highestScore = 0;
    
    for (const [key, data] of Object.entries(knowledgeBase)) {
      let score = 0;
      for (const keyword of data.keywords) {
        if (lowerMessage.includes(keyword)) {
          score++;
        }
      }
      
      if (score > highestScore) {
        highestScore = score;
        bestMatch = data.response;
      }
    }
    
    // If we found a good match
    if (bestMatch && highestScore > 0) {
      return bestMatch;
    }
    
    // Default response for unmatched queries
    return `I'd be happy to help! I can assist you with:

• Services & Solutions
• Pricing & Packages
• Booking Consultations
• Our Process & Timeline
• Industries We Serve
• Case Studies & Portfolio

📧 contact@innosphereconsulting.com
📱 WhatsApp us via our website

What would you like to know?`;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Track user message sent
trackChatbotInteraction('Message Sent', inputValue);

    setTimeout(() => {
      const botMessage = {
        id: messages.length + 2,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

const handleSuggestedQuestion = (question) => {
  trackChatbotInteraction('Suggested Question Clicked', question); // ADD THIS
  setInputValue(question);
  setTimeout(() => {
    handleSendMessage();
  }, 100);
};
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white hover:shadow-xl rounded-full p-1 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group border-4 border-blue-600"
          aria-label="Open chat"
        >
          <img 
            src={Mia} 
            alt="Mia Avatar"
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      ) : (
        <div className={`bg-white rounded-lg shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'} w-96 flex flex-col overflow-hidden border border-gray-200`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white rounded-full p-0.5">
                <img 
                  src={Mia} 
                  alt="Mia Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Mia</h3>
                <p className="text-xs text-blue-100">Online - I am here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
               onClick={() => {
  trackChatbotInteraction(isMinimized ? 'Chatbot Expanded' : 'Chatbot Minimized');
  setIsMinimized(!isMinimized);
}}
                className="hover:bg-white/20 rounded p-1 transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 size={18} />
              </button>
              <button
               onClick={() => {
  trackChatbotInteraction('Chatbot Closed');
  setIsOpen(false);
}}
                className="hover:bg-white/20 rounded p-1 transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200 shadow-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className={`text-xs mt-1 block ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions - Show only with welcome message */}
              {messages.length === 2 && (
                <div className="p-3 bg-white border-t border-gray-200">
                  <p className="text-xs text-gray-600 mb-2 font-medium">Popular Questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors border border-gray-300"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={inputValue.trim() === ''}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg p-2 transition-colors"
                    aria-label="Send message"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Powered by intelligent knowledge base
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DeChatbot;