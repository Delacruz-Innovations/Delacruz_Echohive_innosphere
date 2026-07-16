import React, { useState } from 'react';
import ComingSoonPage from '../Components/ComingSoonPage';
import Privacy from '../Components/PrivacyPolicy';
import FAQ from '../Components/FAQ';
import SEO from '../utils/SEO';

const tabs = [
  { id: 'faq', label: 'Frequently Asked Questions', Component: FAQ },
  { id: 'privacy', label: 'Privacy Policy', Component: Privacy },
];

const ProductsPage = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const ActiveComponent = tabs.find((tab) => tab.id === activeTab).Component;

  return (
    <>
      <SEO
        title="Products | Delacruz Innovations"
        description="Discover the digital products and platforms Delacruz Innovations builds and delivers. Content coming soon."
      />

      <ComingSoonPage
        eyebrow="Products"
        title="Product Content Coming Soon"
        description="We're building out a dedicated view of the digital products and platforms we design and deliver. In the meantime, speak with our team or explore our practice areas to see how we work."
      />

      <div className="min-h-screen bg-black text-white">
        <div className="mx-auto max-w-4xl px-6 pt-6">
          <div className="flex flex-wrap gap-3 border-b border-white/10 pb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                aria-current={activeTab === tab.id}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'border border-white/10 bg-white/5 text-gray-300 hover:border-purple-400/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <ActiveComponent standalone={false} />
      </div>
    </>
  );
};

export default ProductsPage;
