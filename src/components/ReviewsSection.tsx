import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Александр К.',
    avatar: 'А',
    rating: 5,
    text: 'Лучшая пицца в городе! Доставили за 25 минут, ещё горячая. Пепперони просто бомба! 🔥',
    date: '2 дня назад',
  },
  {
    id: 2,
    name: 'Мария С.',
    avatar: 'М',
    rating: 5,
    text: 'Заказывали на день рождения ребёнка. Подарили бесплатную пиццу! Дети в восторге, обязательно закажем ещё.',
    date: '1 неделю назад',
  },
  {
    id: 3,
    name: 'Дмитрий В.',
    avatar: 'Д',
    rating: 5,
    text: 'Острый бургер - это что-то невероятное. Идеальный баланс вкуса и остроты. Рекомендую!',
    date: '2 недели назад',
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Отзывы клиентов</h2>
          <p className="text-muted-foreground text-lg">
            Что говорят о нас наши любимые клиенты
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="bg-card rounded-2xl p-6 shadow-food animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                  {review.avatar}
                </div>
                <div>
                  <h4 className="font-semibold">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
