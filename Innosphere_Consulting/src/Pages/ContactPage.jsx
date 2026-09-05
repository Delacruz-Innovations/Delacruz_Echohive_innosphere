import React from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, ArrowRight, MessageSquare } from 'lucide-react';
import { trackPhoneClick, trackEmailClick } from '../utils/analytics';
import CalendlyPopup from '../Components/CalendlyPopup';

const WhatsAppIcon = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function ContactPage() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '971559836354';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hello Innosphere Consulting, I would like to inquire about your advisory and consulting services.'
  )}`;

  return (
    <div className="min-h-screen bg-[#080f1d] text-[#ffffff] pb-24">
      {/* Hero Section with Image Background */}
      <section data-hero="true" className="relative overflow-hidden pt-36 pb-20 border-b border-white/5 mb-14">
        {/* Background Image with Midnight Navy Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://i.pinimg.com/736x/6e/84/b8/6e84b8d4437a03c48b049a42f391b33f.jpg')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/90 via-[#080f1d]/75 to-[#080f1d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#0a2342]/40 rounded-full blur-[130px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a2342]/70 text-[#ffffff] text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-500/20">
            <MessageSquare className="w-4 h-4 text-blue-400" />
            Executive Advisory & Inquiries
          </div>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#ffffff] tracking-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Connect directly with our senior consultants across Dubai Internet City, the UAE, and global markets. Choose the channel that best suits your timeline.
          </p>
        </div>
      </section>

      {/* Main Action Grid */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Card: WhatsApp Direct DM (Featured Hero CTA) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-[#0c2b20]/60 via-[#0a2342]/40 to-[#04121e]/80 backdrop-blur-xl rounded-sm p-8 sm:p-10 border border-[#25D366]/30 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#25D366]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              {/* Active Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Fastest Response • Direct WhatsApp DM
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3">
                Chat Directly with Our Team
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
                Skip the traditional contact forms. Message our consulting advisory desk on WhatsApp for instant discussions, proposal inquiries, or urgent project alignment.
              </p>

              {/* Highlights */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 text-sm text-gray-200">
                  <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Instant communication with Senior Business & IT Advisors</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-200">
                  <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Rapid turnaround for RFPs, scoping calls, and custom proposals</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-200">
                  <div className="w-5 h-5 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span>Direct, confidential & enterprise NDA-compliant communication</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA Action */}
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={trackPhoneClick}
                className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20bd5a] text-[#000000] font-bold rounded-sm flex items-center justify-center gap-3 text-sm sm:text-base tracking-wide shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 hover:scale-[1.01] transition-all duration-300 cursor-pointer"
              >
                <WhatsAppIcon className="w-6 h-6 fill-current flex-shrink-0" />
                <span>CHAT ON WHATSAPP NOW</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
              <p className="text-center text-xs text-gray-400 mt-3">
                Official WhatsApp: <span className="text-gray-200 font-medium">+971 55 983 6354</span> • Typically replies within minutes
              </p>
            </div>
          </div>

          {/* Right Card: Calendly & Channels */}
          <div className="lg:col-span-5 bg-[#0a2342]/20 backdrop-blur-xl rounded-sm p-8 sm:p-10 border border-blue-900/40 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-6">
                <Calendar className="w-3.5 h-3.5" />
                Structured Discovery
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Book a Consultation
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Prefer a scheduled session? Pick a convenient time on our calendar for a 30-minute introductory strategy consultation.
              </p>

              <CalendlyPopup
                text="SCHEDULE 30-MIN STRATEGY CALL"
                className="w-full py-3.5 px-5 bg-white hover:bg-gray-200 text-black font-semibold rounded-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer text-xs sm:text-sm tracking-wide"
              />
            </div>

            {/* Direct Info List */}
            <div className="pt-8 mt-8 border-t border-gray-800 space-y-5">
              <div className="flex items-start gap-4" onClick={trackPhoneClick}>
                <div className="w-11 h-11 bg-[#0a2342] rounded-sm flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">Phone &amp; WhatsApp</p>
                  <a 
                    href="tel:+971559836354" 
                    className="text-white font-medium hover:text-blue-400 transition-colors text-sm"
                  >
                    +971 55 983 6354
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4" onClick={trackEmailClick}>
                <div className="w-11 h-11 bg-[#0a2342] rounded-sm flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">Email Desk</p>
                  <a 
                    href="mailto:info@innosphereconsulting.ae" 
                    className="text-white font-medium hover:text-blue-400 transition-colors text-sm break-all"
                  >
                    info@innosphereconsulting.ae
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#0a2342] rounded-sm flex items-center justify-center flex-shrink-0 text-blue-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">Headquarters</p>
                  <p className="text-white font-medium text-sm">
                    Dubai Internet City, UAE
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-[#0a2342] rounded-sm flex items-center justify-center flex-shrink-0 text-blue-400">
                  <Clock size={18} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-medium mb-0.5">Operating Hours</p>
                  <p className="text-white font-medium text-sm">
                    Mon - Fri: 9:00 AM - 6:00 PM (GST)
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}