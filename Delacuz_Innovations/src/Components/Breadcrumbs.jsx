import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '../utils/SEO';
import servicesData from '../ServicesData.json';

const LABELS = {
  about: 'About',
  services: 'Services',
  'case-studies': 'Case Studies',
  offices: 'Offices',
  insights: 'Insights',
  jobs: 'Careers',
  contact: 'Contact',
  faq: 'FAQ',
  consultation_form: 'Consultation',
  'terms-of-use': 'Terms of Use',
  'accessibility-statement': 'Accessibility',
  'privacy-policy': 'Privacy Policy',
};

const buildItems = (pathname) => {
  const segments = pathname.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: SITE_URL }];

  let accumulated = '';
  segments.forEach((segment, index) => {
    accumulated += `/${segment}`;
    const isLast = index === segments.length - 1;

    let name = LABELS[segment];

    // Resolve dynamic service detail route
    if (segments[0] === 'services' && index === 1) {
      const service = servicesData.services.find((s) => s.slug === segment);
      name = service ? service.title.replace(/\.$/, '') : 'Service';
    }

    // Resolve dynamic insight detail route
    if (segments[0] === 'insights' && index === 1) {
      name = 'Insight';
    }

    // Fallback humanization for unknown segments
    if (!name) {
      name = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }

    items.push({
      name,
      url: isLast ? null : `${SITE_URL}${accumulated}`,
    });
  });

  return items;
};

const Breadcrumbs = () => {
  const location = useLocation();
  const items = buildItems(location.pathname);

  // Don't render breadcrumbs on the homepage
  if (items.length <= 1) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default Breadcrumbs;
