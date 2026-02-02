import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Gift, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const promoCode = 'EXIT10';

  const handleMouseLeave = useCallback((e: MouseEvent) => {
    // Проверяем, что курсор уходит вверх (к панели браузера)
    if (e.clientY <= 0) {
      const hasSeenPopup = sessionStorage.getItem('exit-intent-shown');
      if (!hasSeenPopup) {
        setIsOpen(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
      }
    }
  }, []);

  useEffect(() => {
    // Добавляем небольшую задержку перед активацией
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseLeave]);

  const copyPromoCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    toast({
      title: 'Промокод скопирован!',
      description: `Используйте ${promoCode} при оформлении заказа`,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Уходите? 😢
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground pt-2">
            Подождите! Мы приготовили для вас специальное предложение
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="text-center">
            <p className="text-4xl font-black text-primary mb-2">-10%</p>
            <p className="text-lg font-medium">на первый заказ!</p>
          </div>

          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <p className="text-sm text-center text-muted-foreground">
              Ваш промокод:
            </p>
            <div className="flex items-center justify-center gap-2">
              <code className="bg-background border-2 border-dashed border-primary/30 rounded-lg px-4 py-2 text-xl font-mono font-bold tracking-wider">
                {promoCode}
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={copyPromoCode}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                copyPromoCode();
                setIsOpen(false);
              }}
              className="w-full font-bold"
              size="lg"
            >
              Забрать скидку
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground"
            >
              Нет, спасибо
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
