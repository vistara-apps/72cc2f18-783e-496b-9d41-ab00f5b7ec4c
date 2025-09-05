/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 14%, 95%)',
        accent: 'hsl(160, 70%, 45%)',
        primary: 'hsl(210, 100%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 12%, 15%)',
        'text-secondary': 'hsl(220, 12%, 40%)',
      },
      borderRadius: {
        'lg': '16px',
        'md': '10px',
        'sm': '6px',
        'full': '9999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 10%, 50%, 0.1)',
        'modal': '0 8px 24px hsla(220, 10%, 50%, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'recording': 'pulse 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
