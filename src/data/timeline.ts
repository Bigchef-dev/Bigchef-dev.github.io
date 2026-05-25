import { resolveAssetUrl } from './assets';

export interface TimelineEntry {
  id: number;
  year: string;
  type: 'education' | 'work';
  logo: string;
  images?: string[];
}

const rawTimelineData = [
  {
    id: 2,
    year: '2026 - 6 mois',
    type: 'work',
    logo: '/src/assets/orange.png',
    images: ['/src/assets/orange.png'],
  },
  {
    id: 1,
    year: '2024 - 2026',
    type: 'education',
    logo: '/src/assets/UNIRENNES_avatar_1.png',
    images: ['/src/assets/UNIRENNES_avatar_1.png'],
  },
  {
    id: 3,
    year: '2024 - 3 mois',
    type: 'work',
    logo: '/src/assets/digitaleo.jpg',
    images: ['/src/assets/digitaleo.jpg'],
  },
  {
    id: 4,
    year: '2021 - 2024',
    type: 'education',
    logo: '/src/assets/UNIRENNES_avatar_1.png',
    images: ['/src/assets/UNIRENNES_avatar_1.png'],
  },
  {
    id: 5,
    year: '2021 - 2024',
    type: 'work',
    logo: '/src/assets/sodiraconnect.png',
    images: ['/src/assets/sodiraconnect.png'],
  },
  {
    id: 6,
    year: '2021',
    type: 'education',
    logo: '',
  },
  {
    id: 7,
    year: '2017',
    type: 'education',
    logo: '',
  }
] satisfies TimelineEntry[];

export const timelineData: TimelineEntry[] = rawTimelineData.map((entry) => ({
  ...entry,
  logo: resolveAssetUrl(entry.logo),
  images: entry.images?.map((image) => resolveAssetUrl(image)),
}));
