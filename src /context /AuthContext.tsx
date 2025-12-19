import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  signInWithPopup,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '@/lib/firebase';
import { User, Order, CustomBouquet } from '@/types';
import { toast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  savedBouquets: CustomBouquet[];
  saveBouquet: (bouquet: CustomBouquet) => void;
  removeSavedBouquet: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const saveUserToFirestore = async (firebaseUser: FirebaseUser, name?: string) => {
  const userDoc = doc(db, 'users', firebaseUser.uid);
  const userSnapshot = await getDoc(userDoc);
  
  if (!userSnapshot.exists()) {
    await setDoc(userDoc, {
      id: firebaseUser.uid,
      name: name || firebaseUser.displayName || firebaseUser.email?.split('@')[0],
      email: firebaseUser.email,
      createdAt: new Date().toISOString(),
    });
  }
  
  return {
    id: firebaseUser.uid,
    name: name || firebaseUser.displayName || firebaseUser.email?.split('@')[0] || '',
    email: firebaseUser.email || '',
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedBouquets, setSavedBouquets] = useState<CustomBouquet[]>(() => {
    const saved = localStorage.getItem('savedBouquets');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await saveUserToFirestore(firebaseUser);
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('savedBouquets', JSON.stringify(savedBouquets));
  }, [savedBouquets]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await saveUserToFirestore(result.user);
      setUser(userData);
      toast({
        title: "Ласкаво просимо!",
        description: `Ви успішно увійшли як ${userData.name}`,
      });
      return true;
    } catch (error: any) {
      let message = "Перевірте правильність введених даних";
      if (error.code === 'auth/user-not-found') {
        message = "Користувача з такою поштою не знайдено";
      } else if (error.code === 'auth/wrong-password') {
        message = "Невірний пароль";
      } else if (error.code === 'auth/invalid-email') {
        message = "Невірний формат email";
      }
      toast({
        title: "Помилка входу",
        description: message,
        variant: "destructive",
      });
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const userData = await saveUserToFirestore(result.user, name);
      setUser(userData);
      toast({
        title: "Реєстрація успішна!",
        description: `Ласкаво просимо, ${name}!`,
      });
      return true;
    } catch (error: any) {
      let message = "Будь ласка, заповніть всі поля коректно";
      if (error.code === 'auth/email-already-in-use') {
        message = "Користувач з такою поштою вже існує";
      } else if (error.code === 'auth/weak-password') {
        message = "Пароль занадто слабкий (мінімум 6 символів)";
      } else if (error.code === 'auth/invalid-email') {
        message = "Невірний формат email";
      }
      toast({
        title: "Помилка реєстрації",
        description: message,
        variant: "destructive",
      });
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = await saveUserToFirestore(result.user);
      setUser(userData);
      toast({
        title: "Ласкаво просимо!",
        description: `Ви успішно увійшли як ${userData.name}`,
      });
      return true;
    } catch (error: any) {
      let message = "Помилка входу через Google";
      if (error.code === 'auth/popup-closed-by-user') {
        message = "Вікно авторизації було закрито";
      }
      toast({
        title: "Помилка",
        description: message,
        variant: "destructive",
      });
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        title: "До побачення!",
        description: "Ви успішно вийшли з акаунту",
      });
    } catch (error) {
      toast({
        title: "Помилка",
        description: "Не вдалося вийти з акаунту",
        variant: "destructive",
      });
    }
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const saveBouquet = (bouquet: CustomBouquet) => {
    setSavedBouquets(prev => [...prev, bouquet]);
    toast({
      title: "Букет збережено!",
      description: `"${bouquet.name}" додано до ваших збережених букетів`,
    });
  };

  const removeSavedBouquet = (id: string) => {
    setSavedBouquets(prev => prev.filter(b => b.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        orders,
        addOrder,
        savedBouquets,
        saveBouquet,
        removeSavedBouquet,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
