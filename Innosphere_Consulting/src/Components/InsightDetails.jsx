import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Calendar,
  Linkedin,
  Twitter,
  Facebook,
  Lightbulb,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  HelpCircle,
  Share2,
  BookOpen
} from 'lucide-react';
import { blogService, normalizeInsight } from '../services/blogService';
import insightsData from '../Components/insightsData';
import {
  trackArticleView,
  trackBlogScrollDepth,
  trackBlogTimeOnPage,
  trackSocialShareClick,
  trackRelatedPostClick
} from '../utils/analytics';

const InsightDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isPreview = searchParams.get('preview') === 'true';

  const contentRef = useRef(null);
  const heroRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const trackedDepths = useRef(new Set());

  const [activeSection, setActiveSection] = useState('');
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allInsights, setAllInsights] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      let data = null;

      // 1. Try fetching from remote blogService
      try {
        data = await blogService.getBlogBySlug(slug, isPreview);
      } catch (err) {
        console.warn("Could not fetch remote blog by slug, falling back to static data:", err);
      }

      // 2. Fallback to local static insights data
      if (!data) {
        const found = (insightsData.insights || []).find(
          (i) => i.slug === slug || i.id === slug
        );
        if (found) {
          data = normalizeInsight(found);
        }
      }

      if (!data) {
        setArticle(null);
        return;
      }

      setArticle(data);

      // Dynamic Title & SEO
      if (data.seo?.metaTitle || data.title) {
        document.title = `${data.seo?.metaTitle || data.title} | Innosphere Consulting`;
      }

      // Fetch related insights
      try {
        const remoteList = await blogService.getPublishedBlogs();
        const normalizedStatic = (insightsData.insights || []).map(normalizeInsight);
        if (remoteList && remoteList.length > 0) {
          setAllInsights(remoteList);
        } else {
          setAllInsights(normalizedStatic);
        }
      } catch {
        setAllInsights((insightsData.insights || []).map(normalizeInsight));
      }
    } catch (error) {
      console.error("Error fetching article:", error);
      setArticle(null);
    } finally {
      setLoading(false);
    }
  };

  // Track Article View & Dwell Time
  useEffect(() => {
    if (!article) return;

    startTimeRef.current = Date.now();
    trackedDepths.current = new Set();

    const authorNames = (article.authors || []).map(a => a.name).join(', ');
    trackArticleView({
      slug: article.slug,
      title: article.title,
      category: article.category,
      authorNames
    });

    return () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      if (timeSpent > 0) {
        trackBlogTimeOnPage(article.slug, timeSpent);
      }
    };
  }, [article?.slug]);

  // Scroll Depth & Intersection Observer
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

    // Scroll depth tracking
    const handleScroll = () => {
      if (!article?.slug) return;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      [25, 50, 75, 100].forEach((milestone) => {
        if (scrollPercent >= milestone && !trackedDepths.current.has(milestone)) {
          trackedDepths.current.add(milestone);
          trackBlogScrollDepth(article.slug, milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // TOC Active Section Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -70% 0px' }
    );

    const sections = document.querySelectorAll('[data-section]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [article]);

  const handleBack = () => {
    navigate('/insights');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const text = article?.title || '';

    trackSocialShareClick(article?.slug || slug, platform);

    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    };

    window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const toggleFaq = (idx) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
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
            onClick={handleBack}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Strategic Insights
          </button>
        </div>
      </div>
    );
  }

  const coverImg = article.coverImage?.url || article.image;
  const sections = article.sections || article.content?.sections || [];
  const authors = article.authors && article.authors.length > 0 ? article.authors : [article.author];
  const faqs = article.faq || [];

  return (
    <div className="min-h-screen bg-[#080f1d] text-white selection:bg-blue-500/30 selection:text-blue-300">
      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-300 transition-all duration-300 ease-out"
          style={{
            width: `${((allInsights.findIndex(i => (i.slug || i.id) === slug) + 1) || 1) / (allInsights.length || 1) * 100}%`
          }}
        />
      </div>

      {/* Hero Section */}
      <div data-hero="true" className="relative pt-36 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity scale-105 transform filter blur-[1px]"
            style={{ backgroundImage: `url('${coverImg}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/95 via-[#080f1d]/85 to-[#080f1d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#0a2342]/40 rounded-full blur-[140px]" />
        </div>

        <div ref={heroRef} className="container mx-auto px-6 relative z-10 max-w-5xl">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors mb-8 group"
          >
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to All Insights
          </button>

          {isPreview && (
            <div className="inline-block px-3 py-1 mb-4 bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold tracking-wider uppercase rounded-sm">
              Preview Mode (Draft / Scheduled Post)
            </div>
          )}

          <div>
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <span className="px-3 py-1 bg-[#0a2342] border border-blue-500/20 rounded-sm text-blue-400 text-xs font-bold tracking-widest uppercase">
                {article.category}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <Clock size={14} className="mr-1.5 text-blue-400" />
                {article.readTime}
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-600"></span>
              <div className="flex items-center text-gray-400 text-xs font-medium">
                <Calendar size={14} className="mr-1.5 text-blue-400" />
                {article.publishedAt || article.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight tracking-tight text-white">
              {article.title}
            </h1>

            {article.subtitle && (
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl leading-relaxed font-light">
                {article.subtitle}
              </p>
            )}

            {/* Author Attribution Header */}
            <div className="flex items-center gap-6 flex-wrap">
              {authors.slice(0, 2).map((author, aIdx) => (
                <div key={aIdx} className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#0a2342] border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-lg mr-4 overflow-hidden flex-shrink-0">
                    {author.photoUrl || author.image ? (
                      <img src={author.photoUrl || author.image} alt={author.name} className="w-full h-full object-cover" />
                    ) : (
                      (author.name || 'I').charAt(0)
                    )}
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm md:text-base">
                      {author.name}
                    </div>
                    <div className="text-gray-400 text-xs mt-0.5">
                      {author.role || 'Strategic Practice Lead'}
                    </div>
                  </div>
                </div>
              ))}
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
                {sections.length > 0 && (
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Contents</h3>
                    <nav>
                      <ul className="space-y-4">
                        {sections.map((section, index) => {
                          const sectionId = section.id || `section-${index}`;
                          const isCurrent = activeSection === sectionId;
                          return (
                            <li key={index}>
                              <a
                                href={`#${sectionId}`}
                                className={`group flex items-center text-sm transition-all duration-300 ${
                                  isCurrent ? 'text-blue-400 font-bold' : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full mr-3 transition-all duration-300 ${
                                    isCurrent ? 'bg-blue-400 scale-125' : 'bg-gray-700'
                                  }`}
                                />
                                <span className="line-clamp-1">{section.heading.replace(/^\d+\.\s*/, '')}</span>
                              </a>
                            </li>
                          );
                        })}
                        {faqs.length > 0 && (
                          <li>
                            <a
                              href="#faqs-section"
                              className="group flex items-center text-sm text-gray-400 hover:text-white transition-colors"
                            >
                              <span className="w-1.5 h-1.5 rounded-full mr-3 bg-gray-700" />
                              <span>Frequently Asked Questions</span>
                            </a>
                          </li>
                        )}
                      </ul>
                    </nav>
                  </div>
                )}

                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Share Perspective</h3>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-sm bg-[#0a2342]/50 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-[#0a2342]">
                        <Linkedin size={18} />
                      </div>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-sm bg-[#0a2342]/50 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-[#0a2342]">
                        <Twitter size={18} />
                      </div>
                      <span className="text-sm font-medium">Twitter / X</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-sm bg-[#0a2342]/50 border border-white/10 flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-[#0a2342]">
                        <Facebook size={18} />
                      </div>
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Article Body */}
            <article ref={contentRef} className="lg:col-span-9">
              {/* Featured Cover Image */}
              <div className="relative aspect-[21/9] rounded-sm overflow-hidden mb-16 group border border-white/10 shadow-2xl">
                <img
                  src={coverImg}
                  alt={article.coverImage?.alt || article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080f1d] via-transparent to-transparent opacity-60"></div>
                {article.coverImage?.caption && (
                  <div className="absolute bottom-3 left-4 text-xs text-gray-300 bg-black/60 px-3 py-1 rounded-sm backdrop-blur-sm">
                    {article.coverImage.caption}
                  </div>
                )}
              </div>

              {/* Introduction / Executive Summary */}
              {article.content?.intro && (
                <div className="mb-16">
                  <p className="text-xl md:text-2xl text-gray-200 leading-relaxed font-light italic border-l-4 border-blue-400 pl-8">
                    {article.content.intro}
                  </p>
                </div>
              )}

              {/* Main Structured Sections */}
              <div className="space-y-20">
                {sections.map((section, index) => {
                  const sectionId = section.id || `section-${index}`;
                  const takeawayText = section.takeaway || section.insight;

                  return (
                    <div
                      key={sectionId}
                      data-section
                      id={sectionId}
                      className="scroll-mt-32"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                        {section.heading}
                      </h2>

                      {section.subtitle && (
                        <h3 className="text-lg md:text-xl font-medium text-blue-300 mb-6">
                          {section.subtitle}
                        </h3>
                      )}

                      <div className="prose prose-invert prose-lg max-w-none">
                        <div className="text-gray-300 leading-relaxed space-y-6 whitespace-pre-line text-base md:text-lg">
                          {section.body}
                        </div>

                        {/* Structured Points */}
                        {section.hasPoints && section.points && section.points.length > 0 && (
                          <ul className="mt-8 space-y-4">
                            {section.points.map((point, pIdx) => (
                              <li key={pIdx} className="flex gap-4">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2.5 flex-shrink-0" />
                                <div>
                                  <span className="text-white font-bold">{point.title}:</span>
                                  <span className="text-gray-300 ml-2">{point.description}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Section Images Gallery */}
                        {section.images && section.images.length > 0 && (
                          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.images.map((img, iIdx) => (
                              <div key={iIdx} className="rounded-sm overflow-hidden border border-white/10 bg-black/40">
                                <img src={img.url} alt={img.alt || section.heading} className="w-full h-48 object-cover" />
                                {img.caption && (
                                  <div className="p-2 text-xs text-gray-400 italic bg-[#0a2342]/20">
                                    {img.caption}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Section Reference Citations */}
                        {section.references && section.references.length > 0 && (
                          <div className="mt-8 pt-4 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs text-gray-400">
                            <span className="font-semibold text-gray-300">References:</span>
                            {section.references.map((ref, rIdx) => (
                              <a
                                key={rIdx}
                                href={ref.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline underline-offset-4"
                              >
                                {ref.label} <ExternalLink size={12} />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Strategic Takeaway Highlight Callout */}
                      {takeawayText && (
                        <div className="mt-10 bg-[#0a2342]/40 border border-blue-500/20 rounded-sm p-8 relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Lightbulb size={120} className="text-blue-400" />
                          </div>
                          <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4 text-blue-400">
                              <div className="p-2 bg-[#0a2342] rounded-sm border border-blue-500/20">
                                <Lightbulb size={20} />
                              </div>
                              <span className="font-bold uppercase tracking-wider text-xs">
                                Strategic Takeaway
                              </span>
                            </div>
                            <p className="text-lg md:text-xl text-white font-medium leading-relaxed italic">
                              "{takeawayText}"
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* FAQs Accordion */}
              {faqs.length > 0 && (
                <div id="faqs-section" className="mt-20 scroll-mt-32">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-[#0a2342] border border-blue-500/20 rounded-sm text-blue-400">
                      <HelpCircle size={22} />
                    </div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">
                      Frequently Asked Questions
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {faqs.map((faq, fIdx) => {
                      const isOpen = openFaqIndex === fIdx;
                      return (
                        <div
                          key={fIdx}
                          className="bg-[#0a2342]/20 border border-white/5 rounded-sm overflow-hidden transition-colors"
                        >
                          <button
                            onClick={() => toggleFaq(fIdx)}
                            className="w-full p-6 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-blue-300 transition-colors"
                          >
                            <span>{faq.question}</span>
                            <ChevronDown
                              size={18}
                              className={`text-blue-400 transform transition-transform duration-300 flex-shrink-0 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/5 pt-4">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Author Note / Conclusion */}
              {(article.conclusion?.body || article.content?.authorNote) && (
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

              {/* Authors Bios */}
              <div className="mt-20 pt-12 border-t border-white/10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">About the Authors</h3>
                <div className="space-y-6">
                  {authors.filter(Boolean).map((auth, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-[#0a2342]/20 p-8 rounded-sm border border-white/5"
                    >
                      <div className="w-20 h-20 rounded-full bg-[#0a2342] border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl font-bold flex-shrink-0 overflow-hidden">
                        {auth.photoUrl || auth.image ? (
                          <img src={auth.photoUrl || auth.image} alt={auth.name} className="w-full h-full object-cover" />
                        ) : (
                          (auth.name || 'I').charAt(0)
                        )}
                      </div>
                      <div className="text-center md:text-left flex-1">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                          <h4 className="text-xl font-bold text-white">
                            {auth.name}
                          </h4>
                          {auth.linkedinUrl && (
                            <a
                              href={auth.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-semibold"
                            >
                              <Linkedin size={14} /> Connect on LinkedIn
                            </a>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                          {auth.role || 'Strategic Practice Lead'}
                        </div>
                        <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                          {auth.bio || 'Advisory practice lead tracking enterprise architecture, process re-engineering, and strategic growth models.'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Recommended Related Perspectives */}
      <div className="bg-[#0a2342]/10 border-t border-white/5 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Related Perspectives</h2>
                <p className="text-gray-400 text-sm">Continue exploring our strategic knowledge hub.</p>
              </div>
              <button
                onClick={handleBack}
                className="hidden md:flex items-center text-blue-400 font-semibold text-sm hover:text-blue-300 transition-colors"
              >
                View All Insights <ArrowLeft className="ml-2 rotate-180" size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allInsights
                .filter((i) => (i.slug || i.id) !== slug)
                .slice(0, 3)
                .map((related, idx) => {
                  const relatedSlug = related.slug || related.id;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        trackRelatedPostClick(slug, relatedSlug);
                        navigate(`/insights/${relatedSlug}`);
                      }}
                      className="group cursor-pointer bg-[#0a2342]/20 border border-white/5 hover:border-blue-500/30 rounded-sm overflow-hidden transition-all duration-300 p-4"
                    >
                      <div className="relative aspect-video rounded-sm overflow-hidden mb-4 bg-black/40">
                        <img
                          src={related.coverImage?.url || related.image}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={related.coverImage?.alt || related.title}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">
                        {related.category}
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                        {related.title}
                      </h4>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightDetails;