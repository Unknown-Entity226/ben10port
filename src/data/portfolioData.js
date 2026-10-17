import {
  BookOpen, BriefcaseBusiness, Code2, FolderKanban, Mail, UserRound,
} from 'lucide-react';

export const sectionMeta = [
  { id: 'about', index: 0, name: 'About', label: 'IDENTITY', summary: 'The mind behind the machine.', metric: '01', metricLabel: 'OPERATOR', accent: '#86f6c1' },
  { id: 'skills', index: 1, name: 'Skills', label: 'ARSENAL', summary: 'Tools, systems & techniques.', metric: '05', metricLabel: 'TRACKS', accent: '#70e8d0' },
  { id: 'projects', index: 2, name: 'Projects', label: 'FIELD LOGS', summary: 'Things built out in the wild.', metric: '06', metricLabel: 'BUILDS', accent: '#b5f77d' },
  { id: 'experience', index: 3, name: 'Experience', label: 'MISSIONS', summary: 'A timeline of work in motion.', metric: '02', metricLabel: 'CHAPTERS', accent: '#8de7ff' },
  { id: 'education', index: 4, name: 'Education', label: 'ORIGIN', summary: 'The foundations and the fuel.', metric: '01', metricLabel: 'MILESTONE', accent: '#b1a3ff' },
  { id: 'contact', index: 5, name: 'Contact', label: 'TRANSMISSION', summary: 'Have a good mission in mind?', metric: 'OPEN', metricLabel: 'SIGNAL', accent: '#f5d97c' },
];

export const sectionIcons = {
  about: UserRound,
  skills: Code2,
  projects: FolderKanban,
  experience: BriefcaseBusiness,
  education: BookOpen,
  contact: Mail,
};

// Example content only: replace this object with the portfolio owner's details.
export const profile = {
  name: 'Your Name',
  role: 'Your role or focus',
  location: 'Your location or timezone',
  email: 'hello@example.com',
  intro: 'I turn curious ideas into thoughtful digital experiences. I care about the details people feel: fast interfaces, clear language, and software that makes complicated things easier.',
  principles: ['Make it useful first', 'Keep the details human', 'Stay curious, ship often'],
  education: [
    { qualification: 'Your degree or qualification', institution: 'Your university or institution', period: 'YEAR — YEAR', detail: 'Add your field of study, notable coursework, awards, or certifications here.' },
  ],
  socials: [],
};

export function isSectionId(value) {
  return sectionMeta.some((section) => section.id === value);
}
