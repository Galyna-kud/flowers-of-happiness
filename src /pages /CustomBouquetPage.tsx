
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { customFlowers } from '@/data/bouquets';
import { CustomFlower, CustomBouquet } from '@/types';
import { Plus, Minus, Save, ShoppingCart, Sparkles, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const CustomBouquetPage = () => {
  const [flowers, setFlowers] = useState<CustomFlower[]>(customFlowers);
  const [bouquetName, setBouquetName] = useState('Мій унікальний букет');
  const { isAuthenticated, saveBouquet } = useAuth();
  const { addToCart } = useCart();

  const selectedFlowers = flowers.filter((f) => f.quantity > 0);
  const totalPrice = selectedFlowers.reduce(
    (sum, f) => sum + f.price * f.quantity,
    0
  );
  const totalFlowers = selectedFlowers.reduce((sum, f) => sum + f.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setFlowers((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, quantity: Math.max(0, f.quantity + delta) }
          : f
      )
    );
  };

  const resetAll = () => {
    setFlowers(customFlowers);
    setBouquetName('Мій унікальний букет');
  };

  const handleSaveBouquet = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Необхідна авторизація',
        description: 'Увійдіть, щоб зберігати букети',
        variant: 'destructive',
      });
      return;
    }

    if (selectedFlowers.length === 0) {
      toast({
        title: 'Букет порожній',
        description: 'Додайте хоча б одну квітку',
        variant: 'destructive',
      });
      return;
    }

    const bouquet: CustomBouquet = {
      id: crypto.randomUUID(),
      name: bouquetName,
      flowers: selectedFlowers,
      totalPrice,
      createdAt: new Date(),
    };

    saveBouquet(bouquet);
  };

  const handleAddToCart = () => {
    if (selectedFlowers.length === 0) {
      toast({
        title: 'Букет порожній',
        description: 'Додайте хоча б одну квітку',
        variant: 'destructive',
      });
      return;
    }

    addToCart({
      id: `custom-${crypto.randomUUID()}`,
      name: bouquetName,
      price: totalPrice,
      image: '',
      category: 'custom',
      description: `Власний букет: ${selectedFlowers.map(f => f.name).join(', ')}`,
      flowers: selectedFlowers.map(f => f.name),
      rating: 5,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-light rounded-full text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Створіть свій унікальний букет</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Конструктор букетів
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Оберіть улюблені квіти та створіть ідеальну композицію на свій смак
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Flowers Selection */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  Оберіть квіти
                </h2>
                <Button variant="ghost" size="sm" onClick={resetAll}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Скинути
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {flowers.map((flower) => (
                  <div
                    key={flower.id}
                    className={cn(
                      "p-4 rounded-2xl border-2 transition-all duration-300",
                      flower.quantity > 0
                        ? "border-primary bg-rose-light/30"
                        : "border-border bg-card hover:border-primary/30"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      {/* Color indicator */}
                      <div
                        className="w-12 h-12 rounded-xl shadow-inner"
                        style={{ backgroundColor: flower.color }}
                      />

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {flower.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {flower.price} ₴ / шт
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(flower.id, -1)}
                          disabled={flower.quantity === 0}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">
                          {flower.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(flower.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bouquet Preview & Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Preview Card */}
                <div className="p-6 bg-card rounded-2xl border border-border shadow-card">
                  <h2 className="font-display text-xl font-semibold text-foreground mb-4">
                    Ваш букет
                  </h2>

                  {/* Bouquet Name Input */}
                  <div className="mb-4">
                    <Input
                      value={bouquetName}
                      onChange={(e) => setBouquetName(e.target.value)}
                      placeholder="Назва букету"
                      className="text-center font-medium"
                    />
                  </div>

                  {/* Visual Preview */}
                  <div className="relative aspect-square rounded-xl bg-gradient-hero mb-4 flex items-center justify-center overflow-hidden">
                    {selectedFlowers.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-2 p-4">
                        {selectedFlowers.map((flower) =>
                          Array.from({ length: Math.min(flower.quantity, 5) }).map(
                            (_, i) => (
                              <div
                                key={`${flower.id}-${i}`}
                                className="w-8 h-8 rounded-full shadow-md animate-float"
                                style={{
                                  backgroundColor: flower.color,
                                  animationDelay: `${i * 200}ms`,
                                }}
                              />
                            )
                          )
                        )}
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <span className="text-4xl">💐</span>
                        <p className="mt-2 text-sm">Оберіть квіти</p>
                      </div>
                    )}
                  </div>

                  {/* Selected Flowers List */}
                  {selectedFlowers.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {selectedFlowers.map((flower) => (
                        <div
                          key={flower.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {flower.name} × {flower.quantity}
                          </span>
                          <span className="font-medium">
                            {flower.price * flower.quantity} ₴
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Total */}
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-muted-foreground">Всього квітів:</span>
                      <span className="font-semibold">{totalFlowers} шт</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Сума:</span>
                      <span className="font-display text-2xl font-bold text-primary">
                        {totalPrice} ₴
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    variant="hero"
                    size="lg"
                    className="w-full"
                    onClick={handleAddToCart}
                    disabled={selectedFlowers.length === 0}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Додати до кошика
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={handleSaveBouquet}
                    disabled={selectedFlowers.length === 0}
                  >
                    <Save className="h-5 w-5 mr-2" />
                    {isAuthenticated ? 'Зберегти букет' : 'Увійти, щоб зберегти'}
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

export default CustomBouquetPage;
