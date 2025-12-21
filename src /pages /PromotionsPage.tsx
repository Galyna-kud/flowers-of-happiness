import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { promotions } from '@/data/bouquets';
import { Button } from '@/components/ui/button';
import { Clock, Tag, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

import romanticImg from '@/assets/bouquet-romantic.jpg';
import peonyImg from '@/assets/bouquet-peony.jpg';
import weddingImg from '@/assets/bouquet-wedding.jpg';

const promoImages = [romanticImg, peonyImg, weddingImg];

const PromotionsPage = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: 'Код скопійовано!',
      description: `Промокод ${code} скопійовано в буфер обміну`,
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Акції та знижки
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Скористайтеся нашими вигідними пропозиціями та заощаджуйте на букетах вашої мрії
            </p>
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promotions.map((promo, index) => (
              <div
                key={promo.id}
                className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={promoImages[index] || promoImages[0]}
                    alt={promo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  
                  {/* Discount Badge */}
                  {promo.discount > 0 && (
                    <div className="absolute top-4 right-4 px-4 py-2 bg-primary text-primary-foreground font-bold text-xl rounded-full shadow-lg">
                      -{promo.discount}%
                    </div>
                  )}

                  {/* Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-display text-2xl font-bold text-primary-foreground">
                      {promo.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {promo.description}
                  </p>

                  {/* Validity */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>Діє до {formatDate(promo.validUntil)}</span>
                  </div>

                  {/* Promo Code */}
                  <div className="flex items-center gap-3 p-4 bg-sage-light rounded-xl">
                    <Tag className="h-5 w-5 text-sage" />
                    <span className="font-mono font-bold text-lg text-sage flex-1">
                      {promo.code}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(promo.code)}
                    >
                      {copiedCode === promo.code ? (
                        <CheckCircle className="h-4 w-4 text-sage" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  <Button variant="hero" className="w-full">
                    Скористатися знижкою
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 p-8 bg-gradient-hero rounded-3xl text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              Як використати промокод?
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                  1
                </div>
                <p className="text-muted-foreground">Скопіюйте промокод</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                  2
                </div>
                <p className="text-muted-foreground">Додайте товари до кошика</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-card rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-primary">
                  3
                </div>
                <p className="text-muted-foreground">Введіть код при оформленні</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromotionsPage;
