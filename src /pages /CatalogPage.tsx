import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BouquetCard from '@/components/catalog/BouquetCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { bouquets, categories } from '@/data/bouquets';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// Import images
import romanticImg from '@/assets/bouquet-romantic.jpg';
import sunnyImg from '@/assets/bouquet-sunny.jpg';
import premiumImg from '@/assets/bouquet-premium.jpg';
import rusticImg from '@/assets/bouquet-rustic.jpg';
import peonyImg from '@/assets/bouquet-peony.jpg';
import tropicalImg from '@/assets/bouquet-tropical.jpg';
import weddingImg from '@/assets/bouquet-wedding.jpg';
import autumnImg from '@/assets/bouquet-autumn.jpg';

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

const CatalogPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBouquets = bouquets
    .map(b => ({ ...b, image: imageMap[b.id] || b.image }))
    .filter((bouquet) => {
      const matchesSearch = bouquet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bouquet.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || bouquet.category === selectedCategory;
      const matchesPrice = bouquet.price >= priceRange[0] && bouquet.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Каталог букетів
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Знайдіть ідеальний букет для будь-якого випадку. Від романтичних троянд до екзотичних орхідей.
            </p>
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Пошук букетів..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Select */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Категорія" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Select */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Сортування" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">За популярністю</SelectItem>
                <SelectItem value="price-asc">Ціна: від низької</SelectItem>
                <SelectItem value="price-desc">Ціна: від високої</SelectItem>
                <SelectItem value="rating">За рейтингом</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Toggle */}
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Фільтри
            </Button>
          </div>

          {/* Price Filter */}
          <div className={cn(
            "mb-8 p-6 bg-card rounded-2xl border border-border transition-all duration-300",
            showFilters ? "block" : "hidden lg:block"
          )}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Ціновий діапазон</h3>
              <span className="text-sm text-muted-foreground">
                {priceRange[0]} - {priceRange[1]} ₴
              </span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={3000}
              step={100}
              className="w-full"
            />
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Знайдено: <span className="font-semibold text-foreground">{filteredBouquets.length}</span> букетів
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceRange([0, 3000]);
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Скинути фільтри
              </Button>
            )}
          </div>

          {/* Bouquets Grid */}
          {filteredBouquets.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBouquets.map((bouquet, index) => (
                <div
                  key={bouquet.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <BouquetCard bouquet={bouquet} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🌸</div>
              <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                Букетів не знайдено
              </h3>
              <p className="text-muted-foreground mb-6">
                Спробуйте змінити параметри пошуку
              </p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange([0, 3000]);
              }}>
                Скинути фільтри
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CatalogPage;
