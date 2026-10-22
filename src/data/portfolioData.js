import {
  BookOpen, BriefcaseBusiness, Code2, FolderKanban, Mail, UserRound,
} from 'lucide-react';
import githubLogo from '../assets/github_logo.png';
import linkedinLogo from '../assets/linkedin_logo.png';
import leetcodeIcon from '../assets/leetcodeicon.png';
import instaIcon from '../assets/insta.png';
import gmailIcon from '../assets/gmail.png';
import { projects } from './projects.js';
import { skills } from './skills.js';
import { experienceData } from './experience.js';

export const sectionMeta = [
  { id: 'about', index: 0, name: 'About', label: 'IDENTITY', summary: 'The mind behind the machine.', metric: '01', metricLabel: 'OPERATOR', accent: '#86f6c1' },
  { id: 'skills', index: 1, name: 'Skills', label: 'ARSENAL', summary: 'Tools, systems & techniques.', metric: String(skills.length).padStart(2, '0'), metricLabel: 'TRACKS', accent: '#70e8d0' },
  { id: 'projects', index: 2, name: 'Projects', label: 'FIELD LOGS', summary: 'Things built out in the wild.', metric: String(projects.length).padStart(2, '0'), metricLabel: 'BUILDS', accent: '#b5f77d' },
  { id: 'experience', index: 3, name: 'Experience', label: 'MISSIONS', summary: 'A timeline of work in motion.', metric: String(experienceData.length).padStart(2, '0'), metricLabel: 'CHAPTERS', accent: '#8de7ff' },
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

export const profile = {
  name: 'Aarav Gupta',
  role: 'Full-Stack Developer & AI Enthusiast',
  location: 'New Delhi, India',
  email: 'aaravgupta2012018@gmail.com',
  intro:
    'Full-stack developer and software engineering student focused on building scalable web applications and intelligent systems. Passionate about clean code, continuous learning, and crafting seamless user experiences.',
  bio: [
    'I am Aarav Gupta, a full-stack developer and software engineering student focused on building scalable web applications and intelligent systems. My expertise spans modern frontend frameworks, robust backend architectures, and integrating artificial intelligence to solve complex technical challenges.',
    'Beyond traditional web development, I actively engage in quantitative finance research and build interactive web-based simulations. I thrive in competitive programming environments and am driven by a passion for clean code, continuous learning, and crafting seamless user experiences.',
  ],
  principles: [
    'Build scalable & intelligent systems',
    'Clean code, continuous learning',
    'Stay curious, ship often',
  ],
  education: [
    {
      qualification:
        'B.Tech in Computer Science and Engineering - Artificial Intelligence (CSE-AI)',
      institution: 'Guru Gobind Singh Indraprastha University (GGSIPU)',
      period: '2024 — 2028',
      detail:
        'University School of Information, Communication and Technology (USICT). Specializing in artificial intelligence, full-stack systems, algorithmic engineering, and data architectures.',
    },
  ],
  socials: [
    {
      label: 'GitHub',
      href: 'https://github.com/Unknown-Entity226',
      icon: githubLogo,
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/aarav-gupta-3402bb2b4/',
      icon: linkedinLogo,
    },
    {
      label: 'LeetCode',
      href: 'https://leetcode.com/u/unknown-entity226/',
      icon: leetcodeIcon,
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/_aaravv._.guptaa_/',
      icon: instaIcon,
    },
    {
      label: 'Gmail',
      href: 'mailto:aaravgupta2012018@gmail.com',
      icon: gmailIcon,
    },
  ],
  emailIcon: gmailIcon,
};

export { gmailIcon };

export function isSectionId(value) {
  return sectionMeta.some((section) => section.id === value);
}
