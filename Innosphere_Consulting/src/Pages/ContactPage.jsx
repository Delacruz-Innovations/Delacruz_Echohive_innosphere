import React, { useState, useRef, useEffect } from 'react';
import { Facebook, MessageCircle, Instagram, Linkedin, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';
import { trackPhoneClick, trackEmailClick } from '../utils/analytics';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { trackContactSubmission } from '../utils/analytics';
import CalendlyPopup from '../Components/CalendlyPopup';
export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  // Add this state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+234',
    phone: '',
    subject: '',
    message: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);

    trackContactSubmission('Contact Form');

    try {
      const response = await fetch('https://formspree.io/f/mjkpnawy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          subject: formData.subject,
          message: formData.message
        })
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          countryCode: '+234',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitError('Failed to send message. Please try again.');
      }
    } catch (error) {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Contact us</h1>
          <p className="text-gray-300 text-lg">Feel free to contact us any time you want</p>
        </div>

        {/* Contact Form and Info */}
        <div className="max-w-5xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-2xl">
          <div className=" gap-12">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">Let's talk!</h2>
              <div className="mb-8">
                <CalendlyPopup
                  text="BOOK A FREE CONSULTATION"
                  className="w-full py-4 bg-[#6b9dc7] text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border-none cursor-pointer"
                />
                <div className="flex items-center my-6">
                  <div className="flex-1 border-t border-gray-600"></div>
                  <span className="px-4 text-gray-400 text-sm">OR SEND A MESSAGE</span>
                  <div className="flex-1 border-t border-gray-600"></div>
                </div>
              </div>
              <p className="text-gray-300 mb-8">
                Prefer to talk directly? Book a call using the button above for the fastest response.
              </p>

              <div className="space-y-6" onClick={trackPhoneClick}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">+234 9073329957</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">connect@innosphereconsulting.ae</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Dubai Internet City, UAE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-6" onClick={trackEmailClick}>
              <div>
                <label className="block text-gray-400 text-sm mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">PHONE</label>
                <PhoneInput
                  country={'ae'}
                  value={formData.phone}
                  onChange={(phone, country) => {
                    setFormData({
                      ...formData,
                      phone: phone,
                      countryCode: '+' + country.dialCode
                    });
                  }}
                  containerClass="w-full"
                  inputClass="w-full"
                  buttonClass="!bg-gray-700/50 !border-gray-600 hover:!bg-gray-600/50"
                  dropdownClass="!bg-gray-700 !border-gray-600"
                  searchClass="!bg-gray-600 !text-white !border-gray-500"
                  inputStyle={{
                    width: '100%',
                    height: '48px',
                    backgroundColor: 'rgba(55, 65, 81, 0.5)',
                    border: '1px solid rgb(75, 85, 99)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    fontSize: '1rem',
                    paddingLeft: '48px'
                  }}
                  buttonStyle={{
                    backgroundColor: 'rgba(55, 65, 81, 0.5)',
                    border: '1px solid rgb(75, 85, 99)',
                    borderTopLeftRadius: '0.5rem',
                    borderBottomLeftRadius: '0.5rem'
                  }}
                  dropdownStyle={{
                    backgroundColor: 'rgb(55, 65, 81)',
                    border: '1px solid rgb(75, 85, 99)',
                    color: 'white'
                  }}
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
                  placeholder="Subject"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">MESSAGE</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-[#6b9dc7] text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Sending...' : 'Get in touch'}
              </button>

              {/* Success Message */}
              {submitSuccess && (
                <div className="p-4 bg-[#6b9dc7]/20 border border-[#6b9dc7] rounded-lg text-[#6b9dc7] text-center">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400 text-center">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Messenger Button */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all">
        <MessageCircle size={28} className="text-white" />
      </button>
    </div>
  );
}