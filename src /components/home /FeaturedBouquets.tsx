import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import BouquetCard from '@/components/catalog/BouquetCard';
import { bouquets } from '@/data/bouquets';

// Import images
import romanticImg from '@/assets/bouquet-romantic.jpg';
import sunnyImg from '@/assets/bouquet-sunny.jpg';
import premiumImg from '@/assets/bouquet-premium.jpg';
import rusticImg from '@/assets/bouquet-rustic.jpg';
import peonyImg from '@/assets/bouquet-peony.jpg';
import tropicalImg from '@/assets/bouquet-tropical.jpg';
import weddingImg from '@/assets/bouquet-wedding.jpg';
import autumnImg from '@/assets/bouquet-autumn.jpg';

// Map images to bouquets
const imageMap: Record<string, string> = {
  '1': romanticImg,
  '2': sunnyImg,
  '3': premiumImg,
  '4': rusticImg,
  '5': peonyImg,
  '6': tropicalImg,
  '7': weddingImg,
  '8': autumnImg,
};

const FeaturedBouquets = () => {
  const featuredBouquets = bouquets.slice(0, 4).map(b => ({
    ...b,
    image: imageMap[b.id] || b.image
  }));

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-primary font-medium">Найкраще для вас</span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Популярні букети
            </h2>
          </div>
          <Link to="/catalog">
            <Button variant="outline" className="group">
              Всі букети
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBouquets.map((bouquet, index) => (
            <div
              key={bouquet.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <BouquetCard bouquet={bouquet} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBouquets;
