// SEO Configuration and Schema.org data for Eagles Food

export const SITE_CONFIG = {
  name: 'Eagles Food',
  url: 'https://eagles-fly-fast.lovable.app',
  description: 'Eagles Food — вкуснейшая пицца и сочные бургеры с доставкой за 30 минут. Готовим из свежих ингредиентов.',
  phone: '+78001234567',
  email: 'info@eaglesfood.ru',
  address: {
    street: 'ул. Ленина 25',
    city: 'Москва',
    country: 'RU',
    postalCode: '101000',
  },
  geo: {
    latitude: 55.755814,
    longitude: 37.617635,
  },
  openingHours: [
    { days: 'Mo-Fr', hours: '10:00-23:00' },
    { days: 'Sa-Su', hours: '11:00-00:00' },
  ],
  socialLinks: {
    telegram: 'https://t.me/eaglesfood',
    vk: 'https://vk.com/eaglesfood',
    instagram: 'https://instagram.com/eaglesfood',
  },
};

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
}

export function getPageSEO(page: string): SEOProps {
  const pages: Record<string, SEOProps> = {
    home: {
      title: 'Eagles Food — Доставка пиццы и бургеров за 30 минут',
      description: 'Вкуснейшая пицца, сочные бургеры и свежие роллы с бесплатной доставкой за 30 минут. Более 10 000 довольных клиентов!',
      type: 'website',
    },
    checkout: {
      title: 'Оформление заказа — Eagles Food',
      description: 'Оформите заказ на доставку пиццы и бургеров. Быстрая доставка за 30 минут по Москве.',
      type: 'website',
    },
    contacts: {
      title: 'Контакты — Eagles Food',
      description: 'Свяжитесь с нами: телефон 8 800 123-45-67, адрес г. Москва, ул. Ленина 25. Работаем ежедневно.',
      type: 'website',
    },
    delivery: {
      title: 'Доставка и оплата — Eagles Food',
      description: 'Бесплатная доставка от 1000₽. Зоны доставки по Москве. Оплата наличными, картой, онлайн.',
      type: 'website',
    },
    privacy: {
      title: 'Политика конфиденциальности — Eagles Food',
      description: 'Политика обработки персональных данных Eagles Food. Защита личной информации клиентов.',
      type: 'website',
    },
  };

  return pages[page] || pages.home;
}

// Restaurant Schema.org JSON-LD
export function getRestaurantSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${SITE_CONFIG.url}/#restaurant`,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
      postalCode: SITE_CONFIG.address.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: SITE_CONFIG.openingHours.map((item) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: item.days.split('-').map((d) => d.trim()),
      opens: item.hours.split('-')[0],
      closes: item.hours.split('-')[1],
    })),
    priceRange: '₽₽',
    servesCuisine: ['Пицца', 'Бургеры', 'Роллы', 'Японская кухня', 'Американская кухня'],
    hasMenu: `${SITE_CONFIG.url}/#menu`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '10000',
      bestRating: '5',
      worstRating: '1',
    },
    image: `${SITE_CONFIG.url}/favicon.png`,
    logo: `${SITE_CONFIG.url}/favicon.png`,
    currenciesAccepted: 'RUB',
    paymentAccepted: 'Наличные, Банковские карты',
    acceptsReservations: false,
  };
}

// Local Business Schema
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    '@id': `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/favicon.png`,
    telephone: SITE_CONFIG.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.street,
      addressLocality: SITE_CONFIG.address.city,
      addressCountry: SITE_CONFIG.address.country,
      postalCode: SITE_CONFIG.address.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: SITE_CONFIG.geo.latitude,
      longitude: SITE_CONFIG.geo.longitude,
    },
    openingHoursSpecification: SITE_CONFIG.openingHours.map((item) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: item.days.split('-').map((d) => d.trim()),
      opens: item.hours.split('-')[0],
      closes: item.hours.split('-')[1],
    })),
    priceRange: '₽₽',
  };
}

// WebSite Schema for search box
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_CONFIG.url}/#website`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/favicon.png`,
      },
    },
  };
}

// Organization Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/favicon.png`,
    sameAs: Object.values(SITE_CONFIG.socialLinks),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      availableLanguage: 'Russian',
    },
  };
}

// Product Schema for menu items
export interface ProductSchemaItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
}

export function getProductSchema(product: ProductSchemaItem) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_CONFIG.url}/#product-${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image.startsWith('http') ? product.image : `${SITE_CONFIG.url}${product.image}`,
    sku: product.id,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_CONFIG.url}/#${product.id}`,
      priceCurrency: 'RUB',
      price: product.price,
      availability: product.inStock !== false 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
      },
    },
  };
}

// FAQ Schema
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

// Menu Schema
export function getMenuSchema(menuItems: ProductSchemaItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_CONFIG.url}/#menu`,
    name: 'Меню Eagles Food',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Пицца',
        hasMenuItem: menuItems
          .filter((item) => item.category === 'pizza')
          .map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'RUB',
            },
          })),
      },
      {
        '@type': 'MenuSection',
        name: 'Бургеры',
        hasMenuItem: menuItems
          .filter((item) => item.category === 'burgers')
          .map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'RUB',
            },
          })),
      },
      {
        '@type': 'MenuSection',
        name: 'Роллы',
        hasMenuItem: menuItems
          .filter((item) => item.category === 'rolls')
          .map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            description: item.description,
            offers: {
              '@type': 'Offer',
              price: item.price,
              priceCurrency: 'RUB',
            },
          })),
      },
    ],
  };
}
