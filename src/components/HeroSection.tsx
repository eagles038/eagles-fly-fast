import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from '@/components/ui/carousel';
import heroImage from '@/assets/hero-food.jpg';
import pizzaImage from '@/assets/pizza-pepperoni.jpg';
import burgerImage from '@/assets/burger-classic.jpg';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState, useEffect, useCallback } from 'react';

const slides = [
  {
    image: heroImage,
    title: 'Вкуснейшая пицца и сочные бургеры с доставкой за',
    highlight: '30 минут',
    subtitle: 'Готовим из свежих ингредиентов сразу после вашего заказа',
    buttonText: 'Выбрать еду',
    buttonLink: '#menu',
  },
  {
    image: pizzaImage,
    title: 'Пицца на любой вкус — от классики до',
    highlight: 'авторских рецептов',
    subtitle: 'Тонкое тесто, натуральный сыр и секретный соус',
    buttonText: 'Смотреть пиццы',
    buttonLink: '#menu',
  },
  {
    image: burgerImage,
    title: 'Сочные бургеры с',
    highlight: 'премиальной говядиной',
    subtitle: 'Свежие булочки, фирменные соусы и хрустящий бекон',
    buttonText: 'Выбрать бургер',
    buttonLink: '#menu',
  },
];

export function HeroSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  return (
    <section className="relative min-h-screen pt-20">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full h-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative min-h-screen flex items-center">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundImage: `url(${slide.image})`,
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
                      {slide.title}{' '}
                      <span className="text-primary">{slide.highlight}</span>
                    </h1>
                    
                    <p className="text-lg md:text-xl text-background/80 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      <Button
                        asChild
                        size="lg"
                        className="btn-primary text-lg px-8 py-6 rounded-xl"
                      >
                        <a href={slide.buttonLink}>{slide.buttonText}</a>
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation arrows */}
        <CarouselPrevious className="left-4 md:left-8 h-12 w-12 bg-background/20 border-background/30 text-background hover:bg-background hover:text-foreground" />
        <CarouselNext className="right-4 md:right-8 h-12 w-12 bg-background/20 border-background/30 text-background hover:bg-background hover:text-foreground" />
        
        {/* Dots indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === current 
                  ? 'bg-primary w-8' 
                  : 'bg-background/40 hover:bg-background/60'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
}
