import type { Config } from 'tailwindcss';
import tailwindAnimate from 'tailwindcss-animate';
import { withUt } from 'uploadthing/tw';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '2000px',
      },
      colors: {
        primary: '#47A5FF',
        secondary: '#2979ff',
        grayDarkest: '#131316',
        grayDarker: '#212126',
        grayDark: '#9394A1',
      },
      fontFamily: {
        primary: ['var(--font-manrope)'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindAnimate],
};

export default withUt(config);
