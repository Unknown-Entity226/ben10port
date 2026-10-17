import { BriefcaseBusiness } from 'lucide-react';
import { experienceData } from '../../data/experience.js';

export default function ExperienceSection() {
  return (
    <div className="experience-view">
      <div className="view-intro">
        <span className="eyebrow">CAREER TIMELINE</span>
        <h2>Every chapter <em>counts.</em></h2>
        <p className="body-copy">Internships, responsibilities, and the skills built along the way.</p>
      </div>
      <div className="timeline">
        {experienceData.map((item, index) => (
          <article className="timeline-item" key={item.id}>
            <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
            <div className="panel-card timeline-card">
              <div className="timeline-card__top"><span className="eyebrow">{item.period}</span><BriefcaseBusiness size={16} /></div>
              <h3>{item.role}</h3>
              <div className="timeline-org">{item.company} · {item.location}</div>
              <span className="experience-type">{item.type}</span>
              <ul className="experience-description">{item.description.map((description) => <li key={description}>{description}</li>)}</ul>
              <div className="tag-list">{item.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
            </div>
          </article>
        ))}
      </div>
      <div className="experience-note"><span className="live-dot" /> {String(experienceData.length).padStart(2, '0')} EXPERIENCE RECORDS</div>
    </div>
  );
}
