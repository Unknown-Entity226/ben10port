import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects.js';

export default function ProjectsSection() {
  return (
    <div className="projects-view">
      <div className="view-intro view-intro--row">
        <div>
          <span className="eyebrow">SELECTED FIELD LOGS</span>
          <h2>Built with <em>intent.</em></h2>
          <p className="body-copy">A collection of software, research, and problem-solving projects.</p>
        </div>
        <div className="project-count">
          <b>{String(projects.length).padStart(2, '0')}</b>
          <span>PROJECTS<br />IN ARCHIVE</span>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article className={`project-card project-card--${index + 1}`} key={project.id}>
            <div className="project-art" aria-hidden="true">
              <div className="project-art__grid" />
              <div className="project-art__shape project-art__shape--one" />
              <div className="project-art__shape project-art__shape--two" />
              {project.icon && <img className="project-art__image" src={project.icon} alt="" />}
              <span className="project-art__serial">0{index + 1} / {String(projects.length).padStart(2, '0')}</span>
              <span className="project-art__label">PROJECT FILE</span>
              <span className="project-art__wordmark">{project.title}</span>
            </div>
            <div className="project-card__body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="project-links">
                {project.github && <a href={project.github} target="_blank" rel="noreferrer"><Github size={14} /> SOURCE <ExternalLink size={12} /></a>}
                {project.live && <a href={project.live} target="_blank" rel="noreferrer">LIVE PROJECT <ExternalLink size={12} /></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="project-footnote"><Github size={15} /><span>Follow the source or open a live project where available.</span></div>
    </div>
  );
}
