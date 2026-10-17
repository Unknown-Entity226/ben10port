export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: { cosmic: '#030806', holo: '#8cf5bd', mint: '#e8f7ee', muted: '#80968a' },
      fontFamily: { display: ['Space Grotesk', 'sans-serif'], mono: ['DM Mono', 'monospace'] },
      boxShadow: { holo: '0 0 28px rgba(140,245,189,.25)' },
    },
  },
  plugins: [],
};
