export interface TimelineEntry {
  id: number;
  year: string;
  /** Translation key for the title (e.g. 'timeline.entries.1.title') */
  titleKey: string;
  /** Translation key for the company (e.g. 'timeline.entries.1.company') */
  companyKey: string;
  /** Translation key for the description (e.g. 'timeline.entries.1.description') */
  descriptionKey: string;
  type: 'education' | 'work';
  logo: string;
}

export const timelineData: TimelineEntry[] = [
  {
    id: 1,
    year: '2024 - 2026',
    titleKey: 'timeline.entries.1.title',
    companyKey: 'timeline.entries.1.company',
    descriptionKey: 'timeline.entries.1.description',
    type: 'education',
    logo: 'https://logo.clearbit.com/cmu.edu',
  },
  {
    id: 2,
    year: '2022 - 2024',
    titleKey: 'timeline.entries.2.title',
    companyKey: 'timeline.entries.2.company',
    descriptionKey: 'timeline.entries.2.description',
    type: 'work',
    logo: 'https://logo.clearbit.com/techcorp.com',
  },
  {
    id: 3,
    year: '2020 - 2022',
    titleKey: 'timeline.entries.3.title',
    companyKey: 'timeline.entries.3.company',
    descriptionKey: 'timeline.entries.3.description',
    type: 'education',
    logo: 'https://logo.clearbit.com/univ-rennes.fr',
  },
  {
    id: 4,
    year: '2019 - 2020',
    titleKey: 'timeline.entries.4.title',
    companyKey: 'timeline.entries.4.company',
    descriptionKey: 'timeline.entries.4.description',
    type: 'work',
    logo: 'https://logo.clearbit.com/startupai.io',
  },
];
