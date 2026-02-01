import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-food.jpg';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-32">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-background leading-tight mb-6 animate-fade-in">
            Вкуснейшая пицца и сочные бургеры с доставкой за{' '}
            <span className="text-primary">30 минут</span>
          </h1>
          
          <p className="text-lg md:text-xl text-background/80 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Готовим из свежих ингредиентов сразу после вашего заказа
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Button
              asChild
              size="lg"
              className="btn-primary text-lg px-8 py-6 rounded-xl"
            >
              <a href="#menu">Выбрать еду</a>
            </Button>
            
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-xl bg-background/10 border-background/30 text-background hover:bg-background hover:text-foreground"
            >
              <a href="#promotions">Смотреть акции</a>
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div>
              <div className="text-3xl font-bold text-primary">10 000+</div>
              <div className="text-background/70 text-sm">Довольных клиентов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">30 мин</div>
              <div className="text-background/70 text-sm">Среднее время доставки</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.9 ★</div>
              <div className="text-background/70 text-sm">Рейтинг на Яндекс</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
