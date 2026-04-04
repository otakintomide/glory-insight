/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        glory: {
          void: 'var(--glory-void)',
          cosmos: 'var(--glory-cosmos)',
          navy: 'var(--glory-navy)',
          panel: 'var(--glory-panel)',
          border: 'var(--glory-border)',
          gold: 'var(--glory-gold)',
          'gold-deep': 'var(--glory-gold-deep)',
          text: 'var(--glory-text)',
          muted: 'var(--glory-text-muted)',
        },
      },
      boxShadow: {
        'glory-panel': 'var(--glory-shadow-panel)',
        'glory-gold': 'var(--glory-shadow-gold)',
        'glory-gold-lg': 'var(--glory-shadow-gold-lg)',
      },
      keyframes: {
        'live-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'live-pulse': 'live-pulse 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
