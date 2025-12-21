import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Order } from '@/types';

const CartPage = () => {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
  const { isAuthenticated, addOrder } = useAuth();
  const navigate = useNavigate();
  
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryFee = totalPrice >= 2000 ? 0 : 150;
  const finalTotal = totalPrice + deliveryFee - discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SPRING20') {
      setDiscount(Math.round(totalPrice * 0.2));
      toast({
        title: 'Промокод застосовано!',
        description: 'Знижка 20% додана до вашого замовлення',
      });
    } else if (promoCode.toUpperCase() === 'LOVE15') {
      setDiscount(Math.round(totalPrice * 0.15));
      toast({
        title: 'Промокод застосовано!',
        description: 'Знижка 15% додана до вашого замовлення',
      });
    } else {
      toast({
        title: 'Невірний промокод',
        description: 'Перевірте правильність введення',
        variant: 'destructive',
      });
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Необхідна авторизація',
        description: 'Увійдіть, щоб оформити замовлення',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    if (!deliveryAddress || !deliveryDate) {
      toast({
        title: 'Заповніть дані доставки',
        description: 'Вкажіть адресу та дату доставки',
        variant: 'destructive',
      });
      return;
    }

    const selectedDate = new Date(deliveryDate);
    const now = new Date();
    if (selectedDate < now) {
      toast({
        title: 'Невірна дата',
        description: 'Дата доставки не може бути в минулому',
        variant: 'destructive',
      });
      return;
    }

    const order: Order = {
      id: crypto.randomUUID(),
      items: items,
      total: finalTotal,
      status: 'pending',
      createdAt: new Date(),
      deliveryAddress,
      deliveryDate,
    };

    addOrder(order);
    clearCart();
    
    toast({
      title: 'Замовлення оформлено!',
      description: `Номер замовлення: ${order.id.slice(0, 8)}`,
    });
    
    navigate('/profile');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-16">
              <div className="w-24 h-24 bg-rose-light rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="h-12 w-12 text-primary" />
              </div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Кошик порожній
              </h1>
              <p className="text-muted-foreground mb-8">
                Додайте улюблені букети до кошика
              </p>
              <Link to="/catalog">
                <Button variant="hero" size="lg">
                  Перейти до каталогу
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
            Кошик
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div
                  key={item.bouquet.id}
                  className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
                >
                  {!item.bouquet.id.startsWith('custom-') && item.bouquet.image && (
                    <img
                      src={item.bouquet.image}
                      alt={item.bouquet.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {item.bouquet.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {item.bouquet.price} ₴
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.bouquet.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.bouquet.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.bouquet.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                    <span className="font-semibold text-foreground">
                      {item.bouquet.price * item.quantity} ₴
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="p-6 bg-card rounded-2xl border border-border shadow-card">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Оформлення замовлення
                  </h2>

                  {/* Delivery Info */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Адреса доставки
                      </label>
                      <Input
                        placeholder="вул. Квіткова, 25, кв. 10"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-1 block">
                        Дата та час доставки
                      </label>
                      <Input
                        type="datetime-local"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="flex gap-2 mb-6">
                    <Input
                      placeholder="Промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button variant="outline" onClick={applyPromoCode}>
                      Застосувати
                    </Button>
                  </div>

                  {/* Summary */}
                  <div className="space-y-2 pt-4 border-t border-border">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Товари:</span>
                      <span>{totalPrice} ₴</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Доставка:</span>
                      <span>{deliveryFee === 0 ? 'Безкоштовно' : `${deliveryFee} ₴`}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-sage">
                        <span>Знижка:</span>
                        <span>-{discount} ₴</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-border">
                      <span className="font-semibold">Всього:</span>
                      <span className="font-display text-2xl font-bold text-primary">
                        {finalTotal} ₴
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                    onClick={handleCheckout}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Оформити замовлення
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
