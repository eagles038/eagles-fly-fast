import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { 
  Truck, 
  Store, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Tag, 
  Check, 
  X, 
  ShoppingBag,
  Minus,
  Plus,
  Trash2,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  CreditCard,
  Banknote,
  Wallet,
  CalendarIcon
} from 'lucide-react';

import drinkCola from '@/assets/drink-cola.jpg';
import drinkMilkshake from '@/assets/drink-milkshake.jpg';
import drinkLemonade from '@/assets/drink-lemonade.jpg';

const sauces = [
  { id: 'sauce-hot', name: 'Острый', price: 49, emoji: '🌶️' },
  { id: 'sauce-garlic', name: 'Чесночный', price: 49, emoji: '🧄' },
  { id: 'sauce-ranch', name: 'Ранч', price: 49, emoji: '🥛' },
  { id: 'sauce-bbq', name: 'Барбекю', price: 49, emoji: '🍖' },
  { id: 'sauce-cheese', name: 'Сырный', price: 49, emoji: '🧀' },
];

const drinks = [
  { id: 'add-cola', name: 'Coca-Cola', price: 99, image: drinkCola },
  { id: 'add-milkshake', name: 'Милкшейк', price: 199, image: drinkMilkshake },
  { id: 'add-lemonade', name: 'Лимонад', price: 149, image: drinkLemonade },
];

const FREE_DELIVERY_THRESHOLD = 1500;
const DELIVERY_COST = 200;

const pickupPoints = [
  { 
    id: 'point-1', 
    name: 'ул. Ленина, 15', 
    address: 'г. Москва, ул. Ленина, д. 15',
    workHours: '10:00 - 23:00',
    metro: 'м. Площадь Революции'
  },
  { 
    id: 'point-2', 
    name: 'ул. Пушкина, 42', 
    address: 'г. Москва, ул. Пушкина, д. 42',
    workHours: '10:00 - 22:00',
    metro: 'м. Тверская'
  },
  { 
    id: 'point-3', 
    name: 'пр. Мира, 101', 
    address: 'г. Москва, пр. Мира, д. 101',
    workHours: '09:00 - 23:00',
    metro: 'м. ВДНХ'
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart, addItem } = useCartStore();
  
  // Form state
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [house, setHouse] = useState('');
  const [apartment, setApartment] = useState('');
  const [entrance, setEntrance] = useState('');
  const [floor, setFloor] = useState('');
  const [comment, setComment] = useState('');
  const [deliveryTime, setDeliveryTime] = useState<'asap' | 'scheduled'>('asap');
  const [scheduledDate, setScheduledDate] = useState<Date>();
  const [scheduledTime, setScheduledTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card_courier' | 'online'>('cash');
  const [selectedPickupPoint, setSelectedPickupPoint] = useState(pickupPoints[0].id);
  
  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  const validPromoCodes: Record<string, number> = {
    'СКИДКА10': 0.10,
    'СКИДКА20': 0.20,
    'ПЕРВЫЙ': 0.15,
  };

  const totalPrice = getTotalPrice();
  const discountAmount = appliedPromo ? Math.round(totalPrice * appliedPromo.discount) : 0;
  const subtotal = totalPrice - discountAmount;
  const deliveryCost = deliveryType === 'delivery' && subtotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_COST : 0;
  const finalPrice = subtotal + deliveryCost;
  const remainingForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const deliveryProgress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (validPromoCodes[code]) {
      setAppliedPromo({ code, discount: validPromoCodes[code] });
      setPromoError('');
      toast.success(`Промокод применён! Скидка ${validPromoCodes[code] * 100}%`);
    } else {
      setPromoError('Промокод не найден');
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
  };

  const handleAddSauce = (sauce: typeof sauces[0]) => {
    addItem({
      id: sauce.id,
      name: sauce.name,
      price: sauce.price,
      image: '/placeholder.svg',
    });
    toast.success(`${sauce.name} соус добавлен`);
  };

  const handleAddDrink = (drink: typeof drinks[0]) => {
    addItem({
      id: drink.id,
      name: drink.name,
      price: drink.price,
      image: drink.image,
    });
    toast.success(`${drink.name} добавлен`);
  };

  const handleSubmitOrder = () => {
    if (!name || !phone) {
      toast.error('Заполните имя и телефон');
      return;
    }
    if (deliveryType === 'delivery' && (!street || !house)) {
      toast.error('Заполните адрес доставки');
      return;
    }
    
    toast.success('Заказ успешно оформлен! Ожидайте звонка оператора.');
    clearCart();
    navigate('/');
  };

  const getUniqueId = (item: typeof items[0]) => {
    return item.size 
      ? `${item.id}-${item.size}` 
      : item.pieces 
      ? `${item.id}-${item.pieces}pcs` 
      : item.id;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-lg mx-auto text-center py-16">
              <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Корзина пуста</h1>
              <p className="text-muted-foreground mb-8">
                Добавьте что-нибудь вкусное из нашего меню
              </p>
              <Button onClick={() => navigate('/')} className="btn-primary px-8 py-6 text-lg rounded-2xl">
                Вернуться в меню
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Вернуться в меню</span>
          </button>

          <h1 className="text-3xl md:text-4xl font-bold mb-8">Оформление заказа</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cart Items & Add-ons */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items Card */}
              <div className="bg-background rounded-3xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold flex items-center gap-3">
                    <ShoppingBag className="w-6 h-6 text-primary" />
                    Ваш заказ
                  </h2>
                  <span className="text-muted-foreground">
                    {items.reduce((sum, i) => sum + i.quantity, 0)} товаров
                  </span>
                </div>
                
                <div className="space-y-4">
                  {items.map((item) => {
                    const uniqueId = getUniqueId(item);
                    return (
                      <div
                        key={uniqueId}
                        className="flex gap-4 p-4 bg-secondary/50 rounded-2xl"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold line-clamp-1">{item.name}</h4>
                          {(item.size || item.pieces) && (
                            <p className="text-sm text-muted-foreground">
                              {item.size || `${item.pieces} шт`}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-lg font-bold text-primary">
                              {item.price * item.quantity} ₽
                            </p>
                            {item.oldPrice && (
                              <p className="text-sm text-muted-foreground line-through">
                                {item.oldPrice * item.quantity} ₽
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeItem(uniqueId)}
                            className="w-8 h-8 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-center gap-1 bg-background rounded-full p-1">
                            <button
                              onClick={() => updateQuantity(uniqueId, item.quantity - 1)}
                              className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center font-bold text-sm">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(uniqueId, item.quantity + 1)}
                              className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sauces Card */}
              <div className="bg-background rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="text-2xl">🥫</span>
                  Добавить соусы
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {sauces.map((sauce) => (
                    <button
                      key={sauce.id}
                      onClick={() => handleAddSauce(sauce)}
                      className="flex flex-col items-center p-4 bg-secondary/50 hover:bg-secondary rounded-2xl border border-transparent hover:border-primary/30 transition-all group"
                    >
                      <span className="text-3xl mb-2">{sauce.emoji}</span>
                      <span className="font-medium text-sm text-center">{sauce.name}</span>
                      <span className="text-primary font-bold text-sm mt-1">{sauce.price} ₽</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Drinks Card */}
              <div className="bg-background rounded-3xl p-6 shadow-sm">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Добавить напитки
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {drinks.map((drink) => (
                    <button
                      key={drink.id}
                      onClick={() => handleAddDrink(drink)}
                      className="flex items-center gap-3 p-3 bg-secondary/50 hover:bg-secondary rounded-2xl border border-transparent hover:border-primary/30 transition-all group"
                    >
                      <img 
                        src={drink.image} 
                        alt={drink.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="text-left">
                        <p className="font-semibold text-sm">{drink.name}</p>
                        <p className="text-primary font-bold">{drink.price} ₽</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Form Card */}
              <div className="bg-background rounded-3xl p-6 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  Данные для заказа
                </h3>

                {/* Contact Info */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      Ваше имя
                    </Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван"
                      className="rounded-xl h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      Номер телефона
                    </Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 123-45-67"
                      className="rounded-xl h-12"
                    />
                  </div>
                </div>

                {/* Delivery Type Toggle */}
                <div className="mb-6">
                  <Label className="mb-3 block">Способ получения</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setDeliveryType('delivery')}
                      className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        deliveryType === 'delivery'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Truck className="w-5 h-5" />
                      <span className="font-semibold">Доставка</span>
                    </button>
                    <button
                      onClick={() => setDeliveryType('pickup')}
                      className={`flex items-center justify-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        deliveryType === 'pickup'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Store className="w-5 h-5" />
                      <span className="font-semibold">Самовывоз</span>
                    </button>
                  </div>
                </div>

                {/* Address Fields (only for delivery) */}
                {deliveryType === 'delivery' && (
                  <div className="space-y-4 mb-6 p-4 bg-secondary/30 rounded-2xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2 sm:col-span-1 space-y-2">
                        <Label htmlFor="street">Улица</Label>
                        <Input
                          id="street"
                          value={street}
                          onChange={(e) => setStreet(e.target.value)}
                          placeholder="ул. Ленина"
                          className="rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="house">Дом</Label>
                        <Input
                          id="house"
                          value={house}
                          onChange={(e) => setHouse(e.target.value)}
                          placeholder="15"
                          className="rounded-xl h-12"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="apartment">Квартира</Label>
                        <Input
                          id="apartment"
                          value={apartment}
                          onChange={(e) => setApartment(e.target.value)}
                          placeholder="42"
                          className="rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="entrance">Подъезд</Label>
                        <Input
                          id="entrance"
                          value={entrance}
                          onChange={(e) => setEntrance(e.target.value)}
                          placeholder="2"
                          className="rounded-xl h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="floor">Этаж</Label>
                        <Input
                          id="floor"
                          value={floor}
                          onChange={(e) => setFloor(e.target.value)}
                          placeholder="5"
                          className="rounded-xl h-12"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Pickup Points (only for pickup) */}
                {deliveryType === 'pickup' && (
                  <div className="mb-6">
                    <Label className="mb-3 flex items-center gap-2">
                      <Store className="w-4 h-4 text-muted-foreground" />
                      Пункт самовывоза
                    </Label>
                    <div className="space-y-3">
                      {pickupPoints.map((point) => (
                        <button
                          key={point.id}
                          onClick={() => setSelectedPickupPoint(point.id)}
                          className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                            selectedPickupPoint === point.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold">{point.name}</p>
                              <p className="text-sm text-muted-foreground mt-1">{point.address}</p>
                              <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {point.workHours}
                                </span>
                                <span>{point.metro}</span>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ml-3 ${
                              selectedPickupPoint === point.id
                                ? 'border-primary bg-primary'
                                : 'border-muted-foreground/30'
                            }`}>
                              {selectedPickupPoint === point.id && (
                                <Check className="w-3 h-3 text-primary-foreground" />
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery Time */}
                <div className="mb-6">
                  <Label className="mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    Время {deliveryType === 'delivery' ? 'доставки' : 'самовывоза'}
                  </Label>
                  <RadioGroup value={deliveryTime} onValueChange={(v) => setDeliveryTime(v as 'asap' | 'scheduled')}>
                    <div className="flex items-center space-x-3 p-3 bg-secondary/30 rounded-xl">
                      <RadioGroupItem value="asap" id="asap" />
                      <Label htmlFor="asap" className="cursor-pointer flex-1">Как можно скорее</Label>
                    </div>
                    <div className="flex flex-col p-3 bg-secondary/30 rounded-xl mt-2">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="scheduled" id="scheduled" />
                        <Label htmlFor="scheduled" className="cursor-pointer">Ко времени</Label>
                      </div>
                      {deliveryTime === 'scheduled' && (
                        <div className="flex flex-wrap gap-3 mt-4 ml-6">
                          {/* Date Picker */}
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-[180px] justify-start text-left font-normal rounded-xl h-11",
                                  !scheduledDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {scheduledDate ? format(scheduledDate, "d MMMM", { locale: ru }) : "Выберите дату"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={scheduledDate}
                                onSelect={setScheduledDate}
                                disabled={(date) => date < new Date()}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          
                          {/* Time Picker */}
                          <Input
                            type="time"
                            value={scheduledTime}
                            onChange={(e) => setScheduledTime(e.target.value)}
                            className="w-32 rounded-xl h-11"
                          />
                        </div>
                      )}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <Label className="mb-3 flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-muted-foreground" />
                    Способ оплаты
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'cash'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Banknote className="w-5 h-5" />
                      <span className="font-medium text-sm">Наличные</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('card_courier')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'card_courier'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium text-sm">Картой курьеру</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('online')}
                      className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${
                        paymentMethod === 'online'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Wallet className="w-5 h-5" />
                      <span className="font-medium text-sm">Онлайн</span>
                    </button>
                  </div>
                </div>

                {/* Comment */}
                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий к заказу</Label>
                  <Input
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Позвонить за 5 минут..."
                    className="rounded-xl h-12"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Order Summary (Sticky) */}
            <div className="lg:col-span-1">
              <div className="bg-background rounded-3xl p-6 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold mb-6">Итого</h3>

                {/* Delivery Progress */}
                {deliveryType === 'delivery' && (
                  <div className="mb-6 p-4 bg-secondary/50 rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-5 h-5 text-primary" />
                      {remainingForFreeDelivery > 0 ? (
                        <span className="text-sm">
                          До бесплатной доставки: <strong className="text-primary">{remainingForFreeDelivery} ₽</strong>
                        </span>
                      ) : (
                        <span className="text-sm font-medium flex items-center gap-1 text-primary">
                          <Sparkles className="w-4 h-4" />
                          Бесплатная доставка!
                        </span>
                      )}
                    </div>
                    <Progress value={deliveryProgress} className="h-2" />
                  </div>
                )}

                {/* Promo Code */}
                <div className="mb-6">
                  {appliedPromo ? (
                    <div className="flex items-center justify-between p-3 bg-primary/10 rounded-xl border border-primary/20">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary" />
                        <span className="font-medium text-sm">{appliedPromo.code}</span>
                        <span className="text-primary font-bold">-{appliedPromo.discount * 100}%</span>
                      </div>
                      <button
                        onClick={handleRemovePromo}
                        className="w-6 h-6 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            value={promoCode}
                            onChange={(e) => {
                              setPromoCode(e.target.value);
                              setPromoError('');
                            }}
                            placeholder="Промокод"
                            className={`pl-10 rounded-xl ${promoError ? 'border-destructive' : ''}`}
                          />
                        </div>
                        <Button
                          onClick={handleApplyPromo}
                          variant="outline"
                          className="rounded-xl"
                          disabled={!promoCode.trim()}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                      {promoError && (
                        <p className="text-sm text-destructive">{promoError}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Сумма заказа</span>
                    <span>{totalPrice} ₽</span>
                  </div>
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Скидка</span>
                      <span className="text-primary font-medium">-{discountAmount} ₽</span>
                    </div>
                  )}
                  {deliveryType === 'delivery' && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Доставка</span>
                      {deliveryCost > 0 ? (
                        <span>{deliveryCost} ₽</span>
                      ) : (
                        <span className="text-primary font-medium">Бесплатно</span>
                      )}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="font-bold text-lg">К оплате</span>
                    <span className="text-2xl font-bold text-primary">{finalPrice} ₽</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitOrder}
                  className="w-full btn-primary py-6 text-lg rounded-2xl"
                >
                  Оформить заказ
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
