import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle, BookOpen, Clock, Calendar, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import insightsData from '../Components/insightsData';

const InsightsList = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const cardsRef = useRef([]);
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(insightsData.insights.map(i => i.category))];

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
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = `all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, [showAll, activeCategory]);

  const filteredInsights = activeCategory === 'All'
    ? insightsData.insights
    : insightsData.insights.filter(i => i.category === activeCategory);

  const displayedInsights = showAll ? filteredInsights : filteredInsights.slice(0, 6);

  const handleInsightClick = (slug) => {
    navigate(`/insights/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#050b1a] text-white selection:bg-[#6b9dc7]/30 selection:text-[#6b9dc7]">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#6b9dc7]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/4 -translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        </div>

        <div ref={heroRef} className="container mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#6b9dc7] animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Intelligence Hub</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-none italic uppercase">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b9dc7] via-blue-400 to-white">Perspectives</span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-12">
            Decoding global trends to empower regional leaders with actionable intelligence and future-proof strategies.
          </p>

          {/* Search/Filter Bar */}
          <div className="max-w-xl mx-auto flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 border ${activeCategory === cat
                    ? 'bg-[#6b9dc7] border-[#6b9dc7] text-white shadow-lg shadow-[#6b9dc7]/20'
                    : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/30 hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Insight (if exists) */}
      {activeCategory === 'All' && !showAll && insightsData.insights.some(i => i.featured) && (
        <section className="container mx-auto px-6 pb-24">
          {insightsData.insights.filter(i => i.featured).map(featured => (
            <div
              key={featured.id}
              onClick={() => handleInsightClick(featured.slug)}
              className="group relative h-[500px] rounded-3xl overflow-hidden cursor-pointer border border-white/10"
            >
              <img
                src={featured.image}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt={featured.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050b1a] via-[#050b1a]/40 to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-[#6b9dc7] text-white text-[10px] font-black tracking-widest uppercase rounded">Featured</span>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">{featured.category}</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-[#6b9dc7] transition-colors italic uppercase">
                  {featured.title}
                </h2>
                <div className="flex items-center gap-6 text-white/50 text-sm">
                  <span className="flex items-center gap-2"><Clock size={14} /> {featured.readTime}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} /> {featured.date}</span>
                </div>
              </div>

              <div className="absolute bottom-12 right-12 hidden md:block">
                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-[#6b9dc7] group-hover:border-[#6b9dc7] transition-all transform group-hover:scale-110">
                  <ArrowRight className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Insights Grid */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedInsights.map((insight, index) => (
            <div
              key={insight.id}
              ref={el => (cardsRef.current[index] = el)}
              onClick={() => handleInsightClick(insight.slug)}
              className="group flex flex-col bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-[#6b9dc7]/50 transition-all duration-500 cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#050b1a]/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-[#050b1a]/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-bold text-[#6b9dc7] uppercase tracking-widest">
                    {insight.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">
                  <span>{insight.date}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                  <span>{insight.readTime}</span>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-[#6b9dc7] transition-colors uppercase italic">
                  {insight.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-3 font-light">
                  {insight.excerpt}
                </p>

                <div className="flex items-center text-xs font-bold text-white uppercase tracking-widest group-hover:gap-3 transition-all">
                  Read Article <ArrowRight size={14} className="ml-2 text-[#6b9dc7]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInsights.length > displayedInsights.length && (
          <div className="text-center mt-20">
            <button
              onClick={() => setShowAll(true)}
              className="px-10 py-4 rounded-full border border-white/10 hover:border-[#6b9dc7] text-sm font-bold tracking-widest uppercase transition-all hover:bg-[#6b9dc7]/10"
            >
              View More Insights
            </button>
          </div>
        )}
      </section>

      {/* Expertise Section */}
      <section className="py-24 bg-white/5 border-y border-white/10 mt-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight uppercase italic">
                The <span className="text-[#6b9dc7]">Knowledge</span> Advantage
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Deep Sector Analysis", desc: "Granular insights into the MENA and West African economic landscapes." },
                  { title: "Future-Proof Frameworks", desc: "Actionable strategies designed for long-term organizational resilience." },
                  { title: "Cross-Industry Synthesis", desc: "Understanding how disparate trends converge to create new opportunities." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#6b9dc7]/20 flex items-center justify-center text-[#6b9dc7] transition-colors group-hover:bg-[#6b9dc7] group-hover:text-white">
                      <CheckCircle size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-gray-400 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-[40px] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#6b9dc7] rounded-3xl p-8 flex flex-col justify-end shadow-xl -rotate-6">
                <span className="text-5xl font-black text-white">50+</span>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest opacity-80">White Papers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <BookOpen className="text-[#6b9dc7] mx-auto mb-8" size={64} />
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase italic">Join the Elite <span className="text-[#6b9dc7]">Network</span></h2>
            <p className="text-gray-400 text-lg mb-12 font-light">
              Receive bi-weekly strategic intelligence briefings delivered directly to your executive suite.
            </p>
            <form className="relative max-w-lg mx-auto group">
              <input
                type="email"
                placeholder="EXECUTIVE@COMPANY.COM"
                className="w-full bg-white/5 border border-white/10 rounded-full py-5 px-8 outline-none focus:border-[#6b9dc7] transition-all text-sm font-bold tracking-widest uppercase placeholder:text-gray-600"
              />
              <button className="absolute right-2 top-2 bottom-2 px-8 bg-[#6b9dc7] rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-blue-400 transition-colors">
                Subscribe
              </button>
            </form>
            <p className="mt-8 text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
              Trusted by 10,000+ Business Leaders globally
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InsightsList;
