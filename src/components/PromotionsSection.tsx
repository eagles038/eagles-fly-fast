import { Button } from '@/components/ui/button';
import { Flame, Clock, Percent } from 'lucide-react';

export function PromotionsSection() {
  return (
    <section id="promotions" className="py-16 md:py-24 bg-cream scroll-mt-32 md:scroll-mt-36">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Акции и скидки</h2>
          <p className="text-muted-foreground text-lg">
            Специальные предложения для наших клиентов
          </p>
        </div>

        {/* Main Promo Banner */}
        <div className="promo-banner relative overflow-hidden mb-8">
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <Flame className="w-16 h-16 md:w-24 md:h-24 text-background/20" />
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-background/20 rounded-full px-4 py-2 mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Только по будням</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4">
              2+1 на все пепперони
            </h3>
            
            <p className="text-lg md:text-xl text-background/80 mb-6">
              Закажите две пиццы пепперони и получите третью бесплатно!
            </p>
            
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 rounded-xl px-8 font-bold"
            >
              <a href="#menu">Заказать со скидкой</a>
            </Button>
          </div>
        </div>

        {/* Secondary Promos */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-food flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Percent className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Скидка 15% на первый заказ</h4>
              <p className="text-muted-foreground">
                Используйте промокод FIRST15 при оформлении заказа
              </p>
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-food flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Flame className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Комбо дня</h4>
              <p className="text-muted-foreground">
                Пицца + бургер + напиток = 899₽ вместо 1097₽
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
