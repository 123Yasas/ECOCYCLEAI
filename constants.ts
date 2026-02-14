
import { UserBadge } from './types';

export const USER_THEME = {
  primary: 'bg-green-500',
  secondary: 'bg-emerald-400',
  accent: 'bg-yellow-400',
  text: 'text-green-900',
  gradient: 'eco-gradient'
};

export const SELLER_THEME = {
  primary: 'bg-purple-600',
  secondary: 'bg-pink-500',
  accent: 'bg-orange-400',
  text: 'text-purple-900',
  gradient: 'maker-gradient'
};

export const INITIAL_BADGES: UserBadge[] = [
  { id: '1', name: 'Eco Starter', icon: '🌱', color: 'bg-green-100' },
  { id: '2', name: 'Master Upcycler', icon: '🎨', color: 'bg-purple-100' },
  { id: '3', name: 'Waste Warrior', icon: '⚔️', color: 'bg-blue-100' }
];

export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'Bottle Lampshade',
    description: 'A beautiful handcrafted lampshade made from recycled PET bottles.',
    price: 25,
    imageUrl: 'https://picsum.photos/seed/lamp/400/300',
    sellerName: 'CreativeCathy'
  },
  {
    id: 'p2',
    name: 'Upcycled Planter Set',
    description: 'Colorful planters perfect for indoor succulents.',
    price: 15,
    imageUrl: 'https://picsum.photos/seed/planter/400/300',
    sellerName: 'GreenThumbs'
  }
];
