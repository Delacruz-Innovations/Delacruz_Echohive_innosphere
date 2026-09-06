import React, { useEffect, useRef, useState, useMemo } from 'react';
import { ArrowRight, Clock, Calendar, Search, Filter, Sparkles, BookOpen } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { blogService, normalizeInsight } from '../services/blogService';
import insightsData from '../Components/insightsData';

const InsightsList = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const heroRef = useRef(null);

  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Category filter state synced with URL query params
  const activeCategory = searchParams.get('category') || 'All';

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPublishedBlogs();
      const normalizedStatic = (insightsData.insights || []).map(normalizeInsight);

      if (data && data.length > 0) {
        // Read directly from Firestore database
        setInsights(data);
      } else {
        setInsights(normalizedStatic);
      }
    } catch (error) {
      console.warn("Fallback to static insights data:", error);
      const normalizedStatic = (insightsData.insights || []).map(normalizeInsight);
      setInsights(normalizedStatic);
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
  }, []);

  // Compute available unique categories
  const categories = useMemo(() => {
    const set = new Set();
    insights.forEach(item => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [insights]);

  // Filter insights based on activeCategory and searchQuery
  const filteredInsights = useMemo(() => {
    return insights.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = searchQuery.trim() === '' ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchesCategory && matchesSearch;
    });
  }, [insights, activeCategory, searchQuery]);

  const handleCategorySelect = (category) => {
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category });
    }
  };

  const handleInsightClick = (slug) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#080f1d] text-[#ffffff] pb-24 selection:bg-blue-500/30 selection:text-blue-300">
      {/* Hero Section with Panoramic Background */}
      <section data-hero="true" className="relative overflow-hidden pt-36 pb-20 border-b border-white/5 mb-12">
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80')`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080f1d]/90 via-[#080f1d]/80 to-[#080f1d]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#0a2342]/40 rounded-full blur-[140px]" />
        </div>

        <div ref={heroRef} className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Sparkles size={14} /> Strategic Perspectives
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight leading-tight text-[#ffffff]">
            Strategic <span className="text-blue-400">Insights & Analysis</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Executive intelligence on digital acceleration, operating model transformation, and modern enterprise architecture across regional and global markets.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="container mx-auto px-6 max-w-7xl mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/5">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-[#0a2342]/40 text-gray-300 hover:text-white hover:bg-[#0a2342]/80 border border-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search perspectives..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0a2342]/30 border border-white/10 rounded-sm text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/60 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="container mx-auto px-6 max-w-7xl">
        {loading ? (
          /* Loading Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((sk) => (
              <div key={sk} className="bg-[#0a2342]/20 rounded-sm overflow-hidden border border-white/5 animate-pulse flex flex-col justify-between h-[420px]">
                <div>
                  <div className="h-48 bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-white/10 rounded w-1/3" />
                    <div className="h-6 bg-white/10 rounded w-4/5" />
                    <div className="space-y-2">
                      <div className="h-3 bg-white/5 rounded w-full" />
                      <div className="h-3 bg-white/5 rounded w-2/3" />
                    </div>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <div className="h-4 bg-white/10 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredInsights.length > 0 ? (
          /* Articles Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((item, index) => (
              <div
                key={item.id || item.slug || index}
                onClick={() => handleInsightClick(item.slug || item.id)}
                className="group bg-[#0a2342]/20 border border-white/5 hover:border-blue-500/30 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-black/40">
                    <img
                      src={item.coverImage?.url || item.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={item.coverImage?.alt || item.title}
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#0a2342]/90 backdrop-blur-sm border border-blue-500/30 text-blue-300 text-[11px] font-semibold tracking-wider uppercase rounded-sm">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-400" /> {item.readTime || `${item.readTimeMinutes || 5} min`}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-blue-400" /> {item.publishedAt || item.date || '2026'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#ffffff] group-hover:text-blue-300 transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {item.subtitle || item.content?.intro}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                    <span>Read Full Perspective</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-[#0a2342]/10 border border-white/5 rounded-sm max-w-2xl mx-auto px-6">
            <BookOpen className="w-12 h-12 text-blue-400/60 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Strategic Perspectives Found</h3>
            <p className="text-gray-400 text-sm mb-6">
              We couldn't find any articles matching your search query or selected category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                handleCategorySelect('All');
              }}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default InsightsList;
