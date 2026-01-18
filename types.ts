export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'bbq' | 'ramen' | 'sides' | 'drinks';
  imageUrl: string;
  isBestSeller?: boolean;
}

export interface ReservationData {
  name: string;
  phone: string;
  date: string;
  time: string;
  pax: number;
  notes?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  dateAdded: number;
}