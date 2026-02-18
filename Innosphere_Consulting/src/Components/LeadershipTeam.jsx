import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X, Mail, Phone, MapPin, Award, Linkedin } from 'lucide-react';

const LeadershipTeam = () => {
  const [activeProfile, setActiveProfile] = useState(null);
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const leaders = [
    {
      id: 1,
      name: "Tosin Ojo",
      title: "Founder & CEO",
      specialty: "Senior Business Analyst",
      image: "https://media.licdn.com/dms/image/v2/D4E03AQGl342D1FrLkw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1729240307610?e=1764806400&v=beta&t=lNlRIeJGT6fLWesFXySgDE8NTQToUCvnGBJiTkn1nBE",
      bio: "A seasoned Senior Business Consultant delivering end-to-end, high-impact solutions and driving sustainable business growth for organizations across multiple industries and sectors.",
      achievements: [
        "Worked with reputable organizations both locally and internationally",
        "Founder and CEO of multiple successful business ventures",
        "Recognized for strategic leadership and strong decision-making expertise"
      ],
      contact: {
        email: "delacruzltd.sam@gmail.com",
        phone: "+44 7342 274470",
        location: "United Arab Emirates"
      },
      linkedin: "#"
    },
    {
      id: 2,
      name: "Omoloye Boluwatife Amoss",
      title: "Junior Software Developer",
      specialty: "Expert Full Stack Developer",
      image: "https://codex65.netlify.app/assets/ME-B-9Umdx_.jpg",
      bio: "I am a passionate full stack developer dedicated to building seamless, intuitive, and high-performing digital experiences. I transform complex ideas into sleek, responsive, and scalable web applications — from pixel-perfect user interfaces to robust backend architectures. I believe every line of code tells a story, and I'm committed to making yours exceptional.",
      achievements: [
        "Developed and deployed over 15 high-quality websites in the last 5 years",
        "Contributed to multiple successful projects both locally and internationally",
        "Strong collaborator with excellent teamwork and communication skills"
      ],
      contact: {
        email: "omoloyeamoss65@gmail.com",
        phone: "+234 806 193 6756",
        location: "Lagos, Nigeria"
      },
      linkedin: "#"
    }
  ];

  const openModal = (leader) => {
    setActiveProfile(leader);
  };

  const closeModal = () => {
    const tl = gsap.timeline({
      onComplete: () => setActiveProfile(null)
    });
    
    tl.to(modalRef.current, { y: '100%', opacity: 0, scale: 0.95, duration: 0.4, ease: 'power2.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.3 }, '<');
  };

  useEffect(() => {
    if (activeProfile && modalRef.current) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        
        gsap.set(overlayRef.current, { opacity: 0 });
        tl.to(overlayRef.current, { opacity: 1, duration: 0.3 });
        
        gsap.set(modalRef.current, { y: '100%', opacity: 0, scale: 0.95 });
        tl.to(modalRef.current, { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'power3.out' }, '<0.1');
        
        tl.from('.modal-image', { opacity: 0, scale: 0.75, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.3')
          .from('.modal-name', { opacity: 0, x: -20, duration: 0.5 }, '-=0.4')
          .from('.modal-title', { opacity: 0, x: -20, duration: 0.5 }, '-=0.4')
          .from('.modal-specialty', { opacity: 0, x: -20, duration: 0.5 }, '-=0.4')
          .from('.modal-about-heading', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
          .from('.modal-about-text', { opacity: 0, y: 20, duration: 0.4 }, '-=0.3')
          .from('.modal-achievements-heading', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
          .from('.modal-achievement', { opacity: 0, x: -20, stagger: 0.1, duration: 0.4 }, '-=0.2')
          .from('.modal-contact-heading', { opacity: 0, y: 20, duration: 0.4 }, '-=0.2')
          .from('.modal-contact-item', { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, '-=0.2')
          .from('.modal-close-btn', { opacity: 0, scale: 0.75, duration: 0.4, ease: 'back.out(1.7)' }, '-=0.6');
      }, modalRef);
      
      return () => ctx.revert();
    }
  }, [activeProfile]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className=" bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Leading with vision and experience
          </h1>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className={`transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex gap-8 items-start group cursor-pointer" onClick={() => openModal(leader)}>
                {/* Image */}
                <div className="flex-shrink-0">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-32 h-32 md:w-40 md:h-40 md:grayscale hover:grayscale-0 transition-all duration-500 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-gray-300 transition-colors">
                    {leader.name}
                  </h2>
                  <p className="text-white text-base md:text-lg mb-4">
                    {leader.title}
                  </p>
                  
                  {/* LinkedIn Icon */}
                  <a
                    href={leader.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-10 h-10 border border-white/20 hover:border-white/40 rounded transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeProfile && (
        <div ref={overlayRef} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div ref={modalRef} className="relative bg-zinc-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="modal-close-btn absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Header Section */}
            <div className="p-8 md:p-12 border-b border-white/10">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <img
                  src={activeProfile.image}
                  alt={activeProfile.name}
                  className="modal-image w-40 h-40 md:w-48 md:h-48 object-cover"
                />
                <div className="flex-1">
                  <h2 className="modal-name text-4xl md:text-5xl font-bold text-white mb-3">
                    {activeProfile.name}
                  </h2>
                  <p className="modal-title text-xl md:text-2xl text-white/80 mb-2">
                    {activeProfile.title}
                  </p>
                  <p className="modal-specialty text-base text-white/60">
                    {activeProfile.specialty}
                  </p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 space-y-10">
              {/* Bio */}
              <div>
                <h3 className="modal-about-heading text-2xl font-bold text-white mb-4">
                  About
                </h3>
                <p className="modal-about-text text-white/70 text-lg leading-relaxed">
                  {activeProfile.bio}
                </p>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="modal-achievements-heading text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-white/60" />
                  Key Achievements
                </h3>
                <div className="space-y-4">
                  {activeProfile.achievements.map((achievement, index) => (
                    <div key={index} className="modal-achievement flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-white mt-2.5 flex-shrink-0"></div>
                      <p className="text-white/70 text-base leading-relaxed">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div className="border-t border-white/10 pt-10">
                <h3 className="modal-contact-heading text-2xl font-bold text-white mb-6">
                  Get in Touch
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    href={`mailto:${activeProfile.contact.email}`}
                    className="modal-contact-item group"
                  >
                    <div className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <Mail className="w-6 h-6 text-white/60" />
                      <div className="min-w-0">
                        <p className="text-xs text-white/40 mb-1">Email</p>
                        <p className="text-sm text-white/80 truncate">{activeProfile.contact.email}</p>
                      </div>
                    </div>
                  </a>
                  
                  <a
                    href={`tel:${activeProfile.contact.phone}`}
                    className="modal-contact-item group"
                  >
                    <div className="flex items-center gap-4 p-5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <Phone className="w-6 h-6 text-white/60" />
                      <div>
                        <p className="text-xs text-white/40 mb-1">Phone</p>
                        <p className="text-sm text-white/80">{activeProfile.contact.phone}</p>
                      </div>
                    </div>
                  </a>
                  
                  <div className="modal-contact-item">
                    <div className="flex items-center gap-4 p-5 bg-white/5 rounded-lg">
                      <MapPin className="w-6 h-6 text-white/60" />
                      <div>
                        <p className="text-xs text-white/40 mb-1">Location</p>
                        <p className="text-sm text-white/80">{activeProfile.contact.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipTeam;