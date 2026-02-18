import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';

// KNOWLEDGE BASE - Add all your website information here
const knowledgeBase = {
  services: {
    keywords: ['service', 'offer', 'what do you do', 'help with', 'specialize'],
    response: `We offer comprehensive IT consulting services:
    
• **Cloud Solutions**: AWS, Azure, Google Cloud migration and management
• **Cybersecurity**: Network security, penetration testing, compliance
• **Network Infrastructure**: Design, implementation, and optimization
• **Software Development**: Custom applications, web & mobile development
• **IT Strategy & Planning**: Technology roadmap, digital transformation
• **Managed IT Services**: 24/7 monitoring, maintenance, and support

Which service interests you?`
  },
  
  cloudServices: {
    keywords: ['cloud', 'aws', 'azure', 'google cloud', 'migration', 'hosting'],
    response: `Our Cloud Services include:

• Cloud Migration & Strategy
• Multi-cloud Management
• Cloud Security & Compliance
• Cost Optimization
• Disaster Recovery & Backup
• DevOps & CI/CD Implementation

We're certified partners with AWS, Microsoft Azure, and Google Cloud. Would you like to discuss your cloud needs?`
  },
  
  cybersecurity: {
    keywords: ['security', 'cybersecurity', 'penetration', 'compliance', 'vulnerability', 'hack'],
    response: `Our Cybersecurity Services:

• Security Audits & Assessments
• Penetration Testing
• Compliance (GDPR, HIPAA, PCI-DSS)
• Security Training for Staff
• Incident Response
• Firewall & Network Security

We help protect your business from cyber threats. Need a security assessment?`
  },
  
  pricing: {
    keywords: ['price', 'cost', 'pricing', 'plan', 'package', 'how much', 'fee'],
    response: `Our Pricing Plans:

**Basic Support** - $99/month
• Business hours support (9 AM - 6 PM)
• Email & phone support
• Monthly system check

**Business Plan** - $299/month
• 24/7 support
• Dedicated account manager
• Weekly reports & analytics
• Priority response

**Enterprise Solutions** - Custom Pricing
• Fully customized solutions
• On-site support available
• SLA guarantees
• Advanced security features

Would you like a detailed quote for your specific needs?`
  },
  
  consultation: {
    keywords: ['consultation', 'schedule', 'appointment', 'meeting', 'book', 'talk', 'discuss'],
    response: `Schedule a Free Consultation:

📞 **Phone**: (555) 123-4567
📧 **Email**: contact@itconsultant.com
🌐 **Online Booking**: Visit our "Contact" page

**Available Hours**:
Monday - Friday: 9 AM - 6 PM EST
Saturday: 10 AM - 2 PM EST

Our consultations are free and typically last 30-45 minutes. Would you like me to send you the booking link?`
  },
  
  support: {
    keywords: ['support', '24/7', 'help', 'emergency', 'urgent', 'problem', 'issue'],
    response: `Our Support Options:

**24/7 Emergency Support**: Available for Business & Enterprise clients
**Response Times**:
• Critical: 1 hour
• High: 4 hours
• Medium: 8 hours
• Low: 24 hours

**Support Channels**:
• Phone: (555) 123-4567
• Email: support@itconsultant.com
• Live Chat: Right here!
• Support Portal: portal.itconsultant.com

What kind of support do you need?`
  },
  
  team: {
    keywords: ['team', 'who', 'staff', 'experts', 'consultants', 'about you'],
    response: `Our Expert Team:

We're a team of 25+ certified IT professionals with expertise in:
• Cloud Architecture (AWS, Azure, GCP certified)
• Cybersecurity (CISSP, CEH certified)
• Network Engineering (CCNA, CCNP)
• Software Development (Full-stack developers)

**Combined Experience**: 150+ years in IT consulting
**Clients Served**: 200+ businesses across various industries

Want to meet our team? Visit our "About Us" page!`
  },
  
  industries: {
    keywords: ['industry', 'sector', 'healthcare', 'finance', 'retail', 'manufacturing'],
    response: `Industries We Serve:

🏥 **Healthcare**: HIPAA-compliant solutions, EHR systems
🏦 **Finance**: PCI-DSS compliance, secure transactions
🛒 **Retail**: E-commerce platforms, POS systems
🏭 **Manufacturing**: IoT, automation, ERP systems
🎓 **Education**: Learning management, campus networks
⚖️ **Legal**: Secure document management, compliance

We have industry-specific expertise to meet your unique needs. What's your industry?`
  },
  
  portfolio: {
    keywords: ['portfolio', 'work', 'projects', 'case study', 'examples', 'clients'],
    response: `Our Recent Projects:

• **FinTech Startup**: Migrated infrastructure to AWS, reduced costs by 40%
• **Healthcare Provider**: Implemented HIPAA-compliant cloud solution for 5 locations
• **Retail Chain**: Built custom POS system serving 50+ stores
• **Manufacturing Co.**: Deployed IoT solution, improved efficiency by 30%

Visit our "Portfolio" page for detailed case studies and client testimonials!`
  },
  
  location: {
    keywords: ['location', 'where', 'office', 'address', 'visit'],
    response: `Our Locations:

**Headquarters**:
123 Tech Boulevard, Suite 500
New York, NY 10001

**Regional Offices**:
• San Francisco, CA
• Austin, TX
• Chicago, IL

**Service Area**: We serve clients nationwide with remote and on-site support options.

Would you like directions or prefer a virtual meeting?`
  },
  
  career: {
    keywords: ['career', 'job', 'hiring', 'work for you', 'employment', 'position'],
    response: `Join Our Team!

We're always looking for talented IT professionals. Current openings:
• Cloud Solutions Architect
• Cybersecurity Analyst
• Full-Stack Developer
• Network Engineer

**Benefits**:
• Competitive salary
• Remote work options
• Professional development
• Health & retirement plans

Visit our "Careers" page or email careers@itconsultant.com`
  },
  
  technology: {
    keywords: ['technology', 'tools', 'software', 'platform', 'use'],
    response: `Technologies We Work With:

**Cloud Platforms**: AWS, Azure, Google Cloud, DigitalOcean
**Security Tools**: Cisco, Palo Alto, Fortinet, CrowdStrike
**Development**: React, Node.js, Python, Java, .NET
**Databases**: MySQL, PostgreSQL, MongoDB, Redis
**DevOps**: Docker, Kubernetes, Jenkins, GitLab

Need help with a specific technology?`
  },
  
  partnership: {
    keywords: ['partner', 'partnership', 'collaborate', 'vendor', 'reseller'],
    response: `Partnership Opportunities:

We're certified partners with:
• Microsoft Gold Partner
• AWS Advanced Consulting Partner
• Google Cloud Partner
• Cisco Select Partner

**Interested in partnering?**
Email: partnerships@itconsultant.com

We're open to strategic partnerships and referral programs!`
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to our IT Consulting services. I have access to information about our services, pricing, team, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedQuestions = [
    "What services do you offer?",
    "Tell me about your pricing",
    "How can I schedule a consultation?",
    "What industries do you serve?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  // Intelligent response matching
  const getBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Greetings
    if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening)/.test(lowerMessage)) {
      return "Hello! I'm here to help you learn more about our IT consulting services. What would you like to know?";
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
    return `I'd be happy to help you with that! While I don't have specific information about "${userMessage}" in my knowledge base, here's what I can help you with:

• Our services and solutions
• Pricing and packages
• Scheduling consultations
• Support options
• Industries we serve
• Our team and expertise

You can also contact us directly:
📧 contact@itconsultant.com
📞 (555) 123-4567

What else would you like to know?`;
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
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            1
          </span>
        </button>
      ) : (
        <div className={`bg-white rounded-lg shadow-2xl transition-all duration-300 ${isMinimized ? 'h-16' : 'h-[600px]'} w-96 flex flex-col overflow-hidden border border-gray-200`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 rounded-full p-2">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">IT Support</h3>
                <p className="text-xs text-blue-100">Online - We're here to help</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 rounded p-1 transition-colors"
                aria-label="Minimize chat"
              >
                <Minimize2 size={18} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
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

              {/* Suggested Questions */}
              {messages.length === 1 && (
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

export default Chatbot;