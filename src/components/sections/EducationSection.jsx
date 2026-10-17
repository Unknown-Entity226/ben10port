import { Sparkles } from "lucide-react";
import { profile } from "../../data/portfolioData.js";

export default function EducationSection() {
  return (
    <div className="education-view">
      <div className="view-intro">
        <span className="eyebrow">FOUNDATIONS</span>
        <h2>Keep learning. <em>Always.</em></h2>
        <p className="body-copy">
          Formal study, side quests, and everything learned by making things.
        </p>
      </div>
      <div className="education-card panel-card">
        <div className="education-card__top">
          <span className="education-symbol">✳</span>
          <span className="eyebrow">ACADEMIC RECORD</span>
          <span className="education-card__number">01</span>
        </div>
        {profile.education.map((item) => (
          <div className="education-record" key={item.qualification}>
            <span className="eyebrow">{item.period}</span>
            <h3>{item.qualification}</h3>
            <h4>{item.institution}</h4>
            <p>{item.detail}</p>
          </div>
        ))}
        <div className="education-card__footer">
          <span>LEARNING STATUS</span>
          <b>
            <span className="live-dot" /> IN PROGRESS
          </b>
        </div>
      </div>
      <div className="learning-note">
        <Sparkles size={16} />
        <p>
          <b>Learning never really ends.</b>
          <br />
          There’s always a new tool, idea, or perspective worth exploring.
        </p>
      </div>
    </div>
  );
}
