import { MenuItem, Testimonial } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // BBQ
  {
    id: 'b1',
    name: 'Premium Galbi',
    description: 'Iga sapi premium dengan marinasi saus rahasia Ma-Bac.',
    price: 185000,
    category: 'bbq',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    isBestSeller: true,
  },
  {
    id: 'b2',
    name: 'Samgyeopsal',
    description: 'Perut babi slice tebal (tersedia opsi halal/beef substitute untuk cabang tertentu).',
    price: 120000,
    category: 'bbq',
    imageUrl: 'https://picsum.photos/400/300?random=2',
  },
  {
    id: 'b3',
    name: 'Wagyu Saikoro',
    description: 'Potongan dadu daging Wagyu lumer di mulut.',
    price: 210000,
    category: 'bbq',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    isBestSeller: true,
  },
  // Ramen
  {
    id: 'r1',
    name: 'Spicy Kimchi Ramen',
    description: 'Mie kuah pedas dengan topping kimchi segar dan telur.',
    price: 45000,
    category: 'ramen',
    imageUrl: 'https://picsum.photos/400/300?random=4',
  },
  {
    id: 'r2',
    name: 'Cheese Bokki',
    description: 'Ramen goreng pedas dengan lelehan keju mozzarella.',
    price: 50000,
    category: 'ramen',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    isBestSeller: true,
  },
  // Sides
  {
    id: 's1',
    name: 'Tteokbokki',
    description: 'Kue beras Korea dengan saus gochujang.',
    price: 35000,
    category: 'sides',
    imageUrl: 'https://picsum.photos/400/300?random=6',
  },
  {
    id: 's2',
    name: 'Pajeon',
    description: 'Pancake daun bawang Korea yang renyah.',
    price: 30000,
    category: 'sides',
    imageUrl: 'https://picsum.photos/400/300?random=7',
  },
  // Drinks
  {
    id: 'd1',
    name: 'Corn Tea (Ocha)',
    description: 'Teh jagung khas Korea (Refill).',
    price: 15000,
    category: 'drinks',
    imageUrl: 'https://picsum.photos/400/300?random=8',
  },
  {
    id: 'd2',
    name: 'Korean Strawberry Milk',
    description: 'Susu segar dengan selai stroberi buatan sendiri.',
    price: 35000,
    category: 'drinks',
    imageUrl: 'https://picsum.photos/400/300?random=9',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Budi Santoso", comment: "Dagingnya empuk banget, sausnya otentik!", rating: 5 },
  { id: 2, name: "Siti Aminah", comment: "Tempatnya cozy buat nongkrong bareng temen.", rating: 5 },
  { id: 3, name: "Kevin Wijaya", comment: "Harganya worth it dengan kualitas rasanya.", rating: 4 },
];

export const CONTACT_INFO = {
  address: "Jl. Dr. Mansyur No. 123, Medan, Sumatera Utara",
  phone: "+62 812-3456-7890",
  whatsapp: "6281234567890", // Format for API
  instagram: "@mabac.medan",
  mapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.923472099304!2d98.6582343!3d3.5678901!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30313027b68713bb%3A0x6295353163148464!2sUniversitas%20Sumatera%20Utara!5e0!3m2!1sid!2sid!4v1625632123456!5m2!1sid!2sid" // Dummy USU location for demo
};