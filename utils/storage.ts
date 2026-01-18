import { GalleryItem } from '../types';

const STORAGE_KEY = 'mabac_gallery_data';

const DEFAULT_IMAGES: GalleryItem[] = [12, 13, 14, 15, 16, 17, 18, 19].map((seed, index) => ({
  id: `default-${index}`,
  url: `https://picsum.photos/600/600?random=${seed}`,
  dateAdded: Date.now(),
  caption: 'Ma-Bac Vibe'
}));

export const getGalleryImages = (): GalleryItem[] => {
  if (typeof window === 'undefined') return DEFAULT_IMAGES;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    // Initialize with defaults if empty
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_IMAGES));
    return DEFAULT_IMAGES;
  }
  
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Failed to parse gallery images", e);
    return DEFAULT_IMAGES;
  }
};

export const addGalleryImage = (url: string, caption?: string): GalleryItem[] => {
  const images = getGalleryImages();
  const newItem: GalleryItem = {
    id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    url,
    caption: caption || 'Ma-Bac Moment',
    dateAdded: Date.now()
  };
  
  // Add to the beginning of the array
  const updated = [newItem, ...images];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const removeGalleryImage = (id: string): GalleryItem[] => {
  const images = getGalleryImages();
  const updated = images.filter(img => img.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const resetGallery = (): GalleryItem[] => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_IMAGES));
  return DEFAULT_IMAGES;
};