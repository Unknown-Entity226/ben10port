import { ArrowUpRight, MapPin } from 'lucide-react';
import { profile } from '../../data/portfolioData.js';

export default function AboutSection() {
  return (
    <div className="about-view">
      <div className="about-hero panel-card">
        <div className="about-hero__copy">
          <span className="eyebrow">THE OPERATOR</span>
          <h2>Hey, I’m <span>{profile.name}.</span></h2>
          <p className="role-line">{profile.role}</p>
          <p className="body-copy">{profile.intro}</p>
          <div className="location-line"><MapPin size={14} /> {profile.location}</div>
        </div>
        <div className="about-orbit-art" aria-hidden="true">
          <div className="orbit-ring orbit-ring--one" />
          <div className="orbit-ring orbit-ring--two" />
          <div className="orbit-ring orbit-ring--three" />
          <div className="orbit-core">X</div>
          <span className="orbit-dot orbit-dot--one" />
          <span className="orbit-dot orbit-dot--two" />
          <span className="orbit-dot orbit-dot--three" />
          <span className="orbit-coord">EARTH · SOL SYSTEM<br />PERSONAL ARCHIVE</span>
        </div>
        <div className="about-hero__index"><span>PROFILE</span><b>001</b></div>
      </div>
      <div className="content-grid content-grid--about">
        <section className="panel-card text-panel">
          <div className="panel-heading"><span>01 / A LITTLE CONTEXT</span><span className="panel-plus">+</span></div>
          <h3>Good work starts with <em>good questions.</em></h3>
          {profile.bio ? profile.bio.map((paragraph, index) => (
            <p className="body-copy" key={index}>{paragraph}</p>
          )) : <>
            <p className="body-copy">I like the part where a fuzzy problem starts to make sense: listening, exploring a few directions, then building something clear enough to use and solid enough to grow.</p>
            <p className="body-copy">This archive is a snapshot of what I’m learning and making. It’s always a work in progress, by design.</p>
          </>}
        </section>
        <section className="panel-card principles-panel">
          <div className="panel-heading"><span>02 / OPERATING PRINCIPLES</span><span className="panel-plus">+</span></div>
          {profile.principles.map((principle, index) => (
            <div className="principle-row" key={principle}><span>0{index + 1}</span><b>{principle}</b><ArrowUpRight size={14} /></div>
          ))}
        </section>
      </div>
      <div className="quote-strip"><span>“</span><p>Stay curious. Make something kind.<br /><b>Leave it a little better than you found it.</b></p><span className="quote-strip__end">PERSONAL MOTTO · 001</span></div>
    </div>
  );
}
