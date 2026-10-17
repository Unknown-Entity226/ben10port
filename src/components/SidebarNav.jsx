import { sectionIcons, sectionMeta } from "../data/portfolioData.js";

export default function SidebarNav({
  activeSection,
  onSelect,
  compact = false,
}) {
  return (
    <nav
      className={`section-nav${compact ? " section-nav--compact" : ""}`}
      aria-label="Portfolio sections"
    >
      {sectionMeta.map((section) => {
        const Icon = sectionIcons[section.id];
        return (
          <button
            key={section.id}
            type="button"
            className={`section-nav__item${activeSection === section.id ? " is-active" : ""}`}
            onClick={() => onSelect(section.id)}
            aria-current={activeSection === section.id ? "page" : undefined}
            title={section.name}
          >
            <span className="section-nav__icon">
              <Icon size={17} strokeWidth={1.7} />
            </span>
            <span>{section.name}</span>
            {activeSection === section.id && <i aria-hidden="true" />}
          </button>
        );
      })}
    </nav>
  );
}
