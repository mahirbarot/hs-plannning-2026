export interface HeroSlide {
  _id: string;
  image: any;
  tagline: string;
  order: number;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  image: any;
  location: string;
  date: string;
  description: string;
  category: 'success' | 'progressing' | 'upcoming';
}

export interface Review {
  _id: string;
  name: string;
  review: string;
  rating: number;
}

export interface ContactInfo {
  _id: string;
  email: string;
  whatsapp: string;
  name: string;
}
