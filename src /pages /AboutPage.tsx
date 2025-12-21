import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Award, Heart, Leaf, Users, Truck, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-flowers.jpg';

const AboutPage = () => {
  const stats = [
    { value: '15+', label: 'Років досвіду' },
    { value: '50,000+', label: 'Щасливих клієнтів' },
    { value: '100+', label: 'Видів квітів' },
    { value: '24/7', label: 'Працюємо для вас' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'З любов\'ю до деталей',
      description: 'Кожен букет створюється з особливою турботою та увагою до найменших деталей.',
    },
    {
      icon: Leaf,
      title: 'Екологічність',
      description: 'Використовуємо тільки екологічні матеріали для пакування та доставки.',
    },
    {
      icon: Award,
      title: 'Преміум якість',
      description: 'Працюємо тільки з найкращими постачальниками свіжих квітів.',
    },
    {
      icon: Users,
      title: 'Професійна команда',
      description: 'Наші флористи — справжні майстри своєї справи з багаторічним досвідом.',
    },
    {
      icon: Truck,
      title: 'Швидка доставка',
      description: 'Доставляємо по місту за 2-3 години, безкоштовно від 2000 грн.',
    },
    {
      icon: Clock,
      title: 'Завжди на зв\'язку',
      description: 'Працюємо цілодобово, щоб ви могли замовити квіти в будь-який час.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-up">
                <span className="text-primary font-medium">Про нас</span>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  Квіткова Мрія — ваш партнер у створенні{' '}
                  <span className="text-gradient">особливих моментів</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ми — команда пристрасних флористів, які вірять у силу квітів передавати 
                  емоції та створювати незабутні враження. З 2010 року ми допомагаємо 
                  нашим клієнтам висловлювати свої почуття через красу живих квітів.
                </p>
              </div>
              <div className="relative animate-fade-up delay-200">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-glow">
                  <img
                    src={heroImage}
                    alt="Наша квіткова майстерня"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="font-display text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 space-y-4">
              <span className="text-primary font-medium">Наші цінності</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Чому обирають нас
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="p-6 bg-card rounded-2xl border border-border hover:shadow-soft hover:-translate-y-1 transition-all duration-300 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-rose-light shrink-0">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                Наша історія
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Все почалося у 2010 році з маленької квіткової крамнички в центрі Києва. 
                  Засновниця "Квіткової Мрії" — Олена Петренко — завжди вірила, що квіти 
                  мають особливу магію: вони можуть висловити те, чого не скажеш словами.
                </p>
                <p>
                  За ці роки ми виросли з невеликого магазинчика до одного з найбільших 
                  квіткових бутиків міста. Але головне залишилося незмінним — наша любов 
                  до квітів та бажання дарувати радість кожному клієнту.
                </p>
                <p>
                  Сьогодні наша команда налічує понад 30 професійних флористів, 
                  і ми пишаємося тим, що допомогли створити більше 50 000 особливих моментів 
                  для наших клієнтів.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
