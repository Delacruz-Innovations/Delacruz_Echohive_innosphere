import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { Users, MessageCircle, Heart, Share2, Bookmark, MoreVertical, Send, TrendingUp, Award, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CommunityPosts() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  
  const heroRef = useRef(null);
  const statsRef = useRef([]);
  const peopleCardsRef = useRef([]);
  const postCardsRef = useRef([]);
  const categoriesRef = useRef(null);

  const categories = ['All', 'Creative', 'Design', 'Technology', 'Strategy', 'Inspiration'];

  const communityStats = [
    { label: 'Active Members', value: '12.5K', icon: Users, color: 'blue' },
    { label: 'Posts This Week', value: '847', icon: TrendingUp, color: 'yellow' },
    { label: 'Top Contributors', value: '156', icon: Award, color: 'blue' }
  ];

  const topPeople = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Creative Director',
      avatar: '👩‍🎨',
      posts: 124,
      followers: '2.3K',
      expertise: ['Branding', 'UI/UX'],
      isFollowing: false
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      role: 'Senior Designer',
      avatar: '👨‍💻',
      posts: 98,
      followers: '1.8K',
      expertise: ['Motion', '3D'],
      isFollowing: true
    },
    {
      id: 3,
      name: 'Aisha Okonkwo',
      role: 'Brand Strategist',
      avatar: '👩‍💼',
      posts: 156,
      followers: '3.1K',
      expertise: ['Strategy', 'Content'],
      isFollowing: false
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Full Stack Developer',
      avatar: '👨‍🔬',
      posts: 89,
      followers: '1.5K',
      expertise: ['React', 'Node.js'],
      isFollowing: true
    }
  ];

  const posts = [
    {
      id: 1,
      author: 'Sarah Chen',
      role: 'Creative Director',
      avatar: '👩‍🎨',
      time: '2 hours ago',
      category: 'Creative',
      content: 'Just wrapped up an amazing brand identity project for a sustainable fashion startup. The challenge was creating something that felt premium yet approachable. Here\'s what we learned about balancing elegance with accessibility.',
      image: '🎨',
      likes: 234,
      comments: 45,
      shares: 12,
      tags: ['Branding', 'Sustainability', 'Fashion']
    },
    {
      id: 2,
      author: 'Marcus Rodriguez',
      role: 'Senior Designer',
      avatar: '👨‍💻',
      time: '5 hours ago',
      category: 'Design',
      content: 'Experimenting with new motion design techniques using Three.js and GSAP. The combination of 3D elements with smooth scroll animations creates such immersive experiences. Would love to hear your thoughts!',
      image: '🌟',
      likes: 189,
      comments: 34,
      shares: 28,
      tags: ['Motion', '3D', 'WebGL']
    },
    {
      id: 3,
      author: 'Aisha Okonkwo',
      role: 'Brand Strategist',
      avatar: '👩‍💼',
      time: '8 hours ago',
      category: 'Strategy',
      content: 'Insights from our latest consumer research: Gen Z values authenticity over perfection. Brands that show their human side and embrace imperfection are building stronger connections. Thread below 🧵',
      image: '📊',
      likes: 312,
      comments: 67,
      shares: 45,
      tags: ['Research', 'GenZ', 'Strategy']
    },
    {
      id: 4,
      author: 'David Kim',
      role: 'Full Stack Developer',
      avatar: '👨‍🔬',
      time: '12 hours ago',
      category: 'Technology',
      content: 'Built a real-time collaboration tool using React and WebSockets. The performance optimizations we implemented reduced latency by 60%. Open to questions about the architecture!',
      image: '⚡',
      likes: 156,
      comments: 28,
      shares: 19,
      tags: ['React', 'WebSocket', 'Performance']
    },
    {
      id: 5,
      author: 'Sarah Chen',
      role: 'Creative Director',
      avatar: '👩‍🎨',
      time: '1 day ago',
      category: 'Inspiration',
      content: 'Sometimes the best creative solutions come from constraints. Working with a limited color palette forced us to think differently about hierarchy and emphasis. Constraints breed creativity.',
      image: '💡',
      likes: 278,
      comments: 52,
      shares: 34,
      tags: ['Creativity', 'Design Thinking', 'Process']
    },
    {
      id: 6,
      author: 'Marcus Rodriguez',
      role: 'Senior Designer',
      avatar: '👨‍💻',
      time: '1 day ago',
      category: 'Design',
      content: 'Quick tutorial: How to create buttery smooth scroll animations that don\'t tank performance. Key is using CSS transforms and will-change property wisely. Code snippet in comments!',
      image: '🎬',
      likes: 445,
      comments: 89,
      shares: 67,
      tags: ['Tutorial', 'Animation', 'Performance']
    }
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  useEffect(() => {
    // Hero animation
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    // Stats animation
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, scale: 0.8 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6, 
        stagger: 0.1, 
        delay: 0.3,
        ease: 'back.out(1.7)' 
      }
    );

    // Categories animation
    gsap.fromTo(
      categoriesRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
    );

    // People cards scroll animation
    ScrollTrigger.create({
      trigger: '.people-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(peopleCardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
        });
      },
    });

    // Post cards scroll animation
    ScrollTrigger.create({
      trigger: '.posts-section',
      start: 'top 80%',
      onEnter: () => {
        gsap.to(postCardsRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleLike = (postId) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const toggleSave = (postId) => {
    setSavedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-8 overflow-hidden">
        {/* Three.js Background */}
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

            const particlesGeometry = new THREE.BufferGeometry();
            const particlesCount = 2000;
            const posArray = new Float32Array(particlesCount * 3);

            for(let i = 0; i < particlesCount * 3; i++) {
              posArray[i] = (Math.random() - 0.5) * 20;
            }

            particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

            const material = new THREE.PointsMaterial({
              size: 0.015,
              color: 0x3b82f6,
              transparent: true,
              opacity: 0.7,
            });

            const particlesMesh = new THREE.Points(particlesGeometry, material);
            scene.add(particlesMesh);

            camera.position.z = 3;

            let animationFrameId;
            const animate = () => {
              animationFrameId = requestAnimationFrame(animate);
              particlesMesh.rotation.y += 0.0003;
              particlesMesh.rotation.x += 0.0001;
              particlesMesh.position.y = Math.sin(Date.now() * 0.0005) * 0.1;
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
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        />

        <div ref={heroRef} className="relative z-10 text-center max-w-4xl">
          <h1 className="text-white text-6xl md:text-8xl font-bold tracking-tight mb-6">
            COMMUNITY
          </h1>
          <p className="text-white/80 text-xl md:text-2xl mb-8">
            Connect, share, and grow with creative minds from around the world
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {communityStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (statsRef.current[index] = el)}
                  className={`bg-neutral-900/80 backdrop-blur-sm rounded-2xl p-6 border-2 ${
                    stat.color === 'blue' ? 'border-blue-500/30' : 'border-yellow-500/30'
                  } opacity-0`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${
                    stat.color === 'blue' ? 'text-blue-400' : 'text-yellow-400'
                  }`} />
                  <div className="text-white text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section ref={categoriesRef} className="px-8 py-8 bg-neutral-900/50 sticky top-0 z-40 backdrop-blur-sm border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-neutral-800 text-white/70 hover:bg-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Top People Section */}
      <section className="px-8 py-16 people-section">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-white text-4xl font-bold">Top Contributors</h2>
            <button className="text-blue-400 hover:text-blue-300 font-semibold transition-colors">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topPeople.map((person, index) => (
              <div
                key={person.id}
                ref={(el) => (peopleCardsRef.current[index] = el)}
                className="bg-neutral-900 rounded-2xl p-6 border border-neutral-800 hover:border-blue-500/50 transition-all opacity-0"
                style={{ transform: 'translateY(30px)' }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{person.avatar}</div>
                  <h3 className="text-white text-xl font-bold mb-1">{person.name}</h3>
                  <p className="text-white/60 text-sm mb-4">{person.role}</p>
                  
                  <div className="flex justify-center gap-4 mb-4 text-sm">
                    <div className="text-center">
                      <div className="text-white font-bold">{person.posts}</div>
                      <div className="text-white/50">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold">{person.followers}</div>
                      <div className="text-white/50">Followers</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {person.expertise.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <button
                    className={`w-full py-2 rounded-full font-bold text-sm transition-all ${
                      person.isFollowing
                        ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {person.isFollowing ? 'Following' : 'Follow'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section className="px-8 py-16 posts-section bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-4xl font-bold mb-8">Recent Posts</h2>

          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.id}
                ref={(el) => (postCardsRef.current[index] = el)}
                className="bg-black rounded-2xl border border-neutral-800 overflow-hidden hover:border-blue-500/50 transition-all opacity-0"
                style={{ transform: 'translateY(30px)' }}
              >
                {/* Post Header */}
                <div className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{post.avatar}</div>
                    <div>
                      <h3 className="text-white font-bold">{post.author}</h3>
                      <p className="text-white/60 text-sm">{post.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white/50 text-sm">
                      <Clock className="w-4 h-4" />
                      {post.time}
                    </div>
                    <button className="text-white/50 hover:text-white transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="px-6 pb-4">
                  <p className="text-white/90 text-base leading-relaxed mb-4">
                    {post.content}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-xs font-semibold hover:bg-blue-500/30 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Image/Visual */}
                  <div className="bg-gradient-to-br from-blue-500/20 to-yellow-500/20 rounded-xl h-64 flex items-center justify-center text-8xl mb-4 border border-blue-500/30">
                    {post.image}
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-6 py-4 border-t border-neutral-800 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => toggleLike(post.id)}
                      className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors group"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          likedPosts.includes(post.id)
                            ? 'fill-blue-400 text-blue-400'
                            : 'group-hover:scale-110 transition-transform'
                        }`}
                      />
                      <span className="text-sm font-semibold">{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 text-white/70 hover:text-yellow-400 transition-colors group">
                      <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold">{post.comments}</span>
                    </button>

                    <button className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors group">
                      <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-semibold">{post.shares}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleSave(post.id)}
                    className={`text-white/70 hover:text-yellow-400 transition-colors ${
                      savedPosts.includes(post.id) ? 'text-yellow-400' : ''
                    }`}
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        savedPosts.includes(post.id) ? 'fill-yellow-400' : ''
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-white/60 text-xl">No posts found in this category</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                View all posts
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="px-8 py-24 bg-gradient-to-br from-blue-500/10 to-yellow-500/10 border-t border-blue-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-5xl font-bold mb-6">
            JOIN THE CONVERSATION
          </h2>
          <p className="text-white/80 text-xl mb-8">
            Share your work, get feedback, and connect with creative professionals worldwide
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-blue-600 transition-all hover:scale-105 transform shadow-lg shadow-blue-500/50">
              CREATE POST
            </button>
            <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-yellow-400 transition-all hover:scale-105 transform shadow-lg shadow-yellow-500/50">
              EXPLORE COMMUNITY
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}