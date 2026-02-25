import { useState, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { MobileCartButton } from '@/components/MobileCartButton';
import { CookieConsent } from '@/components/CookieConsent';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { SEO } from '@/components/SEO';
import { SITE_CONFIG } from '@/lib/seo';
import { getCategoryById } from '@/lib/menuData';

const seoTexts: Record<string, { title: string; paragraphs: string[] }> = {
  pizza: {
    title: 'Доставка пиццы в Москве — Eagles Food',
    paragraphs: [
      'Eagles Food — это настоящая итальянская пицца с доставкой по Москве за 30 минут. Мы готовим каждую пиццу из свежих ингредиентов: натуральная моцарелла, ароматный томатный соус и хрустящее тонкое тесто, которое выпекается в специальной печи при высокой температуре.',
      'В нашем меню вы найдёте классические рецепты — Пепперони, Маргарита, 4 сыра — и авторские новинки, такие как BBQ Курица с фирменным соусом. Выбирайте удобный размер: от компактных 25 см для перекуса до большой 40 см для всей компании.',
      'Закажите пиццу онлайн с бесплатной доставкой от 1000 ₽. Мы также предлагаем свежие <a href="/rolls">роллы</a>, сочные <a href="/burgers">бургеры</a> и освежающие <a href="/drinks">напитки</a> — соберите идеальный заказ для вечера с друзьями!',
    ],
  },
  rolls: {
    title: 'Свежие роллы с доставкой — Eagles Food',
    paragraphs: [
      'Попробуйте лучшие роллы в Москве от Eagles Food! Наши суши-мастера готовят роллы из отборной рыбы и свежайших морепродуктов. Филадельфия с нежным лососем, хрустящая Калифорния с крабом и авокадо, изысканный Дракон с копчёным угрём — каждый ролл создан для истинных ценителей японской кухни.',
      'Мы используем только премиальные ингредиенты: японский рис специального сорта, сливочный сыр высшего качества и свежие нори. Выбирайте порцию от 6 до 12 штук — для лёгкого обеда или щедрого ужина на двоих.',
      'Доставка роллов по Москве — от 30 минут. Дополните заказ ароматной <a href="/pizza">пиццей</a>, фирменными <a href="/burgers">бургерами</a> или прохладными <a href="/drinks">напитками</a>. Бесплатная доставка при заказе от 1000 ₽!',
    ],
  },
  burgers: {
    title: 'Сочные бургеры с доставкой — Eagles Food',
    paragraphs: [
      'Бургеры Eagles Food — это сочные котлеты из отборной говядины, хрустящие овощи и фирменные соусы в мягкой булочке бриошь. Каждый бургер готовится на гриле по индивидуальному заказу, чтобы вы получили идеальное сочетание вкусов.',
      'Классический бургер с двойной котлетой и чеддером, острый с халапеньо и беконом, нежный Чикен с хрустящей куриной грудкой — у нас есть бургер для каждого. А для настоящих гурманов — Двойной бургер с двойной порцией мяса и сыра.',
      'Заказывайте бургеры с доставкой за 30 минут по Москве! Не забудьте добавить <a href="/drinks">напитки</a> к заказу. Попробуйте также нашу <a href="/pizza">пиццу</a> и японские <a href="/rolls">роллы</a> — бесплатная доставка от 1000 ₽.',
    ],
  },
  drinks: {
    title: 'Напитки с доставкой — Eagles Food',
    paragraphs: [
      'Дополните свой заказ освежающими напитками от Eagles Food! Классическая Кола, свежевыжатый апельсиновый сок, домашний лимонад с мятой и льдом или нежный ванильный молочный коктейль со взбитыми сливками — у нас есть напиток для любого настроения.',
      'Все наши напитки идеально сочетаются с основными блюдами: прохладный лимонад к острой <a href="/pizza">пицце</a>, сок к свежим <a href="/rolls">роллам</a>, а молочный коктейль — к сочным <a href="/burgers">бургерам</a>.',
      'Закажите напитки вместе с едой — доставка за 30 минут по Москве. При заказе от 1000 ₽ доставка бесплатная!',
    ],
  },
};

const categoryMeta: Record<string, { title: string; description: string }> = {
  pizza: {
    title: 'Пицца с доставкой за 30 минут — Eagles Food',
    description: 'Закажите ароматную пиццу на тонком тесте с натуральными ингредиентами. Пепперони, Маргарита, 4 сыра и другие. Доставка по Москве за 30 минут!',
  },
  rolls: {
    title: 'Роллы и суши с доставкой — Eagles Food',
    description: 'Свежие роллы из отборной рыбы и морепродуктов: Филадельфия, Калифорния, Дракон, Унаги. Доставка по Москве за 30 минут!',
  },
  burgers: {
    title: 'Бургеры с доставкой — Eagles Food',
    description: 'Сочные бургеры из отборной говядины с фирменными соусами. Классический, Острый, Чикен, Двойной. Доставка за 30 минут!',
  },
  drinks: {
    title: 'Напитки с доставкой — Eagles Food',
    description: 'Освежающие напитки к вашему заказу: Кола, свежевыжатый сок, лимонад, молочный коктейль. Доставка по Москве!',
  },
};

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const category = categoryId ? getCategoryById(categoryId) : undefined;

  if (!category) {
    return <Navigate to="/" replace />;
  }

  const meta = categoryMeta[category.id];
  const seo = seoTexts[category.id];

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const filteredItems = selectedFilters.length === 0
    ? category.items
    : category.items.filter((item) =>
        selectedFilters.some((filter) => item.filterTags?.includes(filter))
      );

  const breadcrumbs = [
    { name: 'Главная', url: '/' },
    { name: category.title, url: `/${category.id}` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={meta.title}
        description={meta.description}
        url={`${SITE_CONFIG.url}/${category.id}`}
        breadcrumbs={breadcrumbs}
      />
      <Header />

      <main className="pt-20 md:pt-28">
        {/* Hero / Breadcrumb */}
        <section className="bg-secondary/40 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">Главная</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">{category.title}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{category.title}</h1>
            <p className="text-muted-foreground text-lg">{category.description}</p>
          </div>
        </section>

        {/* Products */}
        <section className="py-10 md:py-14">
          <div className="container mx-auto px-4">
            {category.filters && (
              <CategoryFilter
                filters={category.filters}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            )}

            {filteredItems.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                {filteredItems.map((item, index) => (
                  <ProductCard key={item.id} {...item} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Нет товаров по выбранным фильтрам</p>
                <button
                  onClick={() => setSelectedFilters([])}
                  className="mt-4 text-primary hover:underline font-medium"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SEO Text */}
        {seo && (
          <section className="py-10 md:py-14 bg-secondary/20">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">{seo.title}</h2>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                {seo.paragraphs.map((p, i) => (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <CartSidebar />
      <MobileCartButton />
      <CookieConsent />
    </div>
  );
}
