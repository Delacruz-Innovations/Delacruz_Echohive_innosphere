import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Users, Globe, Award, TrendingUp, MessageSquare, Star, Zap, Target, ChevronRight, Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CommunityAboutSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const valueCardsRef = useRef([]);
  const statsRef = useRef([]);
  const featuresRef = useRef([]);
  const testimonialRef = useRef(null);
  const ctaRef = useRef(null);

  const communityValues = [
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of collective creativity. Together, we achieve more than we ever could alone.',
      color: 'blue'
    },
    {
      icon: Star,
      title: 'Excellence',
      description: 'We push boundaries and challenge conventions to deliver work that sets new standards in the industry.',
      color: 'yellow'
    },
    {
      icon: Globe,
      title: 'Diversity',
      description: 'Our global community brings together unique perspectives from every corner of the creative world.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We embrace emerging technologies and methodologies to stay ahead of the curve.',
      color: 'yellow'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Members', icon: Users },
    { value: '120+', label: 'Countries', icon: Globe },
    { value: '500+', label: 'Awards Won', icon: Award },
    { value: '2M+', label: 'Monthly Views', icon: TrendingUp }
  ];

  const features = [
    {
      icon: MessageSquare,
      title: 'Real-time Discussions',
      description: 'Engage in meaningful conversations with industry leaders and peers in real-time.'
    },
    {
      icon: Award,
      title: 'Recognition Programs',
      description: 'Get recognized for your contributions and showcase your expertise to the world.'
    },
    {
      icon: Target,
      title: 'Learning Opportunities',
      description: 'Access exclusive workshops, masterclasses, and mentorship from top professionals.'
    }
  ];

  const testimonials = [
    {
      name: 'Emily Rodriguez',
      role: 'Lead Designer at Spotify',
      avatar: '👩‍🎨',
      quote: 'This community transformed my career. The connections I made here led to opportunities I never imagined possible.',
      highlight: 'Career-changing connections'
    },
    {
      name: 'James Chen',
      role: 'Creative Director at Nike',
      avatar: '👨‍💼',
      quote: 'The feedback and support I receive here pushes me to create better work every single day. It\'s invaluable.',
      highlight: 'Constant growth and inspiration'
    },
    {
      name: 'Fatima Hassan',
      role: 'Brand Strategist at Google',
      avatar: '👩‍💻',
      quote: 'I\'ve learned more from this community in 6 months than I did in years of formal education. The real-world insights are incredible.',
      highlight: 'Real-world learning'
    }
  ];

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    // Subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      }
    );

    // Value cards animation
    ScrollTrigger.create({
      trigger: '.values-grid',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(valueCardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    // Stats animation
    ScrollTrigger.create({
      trigger: '.stats-section',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(statsRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        });
      },
    });

    // Features animation
    ScrollTrigger.create({
      trigger: '.features-section',
      start: 'top 75%',
      onEnter: () => {
        gsap.to(featuresRef.current, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    // Testimonial animation
    gsap.fromTo(
      testimonialRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: testimonialRef.current,
          start: 'top 75%',
        }
      }
    );

    // CTA animation
    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        }
      }
    );

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-black py-4 px-8 overflow-hidden">
      {/* Animated Background */}
      <div 
        ref={(mountDiv) => {
          if (!mountDiv || mountDiv.dataset.initialized) return;
          mountDiv.dataset.initialized = 'true';
          
          const scene = new THREE.Scene();
          const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
          const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
          
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          mountDiv.appendChild(renderer.domElement);

          // Create multiple particle systems
          const blueMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x3b82f6,
            transparent: true,
            opacity: 0.4,
          });

          const yellowMaterial = new THREE.PointsMaterial({
            size: 0.015,
            color: 0xfbbf24,
            transparent: true,
            opacity: 0.3,
          });

          const createParticleSystem = (count, material) => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(count * 3);
            for(let i = 0; i < count * 3; i++) {
              positions[i] = (Math.random() - 0.5) * 25;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            return new THREE.Points(geometry, material);
          };

          const blueParticles = createParticleSystem(1000, blueMaterial);
          const yellowParticles = createParticleSystem(800, yellowMaterial);
          
          scene.add(blueParticles);
          scene.add(yellowParticles);

          camera.position.z = 5;

          const animate = () => {
            requestAnimationFrame(animate);
            blueParticles.rotation.y += 0.0003;
            blueParticles.rotation.x += 0.0001;
            yellowParticles.rotation.y -= 0.0002;
            yellowParticles.rotation.x += 0.0002;
            renderer.render(scene, camera);
          };
          animate();

          const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          };
          window.addEventListener('resize', handleResize);
        }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-50"
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-yellow-500 text-white px-6 py-2 rounded-full text-sm font-bold">
              OUR COMMUNITY
            </span>
          </div>
          <h2 ref={titleRef} className="text-white text-5xl md:text-7xl font-bold tracking-tight mb-6">
            WHERE CREATIVITY
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-yellow-400">
              COMES ALIVE
            </span>
          </h2>
          <p ref={subtitleRef} className="text-white/70 text-xl md:text-2xl max-w-3xl mx-auto">
            Join a global network of creative professionals pushing the boundaries of what's possible
          </p>
        </div>

        {/* Values Grid */}
        <div className="values-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {communityValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                ref={(el) => (valueCardsRef.current[index] = el)}
                className={`bg-neutral-900 rounded-2xl p-8 border-2 ${
                  value.color === 'blue' ? 'border-blue-500/30 hover:border-blue-500' : 'border-yellow-500/30 hover:border-yellow-500'
                } transition-all duration-300 opacity-0 hover:scale-105 transform`}
                style={{ transform: 'translateY(30px)' }}
              >
                <div className={`w-16 h-16 rounded-xl ${
                  value.color === 'blue' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                } flex items-center justify-center mb-6`}>
                  <Icon className={`w-8 h-8 ${
                    value.color === 'blue' ? 'text-blue-400' : 'text-yellow-400'
                  }`} />
                </div>
                <h3 className="text-white text-2xl font-bold mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </div>
            );
          })}
        </div>

  

        {/* Features Section */}
        <div className="features-section mb-24">
          <h3 className="text-white text-4xl font-bold text-center mb-12">What You'll Experience</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (featuresRef.current[index] = el)}
                  className="bg-black rounded-2xl p-8 border border-neutral-800 hover:border-yellow-500/50 transition-all duration-300 opacity-0"
                  style={{ transform: 'translateX(-30px)' }}
                >
                  <div className="bg-yellow-500/20 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-yellow-400" />
                  </div>
                  <h4 className="text-white text-xl font-bold mb-3">{feature.title}</h4>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Video/Visual Section */}
        <div className="mb-24">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-yellow-500/20 border-2 border-blue-500/30 h-96 flex items-center justify-center group cursor-pointer hover:border-yellow-500/50 transition-all">
            <div className="text-center">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-2xl shadow-blue-500/50">
                <Play className="w-10 h-10 text-black ml-1" />
              </div>
              <p className="text-white text-xl font-semibold">Watch Our Community in Action</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-yellow-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>


        {/* CTA */}
        <div ref={ctaRef} className="text-center">
          <div className="0 rounded-3xl p-12 md:p-16">
            <h3 className="text-white text-4xl md:text-5xl font-bold mb-6">
              Ready to Be Part of Something Bigger?
            </h3>
            <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of creatives who are shaping the future of design, strategy, and innovation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-neutral-100 transition-all hover:scale-105 transform flex items-center justify-center gap-2 shadow-2xl">
                JOIN THE COMMUNITY
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-neutral-900 transition-all hover:scale-105 transform border-2 border-white">
                EXPLORE FIRST
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}