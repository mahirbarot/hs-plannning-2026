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
