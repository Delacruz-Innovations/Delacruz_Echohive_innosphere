import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Linkedin, Twitter, Facebook, Lightbulb, ChevronRight } from 'lucide-react';
import insightsData from '../Components/insightsData';

const InsightDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const contentRef = useRef(null);
  const heroRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  const article = insightsData.insights.find(ins => ins.slug === slug);

  useEffect(() => {
    if (!article) navigate('/insights');
  }, [article, navigate]);

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

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#050b1a] text-white selection:bg-[#6b9dc7]/30 selection:text-[#6b9dc7]">
      {/* ProgressBar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-[#6b9dc7] to-blue-400 transition-all duration-300 ease-out"
          style={{ width: `${(insightsData.insights.findIndex(i => i.slug === slug) + 1) / insightsData.insights.length * 100}%` }}
        ></div>
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6b9dc7]/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>

        <div ref={heroRef} className="container mx-auto px-6 relative z-10">
          <button
            onClick={handleBack}
            className="group flex items-center text-gray-400 hover:text-[#6b9dc7] transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Insights
          </button>

          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-[#6b9dc7]/10 border border-[#6b9dc7]/20 rounded-full text-[#6b9dc7] text-xs font-bold tracking-widest uppercase">
                {article.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <Clock size={14} className="mr-1.5" />
                {article.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-white uppercase italic">
              {article.title}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-[#6b9dc7]/20 border border-[#6b9dc7]/30 flex items-center justify-center text-[#6b9dc7] font-bold text-lg mr-4">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <div className="text-white font-semibold">{article.author.name}</div>
                  <div className="text-gray-400 text-sm flex items-center">
                    <Calendar size={12} className="mr-1.5" />
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
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Contents</h3>
                  <nav>
                    <ul className="space-y-4">
                      {article.content.sections.map((section, index) => (
                        <li key={index}>
                          <a
                            href={`#section-${index}`}
                            className={`group flex items-center text-sm transition-all duration-300 ${activeSection === `section-${index}`
                                ? 'text-[#6b9dc7] font-bold'
                                : 'text-gray-400 hover:text-white'
                              }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${activeSection === `section-${index}` ? 'bg-[#6b9dc7] scale-125' : 'bg-gray-700'
                              }`}></span>
                            <span className="line-clamp-1">{section.heading.replace(/^\d+\.\s*/, '')}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">Share</h3>
                  <div className="flex flex-col gap-3">
                    <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 text-gray-400 hover:text-[#6b9dc7] transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#6b9dc7]/50 group-hover:bg-[#6b9dc7]/10">
                        <Linkedin size={18} />
                      </div>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 text-gray-400 hover:text-[#6b9dc7] transition-colors group">
                      <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#6b9dc7]/50 group-hover:bg-[#6b9dc7]/10">
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
              <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-16 group">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Introduction */}
              <div className="mb-16">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light italic border-l-4 border-[#6b9dc7] pl-8">
                  {article.content.intro}
                </p>
              </div>

              {/* Main Sections */}
              <div className="space-y-24">
                {article.content.sections.map((section, index) => (
                  <div
                    key={index}
                    data-section
                    id={`section-${index}`}
                    className="scroll-mt-32"
                  >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
                      {section.heading}
                    </h2>

                    <div className="prose prose-invert prose-lg max-w-none">
                      <div className="text-gray-300 leading-relaxed space-y-6 whitespace-pre-line">
                        {section.body}
                      </div>
                    </div>

                    {/* Innosphere Insight Box */}
                    {section.insight && (
                      <div className="mt-10 bg-gradient-to-br from-[#6b9dc7]/20 to-blue-900/10 border border-[#6b9dc7]/30 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Lightbulb size={120} className="text-[#6b9dc7]" />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4 text-[#6b9dc7]">
                            <div className="p-2 bg-[#6b9dc7]/20 rounded-lg">
                              <Lightbulb size={20} />
                            </div>
                            <span className="font-bold uppercase tracking-wider text-sm">Innosphere Insight</span>
                          </div>
                          <p className="text-xl text-white font-medium leading-relaxed italic">
                            "{section.insight}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Author Note / Conclusion */}
              {article.content.authorNote && (
                <div className="mt-24 p-1 rounded-2xl bg-gradient-to-r from-[#6b9dc7] to-blue-500">
                  <div className="bg-[#050b1a] rounded-[15px] p-10 md:p-14">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <ChevronRight className="text-[#6b9dc7] mr-2" />
                      Final Takeaway
                    </h3>
                    <p className="text-xl text-gray-300 leading-relaxed font-light whitespace-pre-line">
                      {article.content.authorNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Author Bio */}
              <div className="mt-24 pt-16 border-t border-white/10">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white/5 p-8 rounded-2xl border border-white/10">
                  <div className="w-24 h-24 rounded-full bg-[#6b9dc7]/20 border border-[#6b9dc7]/30 flex items-center justify-center text-[#6b9dc7] text-3xl font-bold flex-shrink-0">
                    {article.author.name.charAt(0)}
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-2xl font-bold text-white mb-4 italic uppercase">
                      About <span className="text-[#6b9dc7]">{article.author.name}</span>
                    </h4>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="bg-white/5 border-t border-white/10 py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4 uppercase italic">Related Insights</h2>
                <p className="text-gray-400">Continue your journey through our strategic knowledge hub.</p>
              </div>
              <button
                onClick={() => navigate('/insights')}
                className="hidden md:flex items-center text-[#6b9dc7] font-bold hover:gap-3 transition-all underline underline-offset-8"
              >
                View Library <ArrowLeft className="ml-2 rotate-180" size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {insightsData.insights
                .filter(i => i.slug !== slug)
                .slice(0, 3)
                .map((related, idx) => (
                  <div
                    key={idx}
                    onClick={() => navigate(`/insights/${related.slug}`)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
                      <img src={related.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    </div>
                    <div className="text-[#6b9dc7] text-xs font-bold uppercase tracking-widest mb-3">{related.category}</div>
                    <h4 className="text-xl font-bold text-white group-hover:text-[#6b9dc7] transition-colors leading-snug">
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