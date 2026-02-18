import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Clock, Globe, Facebook, Linkedin, Instagram, Youtube } from 'lucide-react';


const ContactPage = () => {
    const [status, setStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
 

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
   
  e.preventDefault();
  
  // Validation
  if (!formData.name || !formData.email || !formData.message) {
    setStatus('error');
    return;
  }

  setLoading(true);
  setStatus('');

  // Web3Forms Configuration
  const accessKey = 'b999d5d6-b6c6-4dfa-899b-a12c7707aa05'; // Get this from https://web3forms.com

  const formDataToSend = new FormData();
  formDataToSend.append('access_key', accessKey);
  formDataToSend.append('name', formData.name);
  formDataToSend.append('email', formData.email);
  formDataToSend.append('phone', formData.phone);
  formDataToSend.append('company', formData.company);
  formDataToSend.append('message', formData.message);

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formDataToSend
    });

    const data = await response.json();

    if (data.success) {
      console.log('SUCCESS!', data);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
      setTimeout(() => setStatus(''), 5000);
    } else {
      console.error('FAILED...', data);
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  } catch (error) {
    console.error('FAILED...', error);
    setStatus('error');
    setTimeout(() => setStatus(''), 5000);
  } finally {
    setLoading(false);
  }
};

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'info@delacruzinnovation.com',
      link: 'mailto:info@delacruzinnovation.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '234 9052765358',
      link: 'tel:+2349052765358'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: ' 29A, Salimonu Ayinde Street. Lagos, Nigeria',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: 'Mon - Fri: 9:00 AM - 6:00 PM',
      link: '#'
    }
  ];

  return (
    <div className="bg-black py-20 min-h-screen">
      {/* Hero Section */}
      <div className="relative py-20 px-4 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&auto=format&fit=crop" 
            alt="Contact us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
          }`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Touch</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
              Have a project in mind or want to learn more about our services? We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className={`lg:col-span-2 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="bg-gradient-to-br from-purple-950/30 to-black border border-purple-700/30 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6">Send us a Message</h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="+234 123 456 7890"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors"
                      placeholder="Company Name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    className="w-full bg-black/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  ></textarea>
                </div>

                <button
  onClick={handleSubmit}
  
  disabled={loading}
  className="w-full md:w-auto group relative px-8 py-4 bg-purple-700 hover:bg-purple-600 disabled:bg-purple-900 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-2"
>
  <span>{loading ? 'Sending...' : 'Send Message'}</span>
  {!loading && <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
</button>

              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className={`space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`} style={{ transitionDelay: '400ms' }}>
            {/* Contact Cards */}
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <a
                  key={index}
                  href={info.link}
                  className="block bg-gradient-to-br from-purple-950/30 to-black border border-purple-700/30 rounded-2xl p-6 hover:border-purple-600/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">{info.title}</h3>
                      <p className="text-gray-400 text-sm">{info.details}</p>
                    </div>
                  </div>
                </a>
              );
            })}


          </div>
          {/* Status Modal */}
{status && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    <div className={`max-w-md w-full ${
      status === 'success' 
        ? 'bg-gradient-to-br from-purple-900/90 to-black border-purple-700' 
        : 'bg-gradient-to-br from-red-900/90 to-black border-red-600'
    } border-2 rounded-2xl p-8 transform transition-all duration-300 scale-100`}>
      <div className="text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
          status === 'success' ? 'bg-purple-700' : 'bg-red-600'
        }`}>
          <span className="text-3xl text-white">
            {status === 'success' ? '✓' : '✗'}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {status === 'success' ? 'Success!' : 'Error'}
        </h3>
        <p className={`mb-6 ${
          status === 'success' ? 'text-purple-300' : 'text-red-300'
        }`}>
          {status === 'success' 
            ? "Message sent successfully! We'll get back to you soon." 
            : 'Please fill in all required fields.'}
        </p>
        <button
          onClick={() => setStatus('')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
            status === 'success'
              ? 'bg-purple-600 hover:bg-g-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
        </div>

        {/* Map Section */}
        <div className={`mt-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-gradient-to-br from-purple-950/30 to-black border border-purple-700/30 rounded-2xl overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46310770285!2d3.119142842927999!3d6.548369370928848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1761778078395!5m2!1sen!2sng" 
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;