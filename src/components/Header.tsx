import { ShoppingCart, Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const navLinks = [
  { href: '#pizza', label: 'Пицца' },
  { href: '#rolls', label: 'Роллы' },
  { href: '#burgers', label: 'Бургеры' },
  { href: '#drinks', label: 'Напитки' },
];

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  const element = document.querySelector(href);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, getTotalItems } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar - Contact Info */}
      <div className="bg-foreground text-background">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-8 sm:h-10 text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span className="hidden sm:inline">г. Москва, ул. Ленина 25</span>
                <span className="sm:hidden truncate">Москва</span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                <div className="flex flex-col text-xs leading-tight">
                  <span>Пн-Пт: 10:00 — 23:00</span>
                  <span>Сб-Вс: 11:00 — 00:00</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-10">
              <div className="hidden lg:flex items-center gap-4">
                <a
                  href="#promotions"
                  onClick={(e) => handleSmoothScroll(e, '#promotions')}
                  className="hover:text-primary transition-colors"
                >
                  Акции
                </a>
                <a
                  href="#reviews"
                  onClick={(e) => handleSmoothScroll(e, '#reviews')}
                  className="hover:text-primary transition-colors"
                >
                  Отзывы
                </a>
                <a
                  href="/delivery"
                  className="hover:text-primary transition-colors"
                >
                  Доставка
                </a>
                <a
                  href="/contacts"
                  className="hover:text-primary transition-colors"
                >
                  Контакты
                </a>
              </div>
              <a 
                href="tel:+78001234567" 
                className="flex items-center gap-1 sm:gap-2 font-semibold hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span className="hidden xs:inline">8 800 123-45-67</span>
                <span className="xs:hidden">Позвонить</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between h-12 sm:h-16 md:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center">
              <img 
                src={logo} 
                alt="Eagles Food" 
                className="h-8 sm:h-12 md:h-16 w-auto"
              />
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className="nav-link text-sm uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Cart Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                onClick={openCart}
                className="rounded-lg sm:rounded-xl bg-primary hover:bg-orange-dark text-primary-foreground font-semibold px-2 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1 sm:gap-2 text-sm"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Корзина</span>
                {totalItems > 0 && (
                  <span className="bg-background text-foreground text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleSmoothScroll(e, link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="nav-link text-lg py-2"
                  >
                    {link.label}
                  </a>
                ))}
                {/* Mobile time info */}
                <div className="flex items-center gap-2 text-muted-foreground pt-4 border-t border-border">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Пн-Пт: 10:00 — 23:00 | Сб-Вс: 11:00 — 00:00</span>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
