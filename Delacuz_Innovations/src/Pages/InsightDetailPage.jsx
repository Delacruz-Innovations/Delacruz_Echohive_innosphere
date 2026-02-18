import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import insight1 from '../assets/Images/insight1.png';
import insight2 from '../assets/Images/insight2.png';
import insight3 from '../assets/Images/insight3.png';
import insight4 from '../assets/Images/insight4.png';
import insight5 from '../assets/Images/insight5.png';
import insight6 from '../assets/Images/insight6.png';
// Import insights data
import insightsData from '../InsightsData.json';
import CalendlyPopup from '../Components/CalendlyPopup';

const InsightDetailPage = () => {
  const placeholderImages = [insight1, insight2, insight3, insight4, insight5, insight6];

  const [isVisible, setIsVisible] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { insightId } = useParams(); // <-- Must come FIRST

  // Find the insight based on URL parameter
  const insight = insightsData.insights.find(i => i.id === insightId) || insightsData.insights[0]; // <-- Must come SECOND

  const insightIndex = insightsData.insights.findIndex(i => i.id === insightId); // <-- Now this can work

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, [insightId]);

  // Get current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = insight.title;
  const shareText = insight.excerpt;

  // Share handlers
  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowShareMenu(false);
    }, 2000);
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative py-28 px-4 sm:px-6 lg:px-8 min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={placeholderImages[insightIndex !== -1 ? insightIndex % 6 : 0]}
            alt={insight.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/60"></div>
        </div>

        {/* Content */}
        <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          {/* Back Button */}
          <Link to="/insights" className="inline-block">
            <button className="text-purple-400 hover:text-purple-300 mb-8 flex items-center gap-2 transition-colors duration-300 group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Insights</span>
            </button>
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span className="bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-full uppercase tracking-wide">
              {insight.category}
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
            {insight.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-400 mb-8 leading-relaxed">
            {insight.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex items-center gap-6 text-gray-500 flex-wrap">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{insight.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{insight.readTime}</span>
            </div>

            {/* Share Button */}
            <button
              onClick={() => setShowShareMenu(true)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors duration-300 group ml-auto"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>


      {/* Content Section */}
      <div className="bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Quote Section */}
          <div className={`mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <div className="bg-gray-900 border-l-4 border-purple-500 p-6 sm:p-8 rounded-r-lg">
              <p className="text-xl sm:text-2xl font-semibold text-gray-300 italic leading-relaxed">
                "Companies are facing agents. A growing public. Here's what CEOs can do to move past them and position their companies for sustained growth."
              </p>
            </div>
          </div>

          {/* Article Body */}
          <article className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'
            }`}>
            {/* First Paragraph with Drop Cap */}
            <p className="text-lg leading-relaxed mb-6 text-gray-300">
              <span className="text-7xl float-left mr-4 mt-1 text-purple-500 font-serif leading-none">E</span>
              ducators are tired of young hockey great Wayne Gretzky, who is famous for staying "I skate to where I think the puck is going," not where it has been." There could be better advice with one twist. But that route is only a piece of hockey and player mentality, and CEOs can learn at least three things about facing down uncertainty and managing their way into a better place from his celebrated approach.
            </p>

            {/* Content Sections */}
            {insight.content.sections.map((section, index) => (
              <div key={index} className="mb-8">
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 mt-10">
                    {section.heading}
                  </h2>
                )}
                <p className="text-lg leading-relaxed text-gray-300">
                  {section.body}
                </p>
              </div>
            ))}

            <p className="text-lg leading-relaxed mb-6 text-gray-300">
              Though it may seem hard for CTOs and their senior managers to see the road ahead, they can still manage to make hard choices about making the right long-run decisions. The secret? Use all sorts and smart and unconstrained thought. As agent's and their significant change, big choices means much more ambitious goals and we'd also expect a massive increase back from more tremendous efforts.
            </p>

            <p className="text-lg leading-relaxed mb-8 text-gray-300">
              And CIOs changes life, even as leadership quote for their CEO's software systems built with the ability they have, leaving them better equipped. As we'd seen in numerous deals now industry wide - and companies are not just how the general public sees abilities. "We brand reputations being at an impasse", a CEO told us. "We've been skeptical but now our choice is an opportunity to build a brand by being a leader." This was his response.
            </p>

            {/* Divider */}
            <div className="border-t-2 border-gray-800 my-12"></div>





            {/* About the Author Section */}
            <div className="bg-gray-900 rounded-lg p-6 sm:p-8 lg:p-10 my-12 border border-gray-800">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
                ABOUT THE AUTHOR(S)
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4 text-base sm:text-lg">
                {insight.author.bio}
              </p>
              <p className="text-gray-300 leading-relaxed text-base sm:text-lg">
                Magna rhofus consectetur ar ausent illas. Rhofus erat quisque ut pellentesque nec niitra mafus. Diam turpis nunc vel turpis lectus mattis. Magna rhofus consectetrut ar ausent illas. Rhofus erat quisque ut pellentesque nec niitra mafus. Diam turpis nunc vel turpis lectus mattis. A tortor tinci consectetrer hendreerit accumsan. Placeret pulvinar ultrices at urna elits. Magna et gravida porttitor quis ullamcorper hendreerit aaccumsan. Placeret pulvinar ortra prestre.
              </p>
            </div>

            {/* Editor Note */}
            <p className="text-sm text-gray-500 italic mt-8 border-t border-gray-800 pt-6">
              {insight.content.authorNote}
            </p>
          </article>

          {/* Related Insights Section */}
          <div className={`mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
              Related Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {insightsData.insights
                .filter(i => i.id !== insight.id)
                .slice(0, 2)
                .map((relatedInsight) => (
                  <Link
                    key={relatedInsight.id}
                    to={`/insights/${relatedInsight.id}`}
                  >
                    <div className="group bg-gray-900 rounded-lg p-6 hover:bg-gray-800 hover:border-purple-500 transition-all duration-300 border border-gray-800">
                      <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">
                        {relatedInsight.category}
                      </span>
                      <h4 className="text-xl font-bold text-white mt-3 mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                        {relatedInsight.title}
                      </h4>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                        {relatedInsight.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{relatedInsight.date}</span>
                        <span>•</span>
                        <span>{relatedInsight.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
        <div className={`max-w-4xl mx-auto text-center transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Want to learn more about our insights?
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Stop losing time and money to manual workflows. Contact Delacruz Innovations today to schedule a discovery session and explore how we can help your business automate processes, increase efficiency, and scale for growth.
          </p>
          <CalendlyPopup
            text="Book A Free Discovery Call"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105"
          />
        </div>
      </div>

      {/* Share Modal Popup */}
      {showShareMenu && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowShareMenu(false)}
        >
          <div
            className="bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-scale-in border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Share this insight</h3>
                <button
                  onClick={() => setShowShareMenu(false)}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-1">Share "{insight.title}" with your network</p>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-4">
              {/* Social Share Buttons */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={handleTwitterShare}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-gray-800"
                >
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Twitter className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Twitter</span>
                </button>

                <button
                  onClick={handleLinkedInShare}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-gray-800"
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">LinkedIn</span>
                </button>

                <button
                  onClick={handleFacebookShare}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-gray-800 transition-all duration-300 group border border-gray-800"
                >
                  <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <Facebook className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Facebook</span>
                </button>
              </div>

              {/* Copy Link Section */}
              <div className="bg-black rounded-xl p-4 border border-gray-800">
                <label className="text-sm font-medium text-gray-300 block mb-2">
                  Or copy link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={currentUrl}
                    readOnly
                    className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${copied
                      ? 'bg-green-600 text-white'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4" />
                        <span className="hidden sm:inline">Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-black rounded-b-2xl border-t border-gray-800">
              <button
                onClick={() => setShowShareMenu(false)}
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 font-medium hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default InsightDetailPage;