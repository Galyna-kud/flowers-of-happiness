import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Помилка",
        description: "Введіть email адресу",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSuccess(true);
      toast({
        title: "Лист надіслано!",
        description: "Перевірте вашу електронну пошту для відновлення паролю",
      });
    } catch (error: any) {
      let message = "Не вдалося надіслати лист";
      if (error.code === 'auth/user-not-found') {
        message = "Користувача з такою поштою не знайдено";
      } else if (error.code === 'auth/invalid-email') {
        message = "Невірний формат email";
      }
      toast({
        title: "Помилка",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-secondary/20 to-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center pt-20 pb-12 px-4">
        <div className="w-full max-w-md">
          <Card className="border-border/50 shadow-elegant backdrop-blur-sm bg-card/80">
            <CardHeader className="text-center pb-2">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                {isSuccess ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <Mail className="w-8 h-8 text-primary" />
                )}
              </div>
              <CardTitle className="font-display text-2xl">
                {isSuccess ? 'Лист надіслано!' : 'Відновлення паролю'}
              </CardTitle>
              <CardDescription>
                {isSuccess 
                  ? 'Перевірте вашу електронну пошту та перейдіть за посиланням для відновлення паролю'
                  : 'Введіть email, який ви використовували при реєстрації'
                }
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-4">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Надсилаємо...' : 'Надіслати лист'}
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Не отримали лист? Перевірте папку "Спам" або спробуйте ще раз через кілька хвилин.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsSuccess(false);
                      setEmail('');
                    }}
                  >
                    Спробувати інший email
                  </Button>
                </div>
              )}

              <div className="mt-6 text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Повернутися до входу
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
