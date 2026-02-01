import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import logo from '@/assets/logo.png';

export function Footer() {
  return (
    <footer id="contacts" className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <img 
                src={logo} 
                alt="Eagles Food" 
                className="h-14 w-auto"
              />
            </div>
            <p className="text-background/70 mb-6">
              Вкуснейшая пицца и сочные бургеры с доставкой за 30 минут
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16l-1.61 7.59c-.12.54-.44.67-.89.42l-2.46-1.81-1.19 1.14c-.13.13-.24.24-.5.24l.18-2.5 4.56-4.12c.2-.18-.04-.28-.31-.1l-5.64 3.55-2.43-.76c-.53-.17-.54-.53.11-.78l9.51-3.67c.44-.16.82.11.68.78z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="VK"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.587-1.496c.596-.19 1.362 1.26 2.174 1.82.614.422 1.08.33 1.08.33l2.172-.03s1.136-.07.598-.964c-.044-.073-.314-.66-1.618-1.866-1.366-1.263-1.183-1.058.462-3.242.998-1.328 1.398-2.14 1.273-2.487-.119-.333-.855-.245-.855-.245l-2.448.015s-.181-.025-.316.056c-.131.08-.216.267-.216.267s-.387 1.03-.903 1.906c-1.088 1.848-1.524 1.946-1.702 1.832-.414-.265-.31-1.066-.31-1.634 0-1.777.27-2.518-.525-2.71-.264-.063-.458-.105-1.133-.112-.866-.01-1.6.003-2.014.206-.276.135-.49.436-.36.453.16.022.523.098.715.36.248.338.239 1.097.239 1.097s.143 2.093-.332 2.353c-.327.18-.774-.186-1.735-1.858-.492-.856-.863-1.803-.863-1.803s-.072-.176-.2-.271c-.155-.115-.372-.151-.372-.151l-2.324.015s-.349.01-.477.161c-.114.135-.01.414-.01.414s1.825 4.267 3.892 6.416c1.895 1.97 4.044 1.841 4.044 1.841h.975z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Phone className="w-5 h-5 text-primary" />
                <a href="tel:+78001234567" className="hover:text-primary transition-colors">
                  8 (800) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Mail className="w-5 h-5 text-primary" />
                <a href="mailto:info@eaglesfood.ru" className="hover:text-primary transition-colors">
                  info@eaglesfood.ru
                </a>
              </li>
              <li className="flex items-start gap-3 text-background/70">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                <span>г. Москва, ул. Примерная, д. 123</span>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4">Время работы</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-background/70">
                <Clock className="w-5 h-5 text-primary" />
                <span>Пн-Чт: 10:00 - 23:00</span>
              </li>
              <li className="flex items-center gap-3 text-background/70">
                <Clock className="w-5 h-5 text-primary" />
                <span>Пт-Вс: 10:00 - 01:00</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Меню</h4>
            <ul className="space-y-3">
              <li>
                <a href="#menu" className="text-background/70 hover:text-primary transition-colors">
                  Пицца
                </a>
              </li>
              <li>
                <a href="#menu" className="text-background/70 hover:text-primary transition-colors">
                  Бургеры
                </a>
              </li>
              <li>
                <a href="#menu" className="text-background/70 hover:text-primary transition-colors">
                  Напитки
                </a>
              </li>
              <li>
                <a href="#promotions" className="text-background/70 hover:text-primary transition-colors">
                  Акции
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-background/50 text-sm">
          <p>© 2025 Eagles Food. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}
