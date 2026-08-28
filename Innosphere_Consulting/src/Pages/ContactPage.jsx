import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { trackPhoneClick, trackEmailClick } from '../utils/analytics';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { trackContactSubmission } from '../utils/analytics';
import CalendlyPopup from '../Components/CalendlyPopup';

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    countryCode: '+971',
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
          countryCode: '+971',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        setSubmitError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setSubmitError('Failed to send message. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] pt-32 pb-20">
      {/* Main Content */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-[#ffffff] mb-4">Contact Us</h1>
          <p className="text-gray-300 text-lg">Connect with our executive advisory team across the UAE &amp; globally</p>
        </div>

        {/* Contact Form and Info */}
        <div className="max-w-5xl mx-auto bg-[#0a2342]/20 backdrop-blur-sm rounded-sm p-6 md:p-12 shadow-2xl">
          <div className="gap-12">
            {/* Left Side - Contact Info */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#ffffff] mb-6">Let's talk!</h2>
              <div className="mb-8">
                <CalendlyPopup
                  text="BOOK A FREE CONSULTATION"
                  className="w-full py-4 bg-[#ffffff] hover:bg-gray-200 text-[#000000] font-semibold rounded-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer text-sm"
                />
                <div className="flex items-center my-6">
                  <div className="flex-1 bg-[#0a2342]/50 h-px"></div>
                  <span className="px-4 text-gray-400 text-xs font-semibold uppercase tracking-wider">OR SEND A MESSAGE</span>
                  <div className="flex-1 bg-[#0a2342]/50 h-px"></div>
                </div>
              </div>
              <p className="text-gray-300 mb-8">
                Prefer to talk directly? Book a call using the button above for the fastest response.
              </p>

              <div className="space-y-6" onClick={trackPhoneClick}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0a2342] rounded-sm flex items-center justify-center flex-shrink-0">
                    <Mail size={20} className="text-[#ffffff]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">connect@innosphereconsulting.ae</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0a2342] rounded-sm flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} className="text-[#ffffff]" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      Dubai, UAE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="space-y-6 mt-8" onClick={trackEmailClick}>
              <div>
                <label className="block text-gray-400 text-sm mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-[#0a2342]/30 rounded-sm text-white placeholder-gray-500 focus:outline-none transition"
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
                  className="w-full px-4 py-3 bg-[#0a2342]/30 rounded-sm text-white placeholder-gray-500 focus:outline-none transition"
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
                      countryCode: '+' + (country.dialCode || '971')
                    });
                  }}
                  containerClass="w-full"
                  inputClass="w-full !rounded-sm"
                  inputStyle={{
                    width: '100%',
                    height: '48px',
                    backgroundColor: 'rgba(10, 35, 66, 0.3)',
                    borderRadius: '2px',
                    color: 'white',
                    fontSize: '1rem',
                    paddingLeft: '48px',
                    border: 'none'
                  }}
                  buttonStyle={{
                    backgroundColor: 'rgba(10, 35, 66, 0.3)',
                    borderRadius: '2px',
                    border: 'none'
                  }}
                  dropdownStyle={{
                    backgroundColor: '#000000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '2px'
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
                  className="w-full px-4 py-3 bg-[#0a2342]/30 rounded-sm text-white placeholder-gray-500 focus:outline-none transition"
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
                  className="w-full px-4 py-3 bg-[#0a2342]/30 rounded-sm text-white placeholder-gray-500 focus:outline-none transition resize-none"
                  placeholder="Your message"
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full py-4 bg-[#ffffff] text-[#000000] font-semibold rounded-sm hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Get in touch'}
              </button>

              {/* Success Message */}
              {submitSuccess && (
                <div className="p-4 bg-[#0a2342]/40 rounded-sm text-blue-400 text-center">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {/* Error Message */}
              {submitError && (
                <div className="p-4 bg-red-500/20 rounded-sm text-red-400 text-center">
                  {submitError}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}