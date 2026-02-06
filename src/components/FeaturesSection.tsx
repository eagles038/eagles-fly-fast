import { Truck, Leaf, Gift } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Быстрая доставка',
    description: 'Доставим ваш заказ в течение 30 минут или вернём деньги',
  },
  {
    icon: Leaf,
    title: 'Свежие продукты',
    description: 'Используем только качественные ингредиенты от проверенных поставщиков',
  },
  {
    icon: Gift,
    title: 'Подарки именинникам',
    description: 'Бесплатная пицца в день рождения при заказе от 1500₽',
  },
];

export function FeaturesSection() {
  return (
    <section aria-labelledby="features-heading" className="py-16 md:py-24 bg-cream">
      <h2 id="features-heading" className="sr-only">Наши преимущества</h2>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
