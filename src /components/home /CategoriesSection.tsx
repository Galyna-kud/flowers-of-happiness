import { categories } from '@/data/bouquets';
import { Link } from 'react-router-dom';

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-primary font-medium">Знайдіть свій ідеальний букет</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Категорії букетів
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={`/catalog?category=${category.id}`}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-card hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </span>
                <span className="text-sm font-medium text-foreground text-center">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
