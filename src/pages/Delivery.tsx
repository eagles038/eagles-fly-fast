import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Truck, Clock, MapPin, CreditCard, Gift, CheckCircle } from 'lucide-react';

const deliveryZones = [
  {
    zone: 'Зона 1',
    radius: 'до 3 км',
    time: '30-45 мин',
    price: 'Бесплатно',
    minOrder: 'от 500₽',
    color: 'bg-green-500',
  },
  {
    zone: 'Зона 2',
    radius: '3-7 км',
    time: '45-60 мин',
    price: '150₽',
    minOrder: 'от 800₽',
    color: 'bg-yellow-500',
  },
  {
    zone: 'Зона 3',
    radius: '7-15 км',
    time: '60-90 мин',
    price: '300₽',
    minOrder: 'от 1500₽',
    color: 'bg-orange-500',
  },
];

const paymentMethods = [
  'Наличными курьеру',
  'Банковской картой курьеру',
  'Онлайн-оплата на сайте',
  'Apple Pay / Google Pay',
  'СБП (Система быстрых платежей)',
];

const benefits = [
  {
    icon: Clock,
    title: 'Быстрая доставка',
    description: 'Среднее время доставки — 45 минут',
  },
  {
    icon: Truck,
    title: 'Термосумки',
    description: 'Еда приедет горячей благодаря специальным сумкам',
  },
  {
    icon: Gift,
    title: 'Бонусы',
    description: 'Накапливайте баллы с каждого заказа',
  },
  {
    icon: CheckCircle,
    title: 'Гарантия качества',
    description: 'Вернём деньги, если что-то не так',
  },
];

export default function Delivery() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />
      
      <main className="pt-32 md:pt-40 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Доставка
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Доставляем вкусную еду по всей Москве — быстро, аккуратно и с заботой
            </p>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="p-6 bg-card rounded-2xl shadow-food text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Delivery Zones */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                Зоны доставки
              </h2>
              <div className="space-y-4">
                {deliveryZones.map((zone) => (
                  <div
                    key={zone.zone}
                    className="p-4 bg-card rounded-2xl shadow-food"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-4 h-4 rounded-full ${zone.color}`} />
                      <h3 className="font-semibold">{zone.zone}</h3>
                      <span className="text-muted-foreground text-sm">({zone.radius})</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Время</p>
                        <p className="font-medium">{zone.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Стоимость</p>
                        <p className="font-medium text-primary">{zone.price}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Мин. заказ</p>
                        <p className="font-medium">{zone.minOrder}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-primary" />
                Способы оплаты
              </h2>
              <div className="p-6 bg-card rounded-2xl shadow-food">
                <ul className="space-y-3">
                  {paymentMethods.map((method) => (
                    <li key={method} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span>{method}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Working Hours */}
              <div className="mt-6 p-6 bg-card rounded-2xl shadow-food">
                <h3 className="font-semibold mb-4 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  Время работы доставки
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Понедельник — Пятница</span>
                    <span className="font-medium">10:00 — 23:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Суббота — Воскресенье</span>
                    <span className="font-medium">11:00 — 00:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Important Info */}
          <div className="p-6 bg-primary/10 rounded-2xl">
            <h3 className="font-semibold text-lg mb-3">Важная информация</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Минимальная сумма заказа зависит от зоны доставки</li>
              <li>• При заказе от 2000₽ доставка бесплатная в любую зону</li>
              <li>• Время доставки может увеличиться в часы пик и плохую погоду</li>
              <li>• Курьер свяжется с вами за 5-10 минут до приезда</li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
