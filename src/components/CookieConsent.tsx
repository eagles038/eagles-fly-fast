import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Небольшая задержка для плавного появления
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in">
      <div className="container mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-4 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="bg-primary/10 p-2 rounded-full flex-shrink-0">
              <Cookie className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm md:text-base text-foreground font-medium">
                Мы используем cookies 🍪
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
                Для улучшения работы сайта и персонализации контента мы используем файлы cookie. 
                Продолжая использовать сайт, вы соглашаетесь с{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  политикой конфиденциальности
                </a>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={declineCookies}
              className="text-muted-foreground hover:text-foreground"
            >
              Отклонить
            </Button>
            <Button
              onClick={acceptCookies}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
            >
              Принять
            </Button>
          </div>
          
          <button
            onClick={declineCookies}
            className="absolute top-2 right-2 sm:hidden p-1 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
