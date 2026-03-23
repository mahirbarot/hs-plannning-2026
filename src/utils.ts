import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_SERVICES = [
  { title: 'Consultation site visit', description: 'Expert site assessment and initial consultation.' },
  { title: 'Planning permission', description: 'Full planning application management and submission.' },
  { title: 'Design and calculation', description: 'Structural design and technical calculations.' },
  { title: 'Building regulation submission', description: 'Ensuring compliance with all building regulations.' },
  { title: 'Estimating and costing', description: 'Detailed project estimation and cost analysis.' },
  { title: 'Construction', description: 'Professional construction and project oversight.' },
  { title: 'Party Wall agreement', description: 'Management of party wall notices and awards.' },
  { title: 'Thames Water drawings and application', description: 'Technical drawings and water authority applications.' },
];

export const DEFAULT_HERO = [
  { _id: '1', tagline: 'Visionary architecture for modern living.', order: 1, image: null },
  { _id: '2', tagline: 'Transforming spaces into masterpieces.', order: 2, image: null },
];

export const DEFAULT_PROJECTS = [
  { _id: '1', title: 'Modern Villa', location: 'Pinner', date: '2023', category: 'success', description: 'A stunning modern villa design.', image: null },
  { _id: '2', title: 'Urban Loft', location: 'London', date: '2022', category: 'progressing', description: 'Industrial loft conversion.', image: null },
  { _id: '3', title: 'Eco Home', location: 'Harrow', date: '2024', category: 'upcoming', description: 'Sustainable living space.', image: null },
];

export const DEFAULT_REVIEWS = [
  { _id: '1', name: 'John Smith', review: 'Exceptional service and visionary design.', rating: 5 },
  { _id: '2', name: 'Sarah Jones', review: 'They made the planning process so easy.', rating: 5 },
  { _id: '3', name: 'Michael Brown', review: 'Highly professional and creative team.', rating: 5 },
];
