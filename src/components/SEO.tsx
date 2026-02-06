import { Helmet } from 'react-helmet-async';
import { 
  SITE_CONFIG, 
  SEOProps, 
  getRestaurantSchema, 
  getWebSiteSchema, 
  getOrganizationSchema,
  getBreadcrumbSchema,
} from '@/lib/seo';

interface SEOComponentProps extends SEOProps {
  schemas?: object[];
  breadcrumbs?: Array<{ name: string; url: string }>;
  canonical?: string;
}

export function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  noIndex = false,
  schemas = [],
  breadcrumbs,
  canonical,
}: SEOComponentProps) {
  const siteTitle = title || SITE_CONFIG.name;
  const siteDescription = description || SITE_CONFIG.description;
  const siteImage = image || `${SITE_CONFIG.url}/favicon.png`;
  const siteUrl = url || SITE_CONFIG.url;
  const canonicalUrl = canonical || siteUrl;

  // Base schemas for all pages
  const baseSchemas = [
    getWebSiteSchema(),
    getOrganizationSchema(),
  ];

  // Add breadcrumb schema if provided
  const allSchemas = [
    ...baseSchemas,
    ...schemas,
    ...(breadcrumbs ? [getBreadcrumbSchema(breadcrumbs)] : []),
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDescription} />
      <meta name="author" content={SITE_CONFIG.name} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={siteImage} />
      <meta property="og:site_name" content={SITE_CONFIG.name} />
      <meta property="og:locale" content="ru_RU" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={siteImage} />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#FF6B00" />
      <meta name="msapplication-TileColor" content="#FF6B00" />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="RU-MOW" />
      <meta name="geo.placename" content="Москва" />
      <meta name="geo.position" content={`${SITE_CONFIG.geo.latitude};${SITE_CONFIG.geo.longitude}`} />
      <meta name="ICBM" content={`${SITE_CONFIG.geo.latitude}, ${SITE_CONFIG.geo.longitude}`} />

      {/* JSON-LD Structured Data */}
      {allSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Helmet>
  );
}

// Home page SEO with Restaurant schema
export function HomeSEO() {
  const schemas = [getRestaurantSchema()];

  return (
    <SEO
      title="Eagles Food — Доставка пиццы и бургеров за 30 минут"
      description="Вкуснейшая пицца, сочные бургеры и свежие роллы с бесплатной доставкой за 30 минут. Более 10 000 довольных клиентов! Заказывайте онлайн."
      schemas={schemas}
      url={SITE_CONFIG.url}
    />
  );
}

// Contacts page SEO
export function ContactsSEO() {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Контакты', url: '/contacts' },
  ];

  return (
    <SEO
      title="Контакты — Eagles Food | Телефон, адрес, время работы"
      description="Свяжитесь с Eagles Food: телефон 8 800 123-45-67, адрес г. Москва, ул. Ленина 25. Работаем ежедневно с 10:00 до 23:00."
      url={`${SITE_CONFIG.url}/contacts`}
      breadcrumbs={breadcrumbs}
    />
  );
}

// Delivery page SEO  
export function DeliverySEO() {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Доставка', url: '/delivery' },
  ];

  return (
    <SEO
      title="Доставка и оплата — Eagles Food | Бесплатно от 1000₽"
      description="Бесплатная доставка пиццы и бургеров от 1000₽. Доставляем за 30 минут по Москве. Оплата наличными, картой, онлайн."
      url={`${SITE_CONFIG.url}/delivery`}
      breadcrumbs={breadcrumbs}
    />
  );
}

// Checkout page SEO
export function CheckoutSEO() {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Оформление заказа', url: '/checkout' },
  ];

  return (
    <SEO
      title="Оформление заказа — Eagles Food"
      description="Оформите заказ на доставку пиццы и бургеров от Eagles Food. Быстрая доставка за 30 минут по Москве."
      url={`${SITE_CONFIG.url}/checkout`}
      breadcrumbs={breadcrumbs}
      noIndex={true}
    />
  );
}

// Privacy page SEO
export function PrivacySEO() {
  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: 'Политика конфиденциальности', url: '/privacy' },
  ];

  return (
    <SEO
      title="Политика конфиденциальности — Eagles Food"
      description="Политика обработки персональных данных Eagles Food. Защита личной информации клиентов."
      url={`${SITE_CONFIG.url}/privacy`}
      breadcrumbs={breadcrumbs}
    />
  );
}
