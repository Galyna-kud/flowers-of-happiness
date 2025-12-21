import { Truck, Clock, Award, Heart, Leaf, Gift } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Швидка доставка',
    description: 'Доставка по місту за 2-3 години. Безкоштовно від 2000 грн.',
  },
  {
    icon: Clock,
    title: 'Цілодобово',
    description: 'Працюємо 24/7. Замовляйте в будь-який час доби.',
  },
  {
    icon: Award,
    title: 'Гарантія якості',
    description: 'Тільки свіжі квіти. Гарантуємо свіжість 7 днів.',
  },
  {
    icon: Heart,
    title: 'З любов\'ю',
    description: 'Кожен букет створюється з особливою турботою.',
  },
  {
    icon: Leaf,
    title: 'Еко-пакування',
    description: 'Використовуємо тільки екологічні матеріали.',
  },
  {
    icon: Gift,
    title: 'Подарункове оформлення',
    description: 'Безкоштовне святкове оформлення до кожного замовлення.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-primary font-medium">Чому обирають нас</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Наші переваги
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-rose-light group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
