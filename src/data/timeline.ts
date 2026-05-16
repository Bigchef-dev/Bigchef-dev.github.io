export interface TimelineEntry {
  id: number;
  year: string;
  type: 'education' | 'work';
  logo: string;
  images?: string[];
}

export const timelineData: TimelineEntry[] = [
  {
    id: 1,
    year: '2024 - 2026',
    type: 'education',
    logo: '/src/assets/UNIRENNES_avatar_1.png',
    images: ['/src/assets/UNIRENNES_avatar_1.png'],
  },
  {
    id: 2,
    year: '2026 - 6 mois',
    type: 'work',
    logo: '/src/assets/orange.png',
    images: ['/src/assets/orange.png'],
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
    logo: 'https://logo.clearbit.com/startupai.io',
  }
];
