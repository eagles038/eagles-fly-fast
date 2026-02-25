import { ShoppingCart, Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';

const menuNavLinks = [
  { href: '/pizza', label: 'Пицца' },
  { href: '/rolls', label: 'Роллы' },
  { href: '/burgers', label: 'Бургеры' },
  { href: '/drinks', label: 'Напитки' },
];

const topBarLinks = [
  { href: '#promotions', label: 'Акции', isAnchor: true },
  { href: '#reviews', label: 'Отзывы', isAnchor: true },
  { href: '/delivery', label: 'Доставка', isAnchor: false },
  { href: '/contacts', label: 'Контакты', isAnchor: false },
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
                {topBarLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={link.isAnchor ? (e) => handleSmoothScroll(e, link.href) : undefined}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <a 
                href="tel:+78001234567" 
                className="flex items-center gap-1 sm:gap-2 font-semibold hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span className="hidden sm:inline">8 800 123-45-67</span>
                <span className="sm:hidden">Звонок</span>
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
            <Link to="/" className="flex items-center">
              <img 
                src={logo} 
                alt="Eagles Food" 
                className="h-8 sm:h-12 md:h-16 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuNavLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="nav-link text-sm uppercase tracking-wide"
                >
                  {link.label}
                </Link>
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
              <div className="flex flex-col gap-2">
                {/* Menu Categories */}
                <div className="pb-3 border-b border-border">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide mb-2 block">Меню</span>
                  {menuNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="nav-link text-base py-2 block"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                
                {/* Top bar links */}
                <div className="py-3 border-b border-border">
                  {topBarLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => {
                        if (link.isAnchor) {
                          handleSmoothScroll(e, link.href);
                        }
                        setMobileMenuOpen(false);
                      }}
                      className="nav-link text-base py-2 block"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* Contact info */}
                <div className="pt-2 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>г. Москва, ул. Ленина 25</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Пн-Пт: 10:00 — 23:00 | Сб-Вс: 11:00 — 00:00</span>
                  </div>
                  <a href="tel:+78001234567" className="flex items-center gap-2 text-foreground font-semibold">
                    <Phone className="w-4 h-4 text-primary" />
                    <span>8 800 123-45-67</span>
                  </a>
                </div>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
