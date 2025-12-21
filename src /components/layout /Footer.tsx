import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, Facebook, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (!email) {
      toast({
        title: 'Помилка',
        description: 'Будь ласка, введіть email',
        variant: 'destructive',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: 'Помилка',
        description: 'Будь ласка, введіть коректний email',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Дякуємо за підписку!',
      description: 'Ви будете отримувати наші новини та акції',
    });
    setEmail('');
  };

  return (
    <footer className="bg-foreground text-background">
      {/* Newsletter */}
      <div className="bg-gradient-accent py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-primary-foreground mb-2">
                Підпишіться на розсилку
              </h3>
              <p className="text-primary-foreground/80">
                Отримуйте перші акції та новинки
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto max-w-md">
              <Input
                type="email"
                placeholder="Ваш email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/20 border-background/30 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button variant="gold" size="lg" onClick={handleNewsletterSubmit}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Brand */}
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2">
                <span className="text-3xl">🌸</span>
                <span className="font-display text-2xl font-semibold">
                  Квіткова Мрія
                </span>
              </Link>
              <p className="text-background/70 text-sm leading-relaxed">
                Ми створюємо неперевершені квіткові композиції для ваших особливих моментів з 2010 року.
              </p>
              <div className="flex gap-3">
                <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="p-2 rounded-full bg-background/10 hover:bg-background/20 transition-colors">
                  <Send className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Швидкі посилання</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/catalog" className="text-background/70 hover:text-background transition-colors text-sm">
                    Каталог
                  </Link>
                </li>
                <li>
                  <Link to="/promotions" className="text-background/70 hover:text-background transition-colors text-sm">
                    Акції
                  </Link>
                </li>
                <li>
                  <Link to="/custom-bouquet" className="text-background/70 hover:text-background transition-colors text-sm">
                    Конструктор букетів
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-background/70 hover:text-background transition-colors text-sm">
                    Про нас
                  </Link>
                </li>
                <li>
                  <Link to="/contacts" className="text-background/70 hover:text-background transition-colors text-sm">
                    Контакти
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Категорії</h4>
              <ul className="space-y-2">
                {['Романтичні букети', 'Весільні букети', 'Преміум колекція', 'Екзотичні квіти', 'Сезонні букети'].map((item) => (
                  <li key={item}>
                    <Link
                      to="/catalog"
                      className="text-background/70 hover:text-background transition-colors text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Контакти</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-primary" />
                  <span className="text-background/70 text-sm">
                    вул. Квіткова, 25<br />Львів, 79000
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+380501234567" className="text-background/70 hover:text-background text-sm">
                    +38 (050) 123-45-67
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:info@kvitkovamriya.ua" className="text-background/70 hover:text-background text-sm">
                    info@kvitkovamriya.ua
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-background/50">
            <p>© 2025 Квіткова Мрія. Всі права захищені.</p>
            <div className="flex gap-6">
              <Link to="/" className="hover:text-background transition-colors">
                Політика конфіденційності
              </Link>
              <Link to="/" className="hover:text-background transition-colors">
                Умови використання
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
