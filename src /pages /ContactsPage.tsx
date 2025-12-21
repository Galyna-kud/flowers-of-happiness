import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

const ContactsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Повідомлення надіслано!',
      description: 'Ми зв\'яжемося з вами найближчим часом',
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Адреса',
      content: 'вул. Квіткова, 25, Львів, 79000',
    },
    {
      icon: Phone,
      title: 'Телефон',
      content: '+38 (050) 123-45-67',
      link: 'tel:+380501234567',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@kvitkovamriya.ua',
      link: 'mailto:info@kvitkovamriya.ua',
    },
    {
      icon: Clock,
      title: 'Графік роботи',
      content: 'Пн-Нд: 08:00 - 22:00',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Контакти
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Зв'яжіться з нами будь-яким зручним способом або залиште повідомлення
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item) => (
                  <div
                    key={item.title}
                    className="p-6 bg-card rounded-2xl border border-border hover:shadow-soft transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-rose-light">
                        <item.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h3>
                        {item.link ? (
                          <a
                            href={item.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            {item.content}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.content}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div className="aspect-video rounded-2xl overflow-hidden border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2573.0!2d24.031111!3d49.841952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x473add7c09109a57%3A0x7c6aa1c1c1c1c1c1!2z0JvRjNCy0ZbQsiwg0KPQutGA0LDRl9C90LA!5e0!3m2!1suk!2sua!4v1640000000000!5m2!1suk!2sua"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-3xl border border-border p-8 shadow-card">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                Напишіть нам
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ім'я</Label>
                    <Input
                      id="name"
                      placeholder="Ваше ім'я"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+38 (0XX) XXX-XX-XX"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Повідомлення</Label>
                  <Textarea
                    id="message"
                    placeholder="Ваше повідомлення..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                  />
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  <Send className="h-5 w-5 mr-2" />
                  Надіслати повідомлення
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactsPage;
