import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
    './utils/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sf-accent': '#8A2EFF',
        'sf-cyan': '#00D3FF',
        'sf-bg': '#F8F9FB',
        'sf-text': '#1C1C1E',
        'sf-muted': '#9CA3AF',
        'sf-bg-dark': '#0F0F1A',
      },
      borderRadius: {
        xl: '20px',
      },
      boxShadow: {
        soft: '0 12px 36px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
