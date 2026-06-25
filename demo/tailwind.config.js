/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#da291c',
          active: '#b01e0a',
          hover: '#9d2211',
        },
        ink: '#ffffff',
        body: {
          DEFAULT: '#969696',
          strong: '#ffffff',
          'on-light': '#181818',
        },
        muted: {
          DEFAULT: '#666666',
          soft: '#8f8f8f',
        },
        hairline: {
          DEFAULT: '#303030',
          'on-light': '#d2d2d2',
          soft: '#ebebeb',
        },
        canvas: {
          DEFAULT: '#181818',
          elevated: '#303030',
          light: '#ffffff',
        },
        surface: {
          card: '#303030',
          'soft-light': '#f7f7f7',
          'strong-light': '#ebebeb',
        },
        'on-primary': '#ffffff',
        'on-dark': '#ffffff',
        'on-light': '#181818',
        accent: {
          'yellow-hypersail': '#fff200',
          yellow: '#f6e500',
        },
        semantic: {
          info: '#4c98b9',
          success: '#03904a',
          warning: '#f13a2c',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
      },
      spacing: {
        xxxs: '4px',
        xxs: '8px',
        xs: '16px',
        sm: '24px',
        md: '32px',
        lg: '48px',
        xl: '64px',
        xxl: '96px',
        super: '128px',
      },
      borderRadius: {
        none: '0px',
        xs: '2px',
        sm: '4px',
        md: '6px',
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      fontSize: {
        'display-mega': ['80px', { lineHeight: '1.05', letterSpacing: '-1.6px', fontWeight: '500' }],
        'display-xl': ['56px', { lineHeight: '1.1', letterSpacing: '-1.12px', fontWeight: '500' }],
        'display-lg': ['36px', { lineHeight: '1.2', letterSpacing: '-0.36px', fontWeight: '500' }],
        'display-md': ['26px', { lineHeight: '1.5', letterSpacing: '0.195px', fontWeight: '500' }],
        'title-md': ['18px', { lineHeight: '1.2', letterSpacing: '0', fontWeight: '700' }],
        'title-sm': ['16px', { lineHeight: '1.4', letterSpacing: '0.08px', fontWeight: '500' }],
        'body-md': ['14px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }],
        'caption-uppercase': ['11px', { lineHeight: '1.4', letterSpacing: '1.1px', fontWeight: '600' }],
        'button': ['14px', { lineHeight: '1.0', letterSpacing: '1.4px', fontWeight: '700' }],
        'nav-link': ['13px', { lineHeight: '1.4', letterSpacing: '0.65px', fontWeight: '600' }],
        'number-display': ['80px', { lineHeight: '1.0', letterSpacing: '-1.6px', fontWeight: '700' }],
      }
    },
  },
  plugins: [],
}
