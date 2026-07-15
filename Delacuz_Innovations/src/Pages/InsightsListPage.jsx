import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import insight1 from '../assets/Images/insight1.png';
import insight2 from '../assets/Images/insight2.png';
import insight3 from '../assets/Images/insight3.png';
import insight4 from '../assets/Images/insight4.png';
import insight5 from '../assets/Images/insight5.png';
import insight6 from '../assets/Images/insight6.png';
// Import blog service
import { blogService } from '../services/blogService';
import SEO, { SITE_URL } from '../utils/SEO';
import PageHero from '../Components/PageHero';

const placeholderImages = [insight1, insight2, insight3, insight4, insight5, insight6];

const InsightsListPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [allInsights, setAllInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      setLoading(true);
      const data = await blogService.getPublishedBlogs();
      setAllInsights(data);
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Insights & Perspectives | Delacruz Innovations"
        description="Expert analysis on digital transformation, business growth, and strategic innovation in African markets."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'Delacruz Insights',
          url: `${SITE_URL}/insights`,
          ...(allInsights.length > 0 && {
            blogPost: allInsights.map((insight) => ({
              '@type': 'BlogPosting',
              headline: insight.title,
              url: `${SITE_URL}/insights/${insight.slug}`,
              datePublished: insight.date,
            })),
          }),
        }}
      />
      <PageHero
        eyebrow="INSIGHTS & PERSPECTIVES"
        headline="Expert Analysis on Strategic Transformation"
        copy="Explore cutting-edge insights on digital transformation, business growth, and strategic innovation in African markets."
        primaryCTALabel="Speak to an Expert"
        scrollLabel="Read Insights"
        heroImage="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=1974"
      />

      {/* Articles Grid Section */}
      <div id="insights" className="min-h-screen bg-black py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-400">Loading insights...</p>
            </div>
          ) : allInsights.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-xl font-light italic">No live insights found at the moment. Please check back later!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allInsights.map((insight, index) => (
                <Link key={insight.id} to={`/insights/${insight.slug}`}>
                  <div className={`group cursor-pointer transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`} style={{ transitionDelay: `${index * 100}ms` }}>
                    <div className="bg-gray-900 rounded-lg overflow-hidden hover:border-purple-500 border border-gray-800 transition-all duration-300 h-full flex flex-col">
                      {/* Image Section */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={insight.media?.coverImage || insight.image || placeholderImages[index % 6]}
                          alt={insight.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase">
                            {insight.category}
                          </span>
                          <span className="text-gray-500 text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {insight.readTime}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                          {insight.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                          {insight.excerpt}
                        </p>

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span>{insight.date}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-purple-500 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InsightsListPage;