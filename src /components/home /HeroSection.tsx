import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroImage from '@/assets/hero-flowers.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-rose-light rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-sage-light rounded-full blur-3xl animate-float delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-light rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-light rounded-full text-primary">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Безкоштовна доставка від 2000 грн</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Квіти, що{' '}
              <span className="text-gradient">говорять</span>{' '}
              за вас
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Створюємо неперевершені букети для особливих моментів вашого життя. 
              Кожна композиція — це витвір мистецтва.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/catalog">
                <Button variant="hero" size="xl">
                  Переглянути каталог
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/custom-bouquet">
                <Button variant="outline" size="xl">
                  Створити свій букет
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
              {[
                { value: '15+', label: 'Років досвіду' },
                { value: '50k+', label: 'Щасливих клієнтів' },
                { value: '100+', label: 'Видів квітів' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-gold/30 rounded-full" />
              
              <div className="relative rounded-3xl overflow-hidden shadow-glow">
                <img
                  src={heroImage}
                  alt="Розкішний букет з рожевих троянд та білих півоній"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-card p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-light rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🌹</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Свіжі квіти</div>
                    <div className="text-sm text-muted-foreground">Щоденні поставки</div>
                  </div>
                </div>
              </div>

              {/* Another floating badge */}
              <div className="absolute -top-6 -right-6 bg-card rounded-2xl shadow-card p-4 animate-float delay-500">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gold-light rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">4.9/5</div>
                    <div className="text-sm text-muted-foreground">2000+ відгуків</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
