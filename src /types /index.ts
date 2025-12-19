export interface Bouquet {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  flowers: string[];
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
}

export interface CartItem {
  bouquet: Bouquet;
  quantity: number;
}

export interface CustomBouquet {
  id: string;
  name: string;
  flowers: CustomFlower[];
  totalPrice: number;
  createdAt: Date;
}

export interface CustomFlower {
  id: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'delivered' | 'cancelled';
  createdAt: Date;
  deliveryAddress: string;
  deliveryDate: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: number;
  image: string;
  validUntil: Date;
  code: string;
}
