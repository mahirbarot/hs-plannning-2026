import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID;

export const isSanityConfigured = !!(projectId && projectId !== 'placeholder' && projectId !== '');

export const client = createClient({
  projectId: isSanityConfigured ? projectId : 'placeholder',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!isSanityConfigured || !source) {
    return {
      url: () => `https://picsum.photos/seed/${Math.random()}/1920/1080`
    };
  }
  return builder.image(source);
}
