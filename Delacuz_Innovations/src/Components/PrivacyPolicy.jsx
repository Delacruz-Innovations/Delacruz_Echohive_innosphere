import React from 'react';
import { Link } from 'react-router-dom';
import SEO, { SITE_URL } from '../utils/SEO';

const EFFECTIVE_DATE = 'July 14, 2026';

const ORG = {
  name: 'Delacruz Innovations (RC 8432281)',
  email: 'info@delacruzinnovations.com',
  phone: '+234-905-276-5358',
  address: '5th Floor, Mosesola House, 103 Allen Ave, Allen, Ikeja 101233, Lagos',
};

const sections = [
  {
    id: 'who-we-are',
    title: 'Who We Are',
    body: [
      'Delacruz Innovations is a Business Performance Engineering™ company providing advisory, consulting, transformation, governance, operational excellence, artificial intelligence, data, business analysis and enterprise technology services to organisations across Nigeria, Africa and international markets.',
    ],
    contact: true,
  },
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    body: ['Depending on how you interact with us, we may collect:'],
    groups: [
      { heading: 'Identity Information', items: ['Name', 'Job title', 'Employer', 'Business email address', 'Telephone number'] },
      { heading: 'Business Information', items: ['Organisation', 'Industry', 'Business requirements', 'Project details', 'Executive Performance Assessment responses'] },
      { heading: 'Technical Information', items: ['Browser type', 'Device information', 'IP address', 'Operating system', 'Session information', 'Website usage', 'Referral source'] },
      { heading: 'Marketing Information', items: ['Newsletter subscriptions', 'Download history', 'Webinar registrations', 'Communication preferences'] },
    ],
  },
  {
    id: 'how-we-collect-information',
    title: 'How We Collect Information',
    body: ['Information may be collected when you:'],
    list: ['Contact us', 'Submit a website enquiry', 'Request a proposal', 'Download resources', 'Subscribe to updates', 'Complete an assessment', 'Register for an event', 'Apply for employment', 'Browse our website'],
    footer: 'Some information is collected automatically through cookies and analytics technologies.',
  },
  {
    id: 'why-we-process-personal-information',
    title: 'Why We Process Personal Information',
    body: ['We process personal information to:'],
    list: ['Respond to enquiries', 'Deliver professional services', 'Conduct Executive Performance Assessments', 'Improve website performance', 'Send requested resources', 'Deliver newsletters where consent has been provided', 'Manage events', 'Improve customer experience', 'Meet legal obligations', 'Protect website security', 'Prevent fraud'],
  },
  {
    id: 'legal-basis',
    title: 'Legal Basis',
    body: ['Where applicable, we process information based upon:'],
    list: ['Consent', 'Contractual necessity', 'Legitimate interests', 'Legal obligations'],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    body: ['Our website uses cookies to:'],
    list: ['Improve website functionality', 'Remember user preferences', 'Understand website performance', 'Analyse visitor behaviour', 'Improve security'],
    footer: 'Users can manage cookie preferences through browser settings or our Cookie Preferences tool where available.',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    body: ['We may use analytics technologies to understand:'],
    list: ['Visitor journeys', 'Popular content', 'Traffic sources', 'Website performance', 'User engagement'],
    footer: 'Analytics information is aggregated where possible and used to improve our services.',
  },
  {
    id: 'marketing-communications',
    title: 'Marketing Communications',
    body: ['Where consent has been provided, we may send:'],
    list: ['Executive insights', 'Business Performance Engineering™ research', 'Industry updates', 'Event invitations', 'Product announcements', 'Service updates'],
    footer: 'You may unsubscribe at any time using the unsubscribe link or by contacting us directly.',
  },
  {
    id: 'sharing-information',
    title: 'Sharing Information',
    body: ['We do not sell personal information.', 'Information may be shared with carefully selected service providers supporting:'],
    list: ['Website hosting', 'Email delivery', 'Customer relationship management', 'Analytics', 'Event management', 'Professional advisers', 'Regulatory authorities where required by law'],
  },
  {
    id: 'international-transfers',
    title: 'International Transfers',
    body: ['Where personal information is transferred internationally, we implement appropriate safeguards to protect personal information in accordance with applicable laws.'],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    body: [
      'We maintain administrative, organisational and technical safeguards designed to protect personal information against unauthorised access, alteration, disclosure or destruction.',
      'Although we strive to protect all information, no internet transmission can be guaranteed to be completely secure.',
    ],
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    body: ['Personal information is retained only for as long as necessary to:'],
    list: ['Deliver requested services', 'Meet legal obligations', 'Resolve disputes', 'Protect legitimate interests', 'Improve customer service'],
    footer: 'When no longer required, information is securely deleted or anonymised.',
  },
  {
    id: 'your-rights',
    title: 'Your Rights',
    body: ['Subject to applicable law, individuals may have the right to:'],
    list: ['Request access', 'Request correction', 'Request deletion', 'Restrict processing', 'Object to processing', 'Withdraw consent', 'Request portability where applicable', 'Submit a complaint to the relevant supervisory authority'],
    footer: 'Requests may be submitted using the contact details above.',
  },
  {
    id: 'artificial-intelligence',
    title: 'Artificial Intelligence',
    body: [
      'Delacruz Innovations may use artificial intelligence to support research, business analysis, operational improvement and professional advisory services.',
      'Where AI-assisted tools are used, we implement appropriate governance measures designed to protect confidentiality, maintain data integrity and support responsible use in line with our Business Performance Engineering™ principles.',
    ],
  },
  {
    id: 'third-party-websites',
    title: 'Third-Party Websites',
    body: [
      'Our website may contain links to external websites.',
      'We are not responsible for their privacy practices and encourage users to review their privacy policies before providing personal information.',
    ],
  },
  {
    id: 'changes-to-this-privacy-policy',
    title: 'Changes to This Privacy Policy',
    body: [
      'We may update this Privacy Policy periodically to reflect changes in legal requirements, technology, business operations or services.',
      'The latest version will always be published on this page together with the updated effective date.',
    ],
  },
];

const relatedLegalPages = [
  { label: 'Terms of Use', to: '/terms-of-use' },
  { label: 'Accessibility Statement', to: '/accessibility-statement' },
  { label: 'Business Performance Engineering™', to: '/business-performance-engineering' },
  { label: 'Solutions', to: '/services' },
  { label: 'Contact', to: '/contact' },
];

// `standalone` controls whether this renders its own SEO tags and full-height
// page wrapper (true, for the real /privacy-policy route) or just the content
// block, so it can be embedded inside another page (e.g. ProductsPage)
// without duplicating <SEO> or stacking two min-h-screen wrappers.
const PrivacyPolicy = ({ standalone = true }) => {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy',
    url: `${SITE_URL}/privacy-policy`,
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Delacruz Innovations',
    url: SITE_URL,
    email: ORG.email,
    telephone: ORG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5th Floor, Mosesola House, 103 Allen Ave, Allen',
      addressLocality: 'Ikeja, Lagos',
      postalCode: '101233',
      addressCountry: 'NG',
    },
  };

  const content = (
    <>
      {/* Hero */}
      <div className="border-b border-white/10 px-6 py-8 sm:py-10 md:text-center">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
          Legal &amp; Trust Centre
        </p>
        <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl">Privacy Policy</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
          Delacruz Innovations (“Delacruz Innovations”, “we”, “our”, or “us”) respects your
          privacy and is committed to protecting your personal information.
        </p>
        <div className="mx-auto mt-6 inline-flex flex-col gap-1 rounded-2xl border border-white/10 bg-gray-900/60 px-6 py-4 text-sm text-gray-400">
          <span><span className="font-semibold text-purple-300">Effective Date:</span> {EFFECTIVE_DATE}</span>
          <span><span className="font-semibold text-purple-300">Last Updated:</span> {EFFECTIVE_DATE}</span>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-6 lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">
        {/* Table of Contents */}
        <nav aria-label="Table of contents" className="mb-6 lg:mb-0">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
            On This Page
          </p>
          <ul className="space-y-2 border-l border-white/10 pl-4 text-sm">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-gray-400 transition-colors hover:text-purple-300"
                >
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#contact" className="text-gray-400 transition-colors hover:text-purple-300">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Policy Sections */}
        <div>
          <p className="mb-10 text-sm leading-relaxed text-gray-300 sm:text-base">
            This Privacy Policy explains how we collect, use, disclose, store and safeguard your
            information when you visit our website, request our services, complete an Executive
            Performance Assessment, subscribe to updates, download resources, participate in
            events or otherwise interact with us. By accessing or using our website, you
            acknowledge that you have read and understood this Privacy Policy.
          </p>

          <div className="space-y-14">
            {sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <h2 className="mb-4 text-2xl font-semibold text-purple-400">{section.title}</h2>

                {section.body.map((paragraph) => (
                  <p key={paragraph} className="mb-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                    {paragraph}
                  </p>
                ))}

                {section.groups && (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {section.groups.map((group) => (
                      <div key={group.heading}>
                        <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
                          {group.heading}
                        </h3>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-300">
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {section.list && (
                  <ul className="list-inside list-disc space-y-1 text-sm text-gray-300 sm:text-base">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}

                {section.footer && (
                  <p className="mt-4 text-sm leading-relaxed text-gray-400">{section.footer}</p>
                )}

                {section.contact && (
                  <div className="mt-4 space-y-1 rounded-2xl border border-white/10 bg-gray-900/60 p-4 text-sm text-gray-300">
                    <p><span className="font-semibold text-purple-300">Organisation:</span> {ORG.name}</p>
                    <p><span className="font-semibold text-purple-300">Email:</span> {ORG.email}</p>
                    <p><span className="font-semibold text-purple-300">Telephone:</span> {ORG.phone}</p>
                    <p><span className="font-semibold text-purple-300">Registered Address:</span> {ORG.address}</p>
                  </div>
                )}
              </section>
            ))}

            {/* Contact Card */}
            <section id="contact" className="scroll-mt-24">
              <h2 className="mb-4 text-2xl font-semibold text-purple-400">Contact</h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-300 sm:text-base">
                For privacy-related enquiries, please contact:
              </p>
              <div className="space-y-1 rounded-2xl border border-white/10 bg-gray-900/60 p-6 text-sm text-gray-300">
                <p className="mb-2 font-semibold text-white">Privacy Officer — Delacruz Innovations</p>
                <p>
                  <span className="font-semibold text-purple-300">Email:</span>{' '}
                  <a href={`mailto:${ORG.email}`} className="hover:text-purple-300">{ORG.email}</a>
                </p>
                <p><span className="font-semibold text-purple-300">Telephone:</span> {ORG.phone}</p>
                <p><span className="font-semibold text-purple-300">Address:</span> {ORG.address}</p>
              </div>
            </section>
          </div>

          <div className="mt-6 rounded-2xl border border-purple-700/40 bg-purple-900/10 p-6">
            <p className="text-sm leading-relaxed text-gray-300 md:text-center">
              By using our website and services, you acknowledge that you have read and understood
              this Privacy Policy and agree to its terms. If you do not agree with this Privacy
              Policy, please discontinue use of our services immediately.
            </p>
          </div>

          {/* Related Legal Pages */}
          <div className="mt-6 border-t border-white/10 pt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Related Pages
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedLegalPages.map((page) => (
                <Link
                  key={page.to}
                  to={page.to}
                  className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-gray-300 transition-colors duration-300 hover:border-purple-400/60 hover:text-white"
                >
                  {page.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  if (!standalone) return content;

  return (
    <div className="min-h-screen bg-black text-white">
      <SEO
        title="Privacy Policy | Delacruz Innovations"
        description="Learn how Delacruz Innovations collects, uses, stores and protects personal information when you use our website, services and digital platforms."
        canonical={`${SITE_URL}/privacy-policy`}
        jsonLd={[webPageSchema, organizationSchema]}
      />
      {content}
    </div>
  );
};

export default PrivacyPolicy;
