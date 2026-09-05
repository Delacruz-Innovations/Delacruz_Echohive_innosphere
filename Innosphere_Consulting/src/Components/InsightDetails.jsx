import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Facebook, Lightbulb, ChevronRight } from 'lucide-react';
import { blogService } from '../services/blogService';
import insightsData from '../Components/insightsData';

const InsightDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allInsights, setAllInsights] = useState([]);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      let data = null;

      // 1. Try fetching from remote blogService
      try {
        data = await blogService.getBlogBySlug(slug);
      } catch (err) {
        console.warn("Could not fetch remote blog by slug, falling back to static data:", err);
      }

      // 2. Fallback to local static insights data
      if (!data) {
        data = (insightsData.insights || []).find(
          (i) => i.slug === slug || i.id === slug
        );
      }

      if (!data) {
        setArticle(null);
        return;
      }

      // Normalize article data structure
      const normalizedData = {
        ...data,
        category: data.category || 'Strategic Insight',
        readTime: data.readTime || '5 min read',
        date: data.date || '2026',
        image: data.media?.coverImage || data.media?.heroImage || data.image,
        content: {
          intro: data.content?.intro || data.excerpt || '',
          sections: data.content?.sections || [],
          authorNote: data.content?.authorNote || data.conclusion?.body || ''
        }
      };

      setArticle(normalizedData);

      // Fetch related insights
      try {
        const remoteList = await blogService.getPublishedBlogs();
        if (remoteList && remoteList.length > 0) {
          const remoteIds = new Set(remoteList.map(d => d.slug || d.id));
          const merged = [...remoteList, ...(insightsData.insights || []).filter(i => !remoteIds.has(i.slug) && !remoteIds.has(i.id))];
          setAllInsights(merged);
        } else {
          setAllInsights(insightsData.insights || []);
        }
      } catch {
        setAllInsights(insightsData.insights || []);
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    if (heroRef.current) {
      heroRef.current.style.opacity = '0';
      heroRef.current.style.transform = 'translateY(30px)';

      setTimeout(() => {
        heroRef.current.style.transition = 'all 1s cubic-bezier(0.2, 0.8, 0.2, 1)';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }

    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-10% 0px -70% 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [article]);

  const handleBack = () => {
    navigate('/insights');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = article?.title || '';

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080f1d] flex flex-col items-center justify-center text-white">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-400 mb-4"></div>
        <p className="text-gray-400 font-light tracking-widest text-xs uppercase">Loading Perspective...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#080f1d] flex items-center justify-center text-white px-6 pt-24">
        <div className="text-center max-w-md">
          <h1 className="text-3xl font-bold text-white mb-4">Perspective Not Found</h1>
          <p className="text-gray-400 text-sm mb-6">The strategic insight you are looking for might have been moved or updated.</p>
          <button
            onClick={() => navigate('/insights')}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Strategic Insights
          </button>
        </div>
      </div>
    );
  }

  const coverImg = article.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80";

  return (
    <div className="min-h-screen bg-[#080f1d] text-white selection:bg-blue-500/30 selection:text-blue-300">
      {/* ProgressBar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 ease-out"
          style={{ width: `${((allInsights.findIndex(i => (i.slug || i.id) === slug) + 1) || 1) / (allInsights.length || 1) * 100}%` }}
        ></div>
      </div>

      {/* Hero Section with Content Image Background */}
      <div data-hero="true" className="relative pt-36 pb-20 overflow-hidden border-b border-white/5">
        {/* Panoramic Background Image with Midnight Navy Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform filter blur-[1px]"
            style={{
              backgroundImage: `url('${coverImg}')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/95 via-[#080f1d]/85 to-[#080f1d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0a2342]/40 rounded-full blur-[140px]" />
        </div>

        <div ref={heroRef} className="container mx-auto px-6 relative z-10 max-w-5xl">
         

          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[#0a2342] border border-blue-500/20 rounded-sm text-blue-400 text-xs font-bold tracking-widest uppercase">
                {article.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <Clock size={14} className="mr-1.5 text-blue-400" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-white">
              {article.title}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#0a2342] border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg mr-4 overflow-hidden">
                  {(article.authors?.[0]?.image || article.author?.image) ?
                    <img src={article.authors?.[0]?.image || article.author?.image} alt="" className="w-full h-full object-cover" /> :
                    (article.authors?.[0]?.name || article.author?.name || "I").charAt(0)
                  }
                </div>
                <div>
                  <div className="text-white font-semibold text-sm md:text-base">
                    {article.authors?.map(a => a.name).join(", ") || article.author?.name || "Innosphere Editorial"}
                  </div>
                  <div className="text-gray-400 text-xs flex items-center mt-0.5">
                    <Calendar size={12} className="mr-1.5 text-blue-400" />
                    {article.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Sidebar Left - Share & TOC */}
            <aside className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-32 space-y-12">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contents</h3>
                  <nav>
                    <ul className="space-y-4">
                      {article.content.sections.map((section, index) => (
                        <li key={index}>
                          <a
                            href={`#section-${index}`}
                            className={`group flex items-center text-sm transition-all duration-300 ${activeSection === `section-${index}`
                              ? 'text-blue-400 font-bold'
                              : 'text-gray-400 hover:text-white'
                              }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${activeSection === `section-${index}` ? 'bg-blue-400 scale-125' : 'bg-gray-700'
                              }`}></span>
                            <span className="line-clamp-1">{section.heading.replace(/^\d+\.\s*/, '')}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Share</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group">
                      <div className="w-10 h-10 rounded-sm bg-[#0a2342]/50 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-[#0a2342]">
                        <Linkedin size={18} />
                      </div>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group">
                      <div className="w-10 h-10 rounded-sm bg-[#0a2342]/50 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-[#0a2342]">
                        <Twitter size={18} />
                      </div>
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Body */}
            <article ref={contentRef} className="lg:col-span-9">
              {/* Featured Image */}
              <div className="relative aspect-[21/9] rounded-sm overflow-hidden mb-16 group border border-white/10 shadow-2xl">
                <img
                  src={article.media?.coverImage || article.media?.heroImage || article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Introduction */}
              <div className="mb-16">
                <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic border-l-4 border-blue-400 pl-8">
                  {article.content.intro}
                </p>
              </div>

              {/* Main Sections */}
              <div className="space-y-20">
                {article.content.sections.map((section, index) => (
                  <div
                    key={index}
                    data-section
                    id={`section-${index}`}
                    className="scroll-mt-32"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 tracking-tight">
                      {section.heading}
                    </h2>

                    <div className="prose prose-invert prose-lg max-w-none">
                      <div className="text-gray-300 leading-relaxed space-y-6 whitespace-pre-line text-base md:text-lg">
                        {section.body || section.content}
                      </div>
                      {section.hasPoints && section.points && (
                        <ul className="mt-8 space-y-4">
                          {section.points.map((point, pIdx) => (
                            <li key={pIdx} className="flex gap-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0"></div>
                              <div>
                                <span className="text-white font-bold">{point.title}:</span>
                                <span className="text-gray-300 ml-2">{point.description}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Innosphere Insight Box */}
                    {section.insight && (
                      <div className="mt-10 bg-[#0a2342]/40 border border-blue-500/20 rounded-sm p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Lightbulb size={120} className="text-blue-400" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4 text-blue-400">
                            <div className="p-2 bg-[#0a2342] rounded-sm border border-blue-500/20">
                              <Lightbulb size={20} />
                            </div>
                            <span className="font-bold uppercase tracking-wider text-xs">Innosphere Strategic Takeaway</span>
                          </div>
                          <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic">
                            "{section.insight}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Author Note / Conclusion */}
              {(article.conclusion?.body || article.content.authorNote) && (
                <div className="mt-20 p-[1px] rounded-sm bg-gradient-to-r from-blue-500/40 to-[#0a2342]">
                  <div className="bg-[#080f1d] rounded-sm p-8 md:p-12 border border-white/5">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center">
                      <ChevronRight className="text-blue-400 mr-2" />
                      {article.conclusion?.heading || "Executive Perspective Summary"}
                    </h3>
                    <p className="text-base md:text-lg text-gray-300 leading-relaxed font-light whitespace-pre-line">
                      {article.conclusion?.body || article.content.authorNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-20 pt-12 border-t border-white/10">
                {(article.authors || [article.author]).filter(Boolean).map((auth, idx) => (
                  <div key={idx} className={`flex flex-col md:flex-row items-center md:items-start gap-6 bg-[#0a2342]/20 p-8 rounded-sm border border-white/5 ${idx > 0 ? "mt-8" : ""}`}>
                    <div className="w-20 h-20 rounded-full bg-[#0a2342] border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl font-bold flex-shrink-0 overflow-hidden">
                      {auth.image ? <img src={auth.image} alt="" className="w-full h-full object-cover" /> : (auth.name || 'I').charAt(0)}
                    </div>
                    <div className="text-center md:text-left">
                      <h4 className="text-xl font-bold text-white mb-2">
                        About <span className="text-blue-400">{auth.name}</span>
                      </h4>
                      <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                        {auth.bio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="bg-[#0a2342]/10 border-t border-white/5 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Related Perspectives</h2>
                <p className="text-gray-400 text-sm">Continue exploring our strategic knowledge hub.</p>
              </div>
              <button
                onClick={() => navigate('/insights')}
                className="hidden md:flex items-center text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors"
              >
                View All Insights <ArrowLeft className="ml-2 rotate-180" size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allInsights
                .filter(i => (i.slug || i.id) !== slug)
                .slice(0, 3)
                .map((related, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/insights/${related.slug || related.id}`)}
                    className="group cursor-pointer bg-[#0a2342]/20 border border-white/5 hover:border-blue-500/30 rounded-sm overflow-hidden transition-all duration-300 p-4"
                  >
                    <div className="relative aspect-video rounded-sm overflow-hidden mb-4">
                      <img src={related.media?.coverImage || related.media?.heroImage || related.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
                    </div>
                    <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">{related.category}</div>
                    <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                      {related.title}
                    </h4>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightDetails;