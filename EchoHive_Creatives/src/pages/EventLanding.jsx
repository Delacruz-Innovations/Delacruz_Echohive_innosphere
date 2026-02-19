import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Import blog service
import { blogService } from '../services/blogService';

export default function NewsDetails() {
  const { id } = useParams(); // URL parameter is now the slug
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const [currentNews, setCurrentNews] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    jobTitle: '',
    market: '',
    agreeInfo: false,
    agreeTerms: false
  });

  useEffect(() => {
    fetchNews();
  }, [id]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const news = await blogService.getBlogBySlug(id);
      if (news) {
        setCurrentNews(news);
        const all = await blogService.getPublishedBlogs();
        const related = all.filter(item => item.slug !== id).slice(0, 3);
        setRelatedNews(related);
      } else {
        navigate('/news');
      }
    } catch (error) {
      console.error("Error fetching news detail:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    const geometry1 = new THREE.TorusGeometry(1, 0.3, 16, 100);
    const geometry2 = new THREE.IcosahedronGeometry(1, 0);
    const geometry3 = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);

    const material1 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const material2 = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const material3 = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });

    const torus = new THREE.Mesh(geometry1, material1);
    const icosahedron = new THREE.Mesh(geometry2, material2);
    const cylinder = new THREE.Mesh(geometry3, material3);

    torus.position.set(-2, 1, 0);
    icosahedron.position.set(2, -1, -1);
    cylinder.position.set(0, 2, -2);

    scene.add(torus, icosahedron, cylinder);

    const animate = () => {
      requestAnimationFrame(animate);

      torus.rotation.x += 0.001;
      torus.rotation.y += 0.002;
      icosahedron.rotation.x += 0.002;
      icosahedron.rotation.y += 0.001;
      cylinder.rotation.x += 0.001;
      cylinder.rotation.z += 0.002;

      renderer.render(scene, camera);
    };
    animate();

    const ctx = gsap.context(() => {
      gsap.from('.hero-title', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top center',
          end: 'bottom center',
          scrub: 1
        },
        y: 100,
        opacity: 0,
        scale: 0.8
      });

      gsap.from('.hero-date', {
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top center',
          scrub: 1
        },
        y: 50,
        opacity: 0
      });

      gsap.to('.pink-image', {
        scrollTrigger: {
          trigger: '.image-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        },
        y: -100
      });

      gsap.from('.webinar-content', {
        scrollTrigger: {
          trigger: '.webinar-section',
          start: 'top center+=100',
          end: 'center center',
          scrub: 1
        },
        x: -100,
        opacity: 0
      });

      gsap.from('.form-field', {
        scrollTrigger: {
          trigger: '.form-section',
          start: 'top center+=200',
          toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
      });

      gsap.from('.news-card', {
        scrollTrigger: {
          trigger: '.news-section',
          start: 'top center+=100',
          toggleActions: 'play none none reverse'
        },
        scale: 0.9,
        opacity: 0,
        duration: 1
      });

      gsap.to(torus.position, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        },
        y: -3,
        x: 1
      });

      gsap.to(icosahedron.position, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        },
        y: 3,
        x: -1
      });

      gsap.to(cylinder.position, {
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1
        },
        y: -2,
        z: -3
      });
    });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
      renderer.dispose();
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.firstName || !formData.lastName || !formData.company ||
      !formData.email || !formData.jobTitle || !formData.market || !formData.agreeTerms) {
      alert('Please fill in all required fields and agree to terms');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Registration submitted! (Demo only)');
  };

  const scrollToForm = () => {
    document.querySelector('.form-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleRelatedNewsClick = (newsId) => {
    navigate(`/news/${newsId}`);
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-400">Loading Story...</p>
    </div>;
  }

  if (!currentNews) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">News not found</div>;
  }

  return (
    <div className="relative bg-black text-white overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />

      <section className="hero-section relative min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="hero-title max-w-7xl">
          <p className="text-sm tracking-widest text-blue-400 mb-6">{currentNews.category}</p>
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-8">
            {currentNews.title.split(' ').map((word, i) => (
              <React.Fragment key={i}>
                {word}
                {i < currentNews.title.split(' ').length - 1 && ' '}
                {(i + 1) % 5 === 0 && <br />}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-date text-gray-400 text-lg mb-8">{currentNews.date}</p>
          {currentNews.hasRegister && (
            <button
              onClick={scrollToForm}
              className="bg-white text-black px-12 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
            >
              REGISTER
            </button>
          )}
        </div>
      </section>

      <div className="image-section">
        <img
          src={currentNews.media?.coverImage || currentNews.detailImage || currentNews.image}
          alt={currentNews.title}
          className='pink-image h-[500px] w-full object-cover'
        />
      </div>

      {currentNews.description && (
        <section className="webinar-section relative py-32 px-6 md:px-20">
          <div className="webinar-content max-w-5xl mx-auto">
            {currentNews.subtitle && (
              <h2 className="text-5xl font-black mb-12 text-blue-400">{currentNews.subtitle}</h2>
            )}

            <h3 className="text-3xl font-bold mb-6">
              {currentNews.title}
            </h3>

            {currentNews.eventDate && (
              <p className="text-xl italic text-yellow-400 mb-12">
                {currentNews.eventDate}
              </p>
            )}

            <div className="space-y-6 text-lg leading-relaxed text-gray-300">
              {Array.isArray(currentNews.description) ?
                currentNews.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )) :
                <p>{currentNews.description}</p>
              }
              {currentNews.content?.sections?.map((section, sIdx) => (
                <div key={sIdx} className="mt-12">
                  {section.heading && <h4 className="text-2xl font-bold mb-4 text-white uppercase">{section.heading}</h4>}
                  <div className="whitespace-pre-line">{section.body || section.content}</div>
                  {section.hasPoints && section.points && (
                    <ul className="mt-6 space-y-3">
                      {section.points.map((p, pIdx) => (
                        <li key={pIdx} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2.5 flex-shrink-0"></div>
                          <div>
                            <span className="font-bold text-white">{p.title}:</span>
                            <span className="ml-2">{p.description}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {currentNews.hasRegister && (
        <section className="form-section relative py-25 px-6">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-5xl font-black mb-16 text-center">SIGN UP</h2>

            <div className="space-y-8">
              <div className="form-field">
                <label className="block text-sm font-bold mb-2">FIRST NAME *</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-600 py-3 focus:border-blue-400 outline-none transition-colors"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-bold mb-2">LAST NAME *</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-600 py-3 focus:border-blue-400 outline-none transition-colors"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-bold mb-2">COMPANY NAME *</label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-600 py-3 focus:border-blue-400 outline-none transition-colors"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-bold mb-2">EMAIL ADDRESS *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-600 py-3 focus:border-blue-400 outline-none transition-colors"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-bold mb-2">JOB TITLE *</label>
                <input
                  type="text"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-600 py-3 focus:border-blue-400 outline-none transition-colors"
                />
              </div>

              <div className="form-field">
                <label className="block text-sm font-bold mb-2">MARKET *</label>
                <input
                  type="text"
                  value={formData.market}
                  onChange={(e) => handleInputChange('market', e.target.value)}
                  className="w-full bg-transparent border-b-2 border-gray-600 py-3 focus:border-blue-400 outline-none transition-colors"
                />
              </div>

              <div className="form-field space-y-4 pt-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeInfo}
                    onChange={(e) => handleInputChange('agreeInfo', e.target.checked)}
                    className="mt-1 w-5 h-5 accent-blue-400"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to receive information from Dentsu Creative
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    className="mt-1 w-5 h-5 accent-blue-400"
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the <span className="underline">Terms and Conditions</span> *
                  </span>
                </label>
              </div>

              <div className="form-field flex justify-end pt-8">
                <button
                  onClick={handleSubmit}
                  className="bg-white text-black px-16 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105"
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="relative py-32 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen">
        <h2 className="text-5xl font-black text-center mb-20 text-white">RELATED NEWS</h2>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedNews.map((news, index) => (
            <Link
              key={news.id}
              to={`/news/${news.slug}`}
              className="news-card bg-transparent overflow-hidden transition-all duration-500 group cursor-pointer"
            >
              <div className="flex flex-col">
                <div className="bg-white flex items-center justify-center overflow-hidden">
                  <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 overflow-hidden">
                      <img
                        src={news.media?.coverImage || news.image}
                        alt={news.title}
                        className="w-full h-full object-cover grayscale transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
                <div className="p-6 text-white">
                  <p className="text-xs text-gray-400 mb-3 tracking-wider">{news.category}</p>
                  <h3 className="text-lg font-bold mb-4 leading-tight">
                    {news.title}
                  </h3>
                  <p className="text-sm text-gray-400">{news.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}