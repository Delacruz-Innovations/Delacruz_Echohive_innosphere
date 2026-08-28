import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { blogService } from '../services/blogService';
import insightsData from '../Components/insightsData';

const defaultCategories = [
  'All',
  'Business Transformation',
  'Process & Operations',
  'Digital Transformation',
  'AI & Automation',
  'Cybersecurity',
  'UAE Business'
];

const InsightsList = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [insights, setInsights] = useState(insightsData.insights || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPublishedBlogs();
      if (data && data.length > 0) {
        const remoteIds = new Set(data.map(d => d.slug || d.id));
        const merged = [...data, ...(insightsData.insights || []).filter(i => !remoteIds.has(i.slug) && !remoteIds.has(i.id))];
        setInsights(merged);
      } else {
        setInsights(insightsData.insights || []);
      }
    } catch (error) {
      console.warn("Fallback to static insights data:", error);
      setInsights(insightsData.insights || []);
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
        heroRef.current.style.transition = 'all 0.8s ease-out';
        heroRef.current.style.opacity = '1';
        heroRef.current.style.transform = 'translateY(0)';
      }, 100);
    }
  }, [showAll, activeCategory]);

  const filteredInsights = activeCategory === 'All'
    ? insights
    : insights.filter(i => i.category?.toLowerCase() === activeCategory.toLowerCase());

  const displayedInsights = showAll ? filteredInsights : filteredInsights.slice(0, 9);

  const handleInsightClick = (slug) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#ffffff] pt-36 pb-24">
      {/* Hero Section */}
      <section className="relative pb-16 overflow-hidden">
        <div ref={heroRef} className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm bg-[#0a2342]/70 text-[#ffffff] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Intelligence Hub & Executive Perspectives
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-[#ffffff]">
            Strategic <span className="text-blue-400">Insights & Analysis</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
            Decoding digital acceleration, operating models, and technology transformation across the UAE and global markets.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {defaultCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-sm text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#ffffff] text-[#000000] font-bold shadow-lg scale-105'
                    : 'bg-[#0a2342]/40 text-gray-300 hover:bg-[#0a2342] hover:text-[#ffffff]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedInsights.map((item, index) => (
            <div
              key={item.id || index}
              onClick={() => handleInsightClick(item.slug || item.id)}
              className="group bg-[#0a2342]/20 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.media?.coverImage || item.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.title}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#0a2342] text-[#ffffff] text-[11px] font-semibold tracking-wider uppercase rounded-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> {item.readTime || '5 min'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-blue-400" /> {item.date || '2026'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#ffffff] group-hover:text-blue-300 transition-colors mb-3 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                    {item.excerpt || item.content?.intro}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <div className="pt-4 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span>Read Full Perspective</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default InsightsList;
