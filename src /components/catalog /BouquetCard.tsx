import { Bouquet } from '@/types';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface BouquetCardProps {
  bouquet: Bouquet;
}

const BouquetCard = ({ bouquet }: BouquetCardProps) => {
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={bouquet.image}
          alt={bouquet.name}
          onLoad={() => setImageLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-transform duration-700 group-hover:scale-110",
            !imageLoaded && "opacity-0"
          )}
        />
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted shimmer" />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {bouquet.isNew && (
            <span className="px-3 py-1 bg-sage text-secondary-foreground text-xs font-semibold rounded-full">
              Новинка
            </span>
          )}
          {bouquet.isSale && (
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
              Акція
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm shadow-md hover:scale-110 transition-transform"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isLiked ? "fill-primary text-primary" : "text-muted-foreground"
            )}
          />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <Button
            variant="glass"
            size="sm"
            className="flex-1"
            onClick={() => addToCart(bouquet)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            До кошика
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-1">
            {bouquet.name}
          </h3>
          <div className="flex items-center gap-1 text-gold shrink-0">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-medium">{bouquet.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {bouquet.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {bouquet.flowers.slice(0, 3).map((flower) => (
            <span
              key={flower}
              className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground"
            >
              {flower}
            </span>
          ))}
          {bouquet.flowers.length > 3 && (
            <span className="px-2 py-0.5 bg-muted rounded-full text-xs text-muted-foreground">
              +{bouquet.flowers.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-primary">
              {bouquet.price} ₴
            </span>
            {bouquet.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {bouquet.originalPrice} ₴
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BouquetCard;
