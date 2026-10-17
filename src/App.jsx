import { AnimatePresence } from 'framer-motion';
import ActivationTransition from './components/ActivationTransition.jsx';
import IntroSequence from './components/IntroSequence.jsx';
import OmnitrixInterface from './components/OmnitrixInterface.jsx';
import PortfolioSection from './components/PortfolioSection.jsx';
import { useKeyboardNav } from './hooks/useKeyboardNav.js';
import { useOmnitrixState } from './hooks/useOmnitrixState.js';

export default function App() {
  const omnitrix = useOmnitrixState();
  useKeyboardNav({
    stage: omnitrix.stage,
    rotateDial: omnitrix.rotateDial,
    activateSection: omnitrix.activateSection,
    skipIntro: omnitrix.skipIntro,
    returnToDial: omnitrix.returnToDial,
  });
  const showingPortfolio = omnitrix.stage === 'section' || omnitrix.stage === 'returning';

  return <div className="app-shell" data-reduced-motion={omnitrix.reducedMotion}>
    <AnimatePresence mode="wait">
      {omnitrix.stage === 'intro' && <IntroSequence key="intro" reducedMotion={omnitrix.reducedMotion} onComplete={omnitrix.skipIntro} />}
      {!showingPortfolio && omnitrix.stage !== 'intro' && <OmnitrixInterface key="navigation" stage={omnitrix.stage} activeSection={omnitrix.activeSection} activeIndex={omnitrix.activeIndex} sfxEnabled={omnitrix.sfxEnabled} reducedMotion={omnitrix.reducedMotion} locked={omnitrix.isLocked} onRotate={omnitrix.rotateDial} onActivate={omnitrix.activateSection} onGoToSection={omnitrix.goToSection} onToggleSfx={omnitrix.toggleSfx} onToggleMotion={omnitrix.toggleReducedMotion} />}
      {showingPortfolio && <PortfolioSection key="portfolio" activeSection={omnitrix.activeSection} reducedMotion={omnitrix.reducedMotion} sfxEnabled={omnitrix.sfxEnabled} isReturning={omnitrix.stage === 'returning'} onReturn={omnitrix.returnToDial} onSelect={omnitrix.goToSection} onToggleSfx={omnitrix.toggleSfx} onToggleMotion={omnitrix.toggleReducedMotion} />}
    </AnimatePresence>
    <AnimatePresence>{omnitrix.stage === 'activating' && <ActivationTransition key="activation" section={omnitrix.activeSection} reducedMotion={omnitrix.reducedMotion} />}</AnimatePresence>
  </div>;
}
