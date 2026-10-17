import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Copy,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Send,
  Sparkles,
} from "lucide-react";
import { profile, sectionIcons, sectionMeta } from "../data/portfolioData.js";
import { experienceData } from "../data/experience.js";
import { projects } from "../data/projects.js";
import { skills } from "../data/skills.js";
import AccessibilityControls from "./AccessibilityControls.jsx";
import SidebarNav from "./SidebarNav.jsx";

export default function PortfolioSection({
  activeSection,
  reducedMotion,
  sfxEnabled,
  isReturning,
  onReturn,
  onSelect,
  onToggleSfx,
  onToggleMotion,
}) {
  const selected = sectionMeta.find((item) => item.id === activeSection) || sectionMeta[0];
  const Icon = sectionIcons[activeSection] || sectionIcons[selected.id];
  return (
    <motion.main
      className={`portfolio-page${isReturning ? " portfolio-page--returning" : ""}`}
      initial={
        reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }
      }
      animate={
        isReturning
          ? { opacity: 0, y: 20, scale: 0.98 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{
        duration: reducedMotion ? 0.12 : isReturning ? 0.28 : 0.45,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <header className="portfolio-topbar">
        <button className="back-button" type="button" onClick={onReturn}>
          <ArrowLeft size={15} />
          <span>BACK TO OMNITRIX</span>
        </button>
        <div className="breadcrumbs">
          <span>OMNITRIX OS</span>
          <i>/</i>
          <span>PERSONAL DATABASE</span>
          <i>/</i>
          <b>{selected.name.toUpperCase()}</b>
        </div>
        <AccessibilityControls
          sfxEnabled={sfxEnabled}
          reducedMotion={reducedMotion}
          onToggleSfx={onToggleSfx}
          onToggleMotion={onToggleMotion}
          compact
        />
      </header>
      <div className="portfolio-layout">
        <aside className="portfolio-rail">
          <div className="portfolio-rail__label">NAVIGATE</div>
          <SidebarNav
            activeSection={activeSection}
            onSelect={onSelect}
            compact
          />
          <div className="portfolio-rail__status">
            <span className="live-dot" /> ALL SYSTEMS
            <br />
            OPERATIONAL
          </div>
        </aside>
        <div className="portfolio-content">
          <div className="section-heading">
            <div className="section-heading__icon">
              <Icon size={19} />
            </div>
            <div>
              <div className="eyebrow">
                FILE 0{selected.index + 1} <span>/</span> {selected.label}
              </div>
              <h1>
                {selected.name}
                <span className="heading-period">.</span>
              </h1>
            </div>
            <div className="section-heading__stamp">
              <span>OMNITRIX</span>
              <b>OS</b>
              <small>ARCHIVE FILE · 0{selected.index + 1}</small>
            </div>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeSection}
              className="section-view"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.28 }}
            >
              {activeSection === "about" && <AboutView />}
              {activeSection === "skills" && <SkillsView />}
              {activeSection === "projects" && <ProjectsView />}
              {activeSection === "experience" && <ExperienceView />}
              {activeSection === "education" && <EducationView />}
              {activeSection === "contact" && <ContactView />}
            </motion.div>
          </AnimatePresence>
          <footer className="portfolio-footer">
            <span>
              END OF FILE <b>///</b> 0{selected.index + 1}
            </span>
            <span>
              DESIGNED TO BE EXPLORED <Sparkles size={12} />
            </span>
          </footer>
        </div>
      </div>
    </motion.main>
  );
}

function AboutView() {
  return (
    <div className="about-view">
      <div className="about-hero panel-card">
        <div className="about-hero__copy">
          <span className="eyebrow">THE OPERATOR</span>
          <h2>
            Hey, I’m <span>{profile.name}.</span>
          </h2>
          <p className="role-line">{profile.role}</p>
          <p className="body-copy">{profile.intro}</p>
          <div className="location-line">
            <MapPin size={14} /> {profile.location}
          </div>
        </div>
        <div className="about-orbit-art" aria-hidden="true">
          <div className="orbit-ring orbit-ring--one" />
          <div className="orbit-ring orbit-ring--two" />
          <div className="orbit-ring orbit-ring--three" />
          <div className="orbit-core">X</div>
          <span className="orbit-dot orbit-dot--one" />
          <span className="orbit-dot orbit-dot--two" />
          <span className="orbit-dot orbit-dot--three" />
          <span className="orbit-coord">
            EARTH · SOL SYSTEM
            <br />
            PERSONAL ARCHIVE
          </span>
        </div>
        <div className="about-hero__index">
          <span>PROFILE</span>
          <b>001</b>
        </div>
      </div>
      <div className="content-grid content-grid--about">
        <section className="panel-card text-panel">
          <div className="panel-heading">
            <span>01 / A LITTLE CONTEXT</span>
            <span className="panel-plus">+</span>
          </div>
          <h3>
            Good work starts with <em>good questions.</em>
          </h3>
          <p className="body-copy">
            I like the part where a fuzzy problem starts to make sense:
            listening, exploring a few directions, then building something clear
            enough to use and solid enough to grow.
          </p>
          <p className="body-copy">
            This archive is a snapshot of what I’m learning and making. It’s
            always a work in progress, by design.
          </p>
        </section>
        <section className="panel-card principles-panel">
          <div className="panel-heading">
            <span>02 / OPERATING PRINCIPLES</span>
            <span className="panel-plus">+</span>
          </div>
          {profile.principles.map((principle, index) => (
            <div className="principle-row" key={principle}>
              <span>0{index + 1}</span>
              <b>{principle}</b>
              <ArrowUpRight size={14} />
            </div>
          ))}
        </section>
      </div>
      <div className="quote-strip">
        <span>“</span>
        <p>
          Stay curious. Make something kind.
          <br />
          <b>Leave it a little better than you found it.</b>
        </p>
        <span className="quote-strip__end">PERSONAL MOTTO · 001</span>
      </div>
    </div>
  );
}

function SkillsView() {
  return (
    <div className="skills-view">
      <div className="view-intro">
        <span className="eyebrow">CURRENT TOOLKIT</span>
        <h2>
          A versatile <em>arsenal.</em>
        </h2>
        <p className="body-copy">
          Tools, platforms, and concepts across frontend, backend, data,
          workflows, and core computing.
        </p>
      </div>
      <div className="skills-grid">
        {skills.map((group, index) => (
          <section className="panel-card skill-card" key={group.category}>
            <div className="skill-card__head">
              <span>0{index + 1}</span>
              <img className="skill-card__icon" src={group.icon} alt="" />
              <h3>{group.category}</h3>
              <span className="skill-card__count">
                {String(group.items.length).padStart(2, "0")}
              </span>
            </div>
            <div className="skill-list">
              {group.items.map((skill) => (
                <span className="skill-chip" key={skill}>
                  <i />
                  {skill}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="note-line">
        <Sparkles size={14} />
        <span>Grouped by area. The toolkit keeps evolving.</span>
      </div>
    </div>
  );
}

function ProjectsView() {
  return (
    <div className="projects-view">
      <div className="view-intro view-intro--row">
        <div>
          <span className="eyebrow">SELECTED FIELD LOGS</span>
          <h2>
            Built with <em>intent.</em>
          </h2>
          <p className="body-copy">
            A collection of software, research, and problem-solving projects.
          </p>
        </div>
        <div className="project-count">
          <b>{String(projects.length).padStart(2, "0")}</b>
          <span>
            PROJECTS
            <br />
            IN ARCHIVE
          </span>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <article
            className={`project-card project-card--${index + 1}`}
            key={project.id}
          >
            <div className="project-art" aria-hidden="true">
              <div className="project-art__grid" />
              <div className="project-art__shape project-art__shape--one" />
              <div className="project-art__shape project-art__shape--two" />
              {project.icon && (
                <img className="project-art__image" src={project.icon} alt="" />
              )}
              <span className="project-art__serial">
                0{index + 1} / {String(projects.length).padStart(2, "0")}
              </span>
              <span className="project-art__label">PROJECT FILE</span>
              <span className="project-art__wordmark">{project.title}</span>
            </div>
            <div className="project-card__body">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <Github size={14} /> SOURCE <ExternalLink size={12} />
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer">
                    LIVE PROJECT <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="project-footnote">
        <Github size={15} />
        <span>Follow the source or open a live project where available.</span>
      </div>
    </div>
  );
}

function ExperienceView() {
  return (
    <div className="experience-view">
      <div className="view-intro">
        <span className="eyebrow">CAREER TIMELINE</span>
        <h2>
          Every chapter <em>counts.</em>
        </h2>
        <p className="body-copy">
          Internships, responsibilities, and the skills built along the way.
        </p>
      </div>
      <div className="timeline">
        {experienceData.map((item, index) => (
          <article className="timeline-item" key={item.id}>
            <div className="timeline-marker">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i />
            </div>
            <div className="panel-card timeline-card">
              <div className="timeline-card__top">
                <span className="eyebrow">{item.period}</span>
                <BriefcaseBusiness size={16} />
              </div>
              <h3>{item.role}</h3>
              <div className="timeline-org">
                {item.company} · {item.location}
              </div>
              <span className="experience-type">{item.type}</span>
              <ul className="experience-description">
                {item.description.map((description) => (
                  <li key={description}>{description}</li>
                ))}
              </ul>
              <div className="tag-list">
                {item.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="experience-note">
        <span className="live-dot" />{" "}
        {String(experienceData.length).padStart(2, "0")} EXPERIENCE RECORDS
      </div>
    </div>
  );
}

function EducationView() {
  return (
    <div className="education-view">
      <div className="view-intro">
        <span className="eyebrow">FOUNDATIONS</span>
        <h2>
          Keep learning. <em>Always.</em>
        </h2>
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

function ContactView() {
  const [copied, setCopied] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }
  function sendMessage(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(
      String(form.get("subject") || "A new mission"),
    );
    const message = encodeURIComponent(
      `From: ${String(form.get("name") || "")}\n\n${String(form.get("message") || "")}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${message}`;
  }
  return (
    <div className="contact-view">
      <div className="view-intro">
        <span className="eyebrow">OPEN TRANSMISSION</span>
        <h2>
          Let’s make <em>something matter.</em>
        </h2>
        <p className="body-copy">
          Have a project, a question, or an idea you can’t stop thinking about?
          Send a signal.
        </p>
      </div>
      <div className="contact-grid">
        <section className="panel-card contact-card">
          <div className="panel-heading">
            <span>DIRECT CHANNEL</span>
            <span className="contact-signal">
              <span className="live-dot" /> ONLINE
            </span>
          </div>
          <span className="contact-icon">
            <Mail size={21} />
          </span>
          <span className="eyebrow">BEST WAY TO REACH ME</span>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <button type="button" className="copy-button" onClick={copyEmail}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "COPIED" : "COPY ADDRESS"}
          </button>
          <div className="social-links">
            {profile.socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        </section>
        <form className="panel-card contact-form" onSubmit={sendMessage}>
          <div className="panel-heading">
            <span>TRANSMIT A MESSAGE</span>
            <span className="contact-form__id">MSG_001</span>
          </div>
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              placeholder="What should I call you?"
              required
            />
          </label>
          <label>
            Subject
            <input
              name="subject"
              placeholder="A project, an idea, a hello…"
              required
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me a little about it."
              required
            />
          </label>
          <button className="send-button" type="submit">
            OPEN EMAIL APP <Send size={14} />
          </button>
          <p className="form-note">
            Your email app will open with this message ready to send.
          </p>
        </form>
      </div>
    </div>
  );
}
