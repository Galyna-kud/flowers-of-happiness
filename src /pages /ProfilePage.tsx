import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { User, Package, Heart, LogOut, Clock, MapPin, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProfilePage = () => {
  const { user, isAuthenticated, logout, orders, savedBouquets, removeSavedBouquet } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gold-light text-gold';
      case 'processing':
        return 'bg-sage-light text-sage';
      case 'delivered':
        return 'bg-sage text-secondary-foreground';
      case 'cancelled':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Очікує';
      case 'processing':
        return 'Обробляється';
      case 'delivered':
        return 'Доставлено';
      case 'cancelled':
        return 'Скасовано';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Profile Header */}
          <div className="bg-gradient-hero rounded-3xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-card">
                <User className="h-12 w-12 text-primary" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="font-display text-3xl font-bold text-foreground mb-2">
                  {user?.name}
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
              <div className="md:ml-auto">
                <Button variant="outline" onClick={logout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Вийти
                </Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Orders History */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-rose-light">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Історія замовлень
                </h2>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Замовлень поки немає</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">
                          #{order.id.slice(0, 8)}
                        </span>
                        <span
                          className={cn(
                            'flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium',
                            getStatusColor(order.status)
                          )}
                        >
                          {getStatusIcon(order.status)}
                          {getStatusText(order.status)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="h-4 w-4" />
                        {order.deliveryAddress}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {order.items.length} товар(ів)
                        </span>
                        <span className="font-semibold text-primary">
                          {order.total} ₴
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Bouquets */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-rose-light">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Збережені букети
                </h2>
              </div>

              {savedBouquets.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Збережених букетів немає</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate('/custom-bouquet')}
                  >
                    Створити букет
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedBouquets.map((bouquet) => (
                    <div
                      key={bouquet.id}
                      className="p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">
                          {bouquet.name}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSavedBouquet(bouquet.id)}
                        >
                          <XCircle className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {bouquet.flowers.map((flower) => (
                          <span
                            key={flower.id}
                            className="px-2 py-0.5 bg-background rounded-full text-xs"
                          >
                            {flower.name} × {flower.quantity}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(bouquet.createdAt).toLocaleDateString('uk-UA')}
                        </span>
                        <span className="font-semibold text-primary">
                          {bouquet.totalPrice} ₴
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
