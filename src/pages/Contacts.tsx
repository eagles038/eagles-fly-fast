import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { ContactsSEO } from '@/components/SEO';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Телефон',
    value: '8 800 123-45-67',
    description: 'Бесплатный звонок по России',
    href: 'tel:+78001234567',
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'info@eaglesfood.ru',
    description: 'Ответим в течение 24 часов',
    href: 'mailto:info@eaglesfood.ru',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+7 999 123-45-67',
    description: 'Быстрая связь через мессенджер',
    href: 'https://wa.me/79991234567',
  },
  {
    icon: MapPin,
    title: 'Адрес',
    value: 'г. Москва, ул. Ленина 25',
    description: 'Самовывоз и доставка',
    href: 'https://yandex.ru/maps/-/CDxMjM~Z',
  },
];

const workingHours = [
  { days: 'Понедельник — Пятница', hours: '10:00 — 23:00' },
  { days: 'Суббота — Воскресенье', hours: '11:00 — 00:00' },
];

export default function Contacts() {
  return (
    <div className="min-h-screen bg-background">
      <ContactsSEO />
      <Header />
      <CartSidebar />
      
      <main className="pt-32 md:pt-40 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Контакты
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Свяжитесь с нами любым удобным способом — мы всегда рады помочь!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Methods */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-6">Способы связи</h2>
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-4 bg-card rounded-2xl shadow-food hover:shadow-lg transition-shadow group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <method.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{method.title}</h3>
                    <p className="text-primary font-medium">{method.value}</p>
                    <p className="text-sm text-muted-foreground">{method.description}</p>
                  </div>
                </a>
              ))}

              {/* Working Hours */}
              <div className="p-4 bg-card rounded-2xl shadow-food mt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Время работы</h3>
                </div>
                <div className="space-y-2">
                  {workingHours.map((item) => (
                    <div key={item.days} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.days}</span>
                      <span className="font-medium">{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-[400px] lg:h-full min-h-[400px] rounded-2xl overflow-hidden shadow-food">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a&amp;source=constructor&amp;ll=37.617635%2C55.755814&amp;z=15&amp;pt=37.617635%2C55.755814%2Cpm2rdm"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта расположения Eagles Food"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
