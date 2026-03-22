export interface HeroSlide {
  id: string;
  imageUrl: string;
  tagline: string;
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface Project {
  id: string;
  title: string;
  imageUrl: string;
  location: string;
  date: string;
  description: string;
  category: 'success' | 'progressing' | 'upcoming';
}

export interface Review {
  id: string;
  name: string;
  review: string;
  rating: number;
}

export interface ContactInfo {
  id: string;
  email: string;
  whatsapp: string;
  name: string;
}

export type OperationType = 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string;
    email?: string;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string;
    providerInfo: {
      providerId: string;
      displayName: string;
      email: string;
      photoUrl: string;
    }[];
  }
}
