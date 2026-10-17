import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { sectionIcons, sectionMeta } from '../data/portfolioData.js';
import SidebarNav from './SidebarNav.jsx';
import AboutSection from './sections/AboutSection.jsx';
import ContactSection from './sections/ContactSection.jsx';
import EducationSection from './sections/EducationSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';

const sectionViews = {
  about: AboutSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  education: EducationSection,
  contact: ContactSection,
};

export default function PortfolioSection({
  activeSection,
  isReturning,
  onReturn,
  onSelect,
}) {
  const selected = sectionMeta.find((item) => item.id === activeSection) || sectionMeta[0];
  const Icon = sectionIcons[activeSection] || sectionIcons[selected.id];
  const ActiveView = sectionViews[activeSection] || AboutSection;

  return (
    <motion.main
      className={`portfolio-page${isReturning ? ' portfolio-page--returning' : ''}`}
      initial={{ opacity: 0, y: 14, scale: 0.985 }}
      animate={isReturning ? { opacity: 0, y: 20, scale: 0.98 } : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: isReturning ? 0.28 : 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <header className="portfolio-topbar">
        <button className="back-button" type="button" onClick={onReturn}>
          <ArrowLeft size={15} />
          <span>BACK TO OMNITRIX</span>
        </button>
        <div className="breadcrumbs">
          <span>OMNITRIX OS</span><i>/</i><span>PERSONAL DATABASE</span><i>/</i><b>{selected.name.toUpperCase()}</b>
        </div>
      </header>
      <div className="portfolio-layout">
        <aside className="portfolio-rail">
          <div className="portfolio-rail__label">NAVIGATE</div>
          <SidebarNav activeSection={activeSection} onSelect={onSelect} compact />
        </aside>
        <div className="portfolio-content">
          <div className="section-heading">
            <div className="section-heading__icon"><Icon size={19} /></div>
            <div>
              <h1>{selected.name}<span className="heading-period">.</span></h1>
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSection}
              className="section-view"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
            >
              <ActiveView />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.main>
  );
}
