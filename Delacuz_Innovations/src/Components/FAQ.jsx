import React from 'react'
import SEO from '../utils/SEO'

const faqItems = [
  {
    question: 'What industries do you serve?',
    answer:
      'We serve a wide range of sectors across Nigeria and internationally, including finance & banking, education & training, public sector (government agencies), SMEs, and technology platforms. Whether you’re a Lagos‑based SME or a national public body, we tailor our digital transformation and platform services to your environment.',
  },
  {
    question:
      'Are your solutions suitable for Nigerian business conditions (power, connectivity, regulation)?',
    answer:
      'Yes. Our solutions are engineered with the Nigerian context in mind — from hybrid cloud architectures and mobile‑first interfaces to compliance with Nigerian regulatory frameworks. We factor in local infrastructure, regulatory requirements and user‑behaviour so your systems are robust, relevant and ready for growth.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Each project is unique, but as a rule of thumb: a smaller scale CRM or workflow automation project may complete within 8‑12 weeks; a full‑scale SaaS/PaaS development or digital transformation initiative may span 4‑6+ months depending on scope. We always define milestones, deliverables and timelines during the project planning phase.',
  },
  {
    question:
      'How do you ensure user adoption and minimise disruption?',
    answer:
      'Adoption is at the heart of our methodology. We engage stakeholders from day one, provide tailored training and change‑management support, and ensure your people are empowered to use the new systems confidently. We also deliver migration artefacts, pilot phases and continuous support to minimise disruption to daily operations.',
  },
  {
    question: 'What kind of support do you provide after implementation?',
    answer:
      'Our relationship doesn’t end at “go‑live”. We provide ongoing support and maintenance packages, training refreshers, performance reviews and optimisation sprints to ensure your systems continue to deliver value well beyond the initial launch. We also monitor for system health, analytics and improvement opportunities.',
  },
  {
    question:
      'Are your services compliant with Nigerian data and privacy laws?',
    answer:
      'Absolutely. We ensure compliance with the Nigeria Data Protection Commission (NDPC) frameworks including the Nigeria Data Protection Act 2023 and relevant directives. We also support international compliance when working with global clients and cross‑border data flows.',
  },
  {
    question: 'What is the first step if we want to engage you?',
    answer:
      'Simply contact us for a free discovery call. We’ll review your current state, identify priority challenges, suggest an approach and quote the estimated scope. There’s no obligation — just real insight to help you decide your next step.',
  },
  {
    question: 'Can you work with organisations outside Lagos or Nigeria?',
    answer:
      'Yes. We design solutions for clients across Nigeria and internationally. Whether you’re operating in Abuja, Kaduna, London or New York, our cross‑border experience enables us to deliver effectively, collaborate virtually and accommodate multi‑region teams and stakeholders.',
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="FAQ | Delacruz Innovations"
        description="Answers to frequently asked questions about Delacruz Innovations' digital transformation, SaaS/PaaS development, and IT consulting services."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-purple-700 mb-12 text-center">
          Frequently Asked Questions
        </h1>

        {faqItems.map((item, index) => (
          <div key={index} className="mb-10 border-l-4 border-purple-700 pl-6 py-4">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">
              {item.question}
            </h2>
            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;