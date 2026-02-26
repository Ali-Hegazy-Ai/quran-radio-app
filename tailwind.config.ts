import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: '#0A1628', card: '#0F1D32', hover: '#142640' },
        accent: { DEFAULT: '#D4A853', muted: '#B8923F', soft: 'rgba(212,168,83,0.08)' },
        emerald: { DEFAULT: '#2D8B6F', dark: '#1F6B54' },
        live: '#DC3545',
        text: { primary: '#E8E4DD', secondary: '#9CA8B8', muted: '#5E6E82' },
        border: { DEFAULT: '#1C2D45', subtle: '#15243A' },
      },
      fontFamily: { cairo: ['"Cairo"', '"Noto Naskh Arabic"', '"Segoe UI"', 'Tahoma', 'sans-serif'] },
      borderRadius: { card: '20px', panel: '14px' },
      maxWidth: { card: '460px' },
    },
  },
  plugins: [],
};
export default config;
