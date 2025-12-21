import { promotions } from '@/data/bouquets';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder images for promotions
import romanticImg from '@/assets/bouquet-romantic.jpg';
import peonyImg from '@/assets/bouquet-peony.jpg';
import weddingImg from '@/assets/bouquet-wedding.jpg';

const promoImages = [romanticImg, peonyImg, weddingImg];

const PromotionsSection = () => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-hero">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-primary font-medium">Вигідні пропозиції</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Акції та знижки
            </h2>
          </div>
          <Link to="/promotions">
            <Button variant="outline" className="group">
              Всі акції
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((promo, index) => (
            <div
              key={promo.id}
              className="group relative overflow-hidden rounded-2xl bg-card shadow-card hover:shadow-glow transition-all duration-500 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={promoImages[index] || promoImages[0]}
                  alt={promo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                
                {/* Discount Badge */}
                {promo.discount > 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground font-bold rounded-full">
                    -{promo.discount}%
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {promo.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {promo.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>до {formatDate(promo.validUntil)}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-sage-light rounded-full">
                    <Tag className="h-4 w-4 text-sage" />
                    <span className="text-sm font-medium text-sage">{promo.code}</span>
                  </div>
                </div>

                <Button variant="hero" className="w-full">
                  Скористатися
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromotionsSection;
