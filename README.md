# Omnitrix Portfolio

An interactive React portfolio scaffold built with JavaScript, Vite, Framer Motion, Lucide icons, and custom CSS. The opening dial links to six portfolio sections; the dashboard also supports direct hash links such as `/#projects`.

## Run locally

```sh
npm install
npm run dev
```

## Personalize the example data

Edit `src/data/portfolioData.js` for the sample name, bio, education, and contact details. Skills, projects, and experience are maintained separately in `src/data/skills.js`, `src/data/projects.js`, and `src/data/experience.js`. The contact form prepares an email in the visitor's mail app; it does not submit to a server.

Keyboard: left/right arrows move between sections, Enter or Space opens the selected section, and Escape skips the intro or returns to the dial. Sound effects and reduced motion can be changed from the settings controls.
