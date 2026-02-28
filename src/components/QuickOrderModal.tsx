import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { Phone, User, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickOrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  // Remove leading 7 or 8 if present
  const cleaned = digits.startsWith('7') ? digits.slice(1) : digits.startsWith('8') ? digits.slice(1) : digits;
  
  let result = '+7';
  if (cleaned.length > 0) result += ' (' + cleaned.slice(0, 3);
  if (cleaned.length >= 3) result += ') ';
  if (cleaned.length > 3) result += cleaned.slice(3, 6);
  if (cleaned.length > 6) result += '-' + cleaned.slice(6, 8);
  if (cleaned.length > 8) result += '-' + cleaned.slice(8, 10);
  
  return result;
}

function getPhoneDigits(formatted: string): string {
  return formatted.replace(/\D/g, '');
}

export function QuickOrderModal({ open, onOpenChange }: QuickOrderModalProps) {
  const [phone, setPhone] = useState('+7');
  const [name, setName] = useState('');
  const phoneRef = useRef<HTMLInputElement>(null);
  const { getTotalPrice, getTotalItems, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        phoneRef.current?.focus();
      }, 100);
    }
  }, [open]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const digits = raw.replace(/\D/g, '');
    if (digits.length <= 11) {
      setPhone(formatPhone(raw));
    }
  };

  const handleSubmit = () => {
    const digits = getPhoneDigits(phone);
    if (digits.length < 11) {
      toast.error('Введите корректный номер телефона');
      return;
    }
    if (!name.trim()) {
      toast.error('Введите ваше имя');
      return;
    }
    if (totalItems === 0) {
      toast.error('Корзина пуста');
      return;
    }

    toast.success('Заказ оформлен! Мы перезвоним вам в ближайшее время.');
    clearCart();
    onOpenChange(false);
    setPhone('+7');
    setName('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-0 gap-0 overflow-hidden">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
            Быстрый заказ
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6 space-y-4">
          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="quick-phone" className="flex items-center gap-2 text-sm font-medium">
              <Phone className="w-4 h-4 text-muted-foreground" />
              Номер телефона
            </Label>
            <Input
              ref={phoneRef}
              id="quick-phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7 (___) ___-__-__"
              className="rounded-xl h-12 text-base"
              type="tel"
            />
          </div>

          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="quick-name" className="flex items-center gap-2 text-sm font-medium">
              <User className="w-4 h-4 text-muted-foreground" />
              Ваше имя
            </Label>
            <Input
              id="quick-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Как вас зовут?"
              className="rounded-xl h-12 text-base"
            />
          </div>

          {/* Order total info */}
          <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
            <span className="text-muted-foreground">Сумма заказа:</span>
            <span className="text-xl font-bold text-primary">
              {totalPrice.toLocaleString('ru-RU')} ₽
            </span>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={totalItems === 0}
            className="w-full btn-primary py-6 text-lg rounded-2xl"
          >
            Оформить заказ
          </Button>

          {/* Privacy consent */}
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Нажимая «Оформить заказ», вы соглашаетесь с{' '}
            <Link to="/privacy" className="text-primary hover:underline" onClick={() => onOpenChange(false)}>
              политикой обработки персональных данных
            </Link>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
