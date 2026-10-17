import { Sparkles } from 'lucide-react';
import { skills } from '../../data/skills.js';

export default function SkillsSection() {
  return (
    <div className="skills-view">
      <div className="view-intro">
        <span className="eyebrow">CURRENT TOOLKIT</span>
        <h2>A versatile <em>arsenal.</em></h2>
        <p className="body-copy">Tools, platforms, and concepts across frontend, backend, data, workflows, and core computing.</p>
      </div>
      <div className="skills-grid">
        {skills.map((group, index) => (
          <section className="panel-card skill-card" key={group.category}>
            <div className="skill-card__head">
              <span>0{index + 1}</span>
              <img className="skill-card__icon" src={group.icon} alt="" />
              <h3>{group.category}</h3>
              <span className="skill-card__count">{String(group.items.length).padStart(2, '0')}</span>
            </div>
            <div className="skill-list">
              {group.items.map((skill) => <span className="skill-chip" key={skill}><i />{skill}</span>)}
            </div>
          </section>
        ))}
      </div>
      <div className="note-line"><Sparkles size={14} /><span>Grouped by area. The toolkit keeps evolving.</span></div>
    </div>
  );
}
