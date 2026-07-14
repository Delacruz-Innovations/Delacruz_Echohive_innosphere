import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

export const SITE_URL = 'https://delacruzinnovation.com';
export const SITE_NAME = 'Delacruz Innovations';
const BRAND_SUFFIX = ` | ${SITE_NAME}`;

const DEFAULT_DESCRIPTION =
  'Delacruz Innovations delivers digital transformation, SaaS/PaaS development, IT consulting, and brand management for businesses across Nigeria, the UAE, and beyond.';

// Shared Organization + WebSite schema injected on every page
const getBaseSchema = () => {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/logo.jpg`,
      sameAs: [
        'https://www.linkedin.com/company/delacruz-innovations/',
        'https://www.facebook.com/share/1Ex9gJwHCi/',
        'https://www.instagram.com/delacruzinnovations/',
        'https://x.com/Delacruz_Inno',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-905-276-5358',
        contactType: 'customer service',
        areaServed: ['NG', 'AE'],
        availableLanguage: ['English'],
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/insights?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ];
};

const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage,
  ogType = 'website',
  jsonLd,
  noindex = false,
}) => {
  const location = useLocation();
  const pathname = location.pathname;
  const pageUrl = canonical || `${SITE_URL}${pathname}`;
  const fullTitle = title ? `${title}${BRAND_SUFFIX}` : SITE_NAME;

  // Combine base schema with any page-specific schema objects
  const schemas = [...getBaseSchema()];
  if (jsonLd) {
    if (Array.isArray(jsonLd)) schemas.push(...jsonLd);
    else schemas.push(jsonLd);
  }

  const robotsContent = noindex ? 'noindex, follow' : 'index, follow';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={pageUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
};

export default SEO;
