import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ірина Бондаренко',
    avatar: '👩',
    rating: 5,
    text: 'Замовляла букет на день народження мами. Квіти просто неймовірні! Доставили вчасно, букет був навіть кращим, ніж на фото. Дуже задоволена!',
    date: '23 березня 2021',
  },
  {
    id: 2,
    name: 'Михайло Коваленко',
    avatar: '👨',
    rating: 5,
    text: 'Вже третій рік замовляю тут квіти для дружини на всі свята. Завжди відмінна якість та сервіс. Рекомендую всім!',
    date: '8 липня 2023',
  },
  {
    id: 3,
    name: 'Анна Шевченко',
    avatar: '👩‍🦰',
    rating: 5,
    text: 'Створювала власний букет в конструкторі - це просто чудово! Можна обрати саме ті квіти, які подобаються. Результат перевершив очікування.',
    date: '14 вересня 2024',
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-primary font-medium">Що кажуть клієнти</span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Відгуки наших клієнтів
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative p-6 rounded-2xl bg-card shadow-card hover:shadow-soft transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 h-8 w-8 text-rose-light" />

              {/* Content */}
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-gold text-gold" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-rose-light flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.date}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
