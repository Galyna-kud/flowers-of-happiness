import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Головна' },
    { href: '/catalog', label: 'Каталог' },
    { href: '/promotions', label: 'Акції' },
    { href: '/custom-bouquet', label: 'Конструктор' },
    { href: '/about', label: 'Про нас' },
    { href: '/contacts', label: 'Контакти' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-lg border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl">🌸</span>
            <span className="font-display text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
              Квіткова Мрія
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">

            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-scale-in">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            <Link to={isAuthenticated ? '/profile' : '/login'}>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-lg border-b border-border/50 shadow-lg transition-all duration-300 overflow-hidden",
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-lg font-medium transition-all duration-300",
                isActive(link.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-border/50 mt-2">
            <Link to={isAuthenticated ? '/profile' : '/login'} className="flex-1">
              <Button variant="outline" className="w-full">
                <User className="h-4 w-4 mr-2" />
                {isAuthenticated ? user?.name : 'Увійти'}
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
