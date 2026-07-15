import React from 'react'
import SEO from '../utils/SEO'
import HorizontalScrollRow from './HorizontalScrollRow'

const faqCategories = [
  {
    category: 'About Delacruz',
    items: [
      {
        question: 'What is Business Performance Engineering™?',
        answer:
          'Business Performance Engineering™ is Delacruz Innovations’ proprietary approach to improving organisational performance by aligning strategy, governance, people, processes, data and technology. Rather than implementing technology in isolation, we help organisations achieve measurable business outcomes through structured transformation.',
      },
      {
        question: 'How is Delacruz different from a traditional IT consulting company?',
        answer:
          'Traditional IT consultancies often focus on implementing technology. Delacruz begins with your business objectives. We assess organisational performance, identify constraints and design solutions that improve measurable outcomes using our Business Performance Engineering Framework™ (BPEF™).',
      },
      {
        question: 'Which countries do you serve?',
        answer:
          'We primarily support organisations across Nigeria and Africa while also partnering with international organisations delivering programmes within the region.',
      },
    ],
  },
  {
    category: 'Services',
    items: [
      {
        question: 'What industries do you work with?',
        answer:
          'We support organisations in financial services, government, healthcare, telecommunications, retail, manufacturing, construction, agriculture, education, hospitality and other sectors seeking sustainable business transformation.',
      },
      {
        question: 'Do you work with SMEs or only large enterprises?',
        answer:
          'We work with ambitious organisations of different sizes. Our methodologies scale from growing businesses to large enterprises and public sector institutions.',
      },
      {
        question: 'Can you support digital transformation without replacing our existing systems?',
        answer:
          'Yes. In many engagements, we improve performance by optimising existing processes, strengthening governance and integrating current technologies before recommending replacement.',
      },
      {
        question: 'Do you provide AI consulting?',
        answer:
          'Yes. We help organisations identify practical AI opportunities, assess readiness, establish governance and implement AI responsibly to improve business performance.',
      },
      {
        question: 'Do you offer Business Analysis as a standalone service?',
        answer:
          'Yes, but we generally recommend integrating Business Analysis within broader transformation initiatives to maximise value and reduce delivery risk.',
      },
      {
        question: 'Do you provide Governance, Risk and Compliance (GRC) services?',
        answer:
          'Yes. Our GRC services include governance frameworks, enterprise risk management, cybersecurity governance, regulatory compliance, internal controls and audit readiness.',
      },
    ],
  },
  {
    category: 'Delivery',
    items: [
      {
        question: 'How does an engagement begin?',
        answer:
          'Every engagement begins with an Executive Performance Assessment. This helps us understand your organisation’s strategic priorities, current challenges and opportunities before recommending solutions.',
      },
      {
        question: 'How long do consulting engagements typically last?',
        answer:
          'Timelines vary depending on scope. Strategic assessments may take a few weeks, while enterprise transformation programmes can span several months. Each engagement is tailored to the organisation’s objectives.',
      },
      {
        question: 'Do you provide implementation support or only advisory services?',
        answer:
          'We provide end-to-end support, from strategy and planning through implementation, change management, governance and continuous improvement.',
      },
    ],
  },
  {
    category: 'Technology',
    items: [
      {
        question: 'Which technologies do you work with?',
        answer:
          'Our advisory services are technology-agnostic. Depending on client needs, we support cloud platforms, enterprise applications, AI solutions, analytics, automation and modern integration technologies.',
      },
      {
        question: 'Do you build custom software?',
        answer:
          'Yes. Where appropriate, we design and deliver bespoke digital platforms, enterprise applications and SaaS solutions that align with business objectives.',
      },
    ],
  },
  {
    category: 'Commercial',
    items: [
      {
        question: 'How do I request a proposal?',
        answer:
          'The first step is to schedule an Executive Performance Assessment. Following the assessment, we prepare a tailored proposal aligned with your business priorities.',
      },
      {
        question: 'Do you provide managed services?',
        answer:
          'Yes. Following implementation, we can provide ongoing advisory, governance and optimisation support where required.',
      },
    ],
  },
];

const allFaqItems = faqCategories.flatMap((category) => category.items);

const FAQ = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="FAQ | Delacruz Innovations"
        description="Answers to frequently asked questions about Delacruz Innovations' Business Performance Engineering™ methodology, services, delivery approach and technology."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: allFaqItems.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }}
      />
      <div className="max-w-4xl mx-auto px-6 py-6">
        <h1 className="text-4xl font-bold text-purple-500 mb-6 md:text-center">
          Frequently Asked Questions
        </h1>

        {faqCategories.map((category) => (
          <div key={category.category} className="mb-6">
            <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              {category.category}
            </h2>

            <HorizontalScrollRow>
              <div className="contents">
                {category.items.map((item) => (
                  <div
                    key={item.question}
                    className="w-[85vw] shrink-0 snap-start rounded-2xl border-l-4 border-purple-700 bg-gray-900/40 p-6 sm:w-[420px]"
                  >
                    <h3 className="text-xl font-semibold text-purple-500 mb-4">
                      {item.question}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">{item.answer}</p>
                  </div>
                ))}
              </div>
            </HorizontalScrollRow>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
