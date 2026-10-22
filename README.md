# Omnitrix OS Portfolio

An interactive, Ben 10 Omnitrix-themed personal portfolio built with React 19, Vite 6, and Framer Motion. Features a futuristic interface with a rotating hologram dial, responsive layouts, audio feedback, and rich accessibility controls.

<!-- TODO(aarav): Add preview screenshot at docs/screenshot.png -->
<!-- ![Omnitrix OS Preview](docs/screenshot.png) -->

**Live Deployment:** [https://guptaaarav-portfolio.vercel.app/](https://guptaaarav-portfolio.vercel.app/)

---

## Tech Stack

- **Core:** [React 19](https://react.dev/), [Vite 6](https://vite.dev/)
- **Animation & Motion:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Custom CSS with CSS variables and responsive design
- **Audio:** Web Audio API synth sound effects

---

## Features

- **Omnitrix Dial Navigation:** Interactive 3D carousel and SVG hologram ring with smooth rotation and sector selection.
- **Deep Hash Linking:** Direct navigation support via URL hashes (e.g. `/#about`, `/#skills`, `/#projects`, `/#experience`, `/#education`, `/#contact`).
- **Multi-Modal Controls:**
  - **Keyboard:** `←` / `→` arrows to rotate dial, `Enter` / `Space` to select, `Escape` to return or skip intro.
  - **Touch & Mouse:** Swipe gestures, wheel scrolling, and direct click/touch on dial sectors and symbols.
- **Mobile Dock:** Bottom navigation bar for handheld devices with quick-switch section dots.
- **Client-Side Contact Form:** Prepares pre-filled transmissions directly into the visitor's mail client via `mailto:`.
- **Accessibility & Motion Preferences:**
  - Full keyboard accessibility with `role="button"` semantics, ARIA attributes, and visible focus styles.
  - Respects OS `prefers-reduced-motion` settings via Framer Motion's `MotionConfig` and CSS media queries.
  - Sound effects toggle with persistent mute state in `localStorage` (defaults to muted when reduced motion is preferred).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm`

### Installation

```bash
git clone https://github.com/Unknown-Entity226/ben10port.git
cd ben10port
npm install
```

### Development

Start the local Vite development server:

```bash
npm run dev
```

### Production Build

Compile and bundle for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Project Structure & Content Management

Portfolio data is structured in modular data files under `src/data/`:

- `src/data/portfolioData.js`: Profile information (name, role, bio, education, socials) and section metadata.
- `src/data/skills.js`: Technical skills categorized across Frontend, Backend & Database, Data & AI, Tools & Workflows, and Core Concepts.
- `src/data/projects.js`: Project showcase list with descriptions, tech tags, GitHub links, and live URLs.
- `src/data/experience.js`: Work history, internships, roles, and key contributions.
