/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '3rem',
        xl: '3rem',
        '2xl': '4rem',
      },
      screens: {
        sm: '401px',
        md: '692px',
        lg: '914px',
        xl: '1220px',
        '2xl': '1506px',
      },
    },
    screens: {
      sm: '425px',
      md: '768px',
      lg: '1000px',
      xl: '1280px',
      '2xl': '1920px',
      md_h: { raw: '(min-height: 1200px)' },
    },
    extend: {
      colors: {
        white: '#fff',
        noir: '#0B0B0B',
        'noir-card': '#111111',
        'noir-soft': '#181818',
        'noir-border': '#222222',
        gold: '#D4A574',
        'gold-light': '#E5C07B',
        'text-base': '#F5F5F5',
        'text-muted': '#8D8D8D',
        gray: '#686868',
        'gray-3': '#989898',
        'gray-light2': '#CBCBCB',
        'gray-text': '#6D717D',
        'gray-light': '#e6e3f0',
        options: '#949597',
      },
      boxShadow: {
        btn: '0 0px 2px 0px',
      },
      transition: {
        navToggle: 'right 2s ease-in-out',
      },
      fontSize: {
        '2rem': '2rem', //32px
        '2.5rem': '2.5rem', //40px
        '4rem': '4.065rem', //65px
        '1.375rem': '1.375rem', //22px
        '0.5rem': '0.5rem', //8px
        11: '0.6875rem', //11px
        13: '0.8123rem', //13px
        15: '0.9375rem', //15px
        17: '1.0625rem', //15px
        25: '1.5625rem', //25px
        22: '1.375rem', //22px
        32: '2rem', //32px
        35: '2.185rem', //35px
        40: '2.5rem', //40px
        50: '3.125rem', //50px
        60: '3.75rem', //60px
      },
      maxWidth: {
        'card-sm': 'calc(100% * (178 / 369))',
      },
      aspectRatio: {
        'card-sm': '178 / 244',
      },
      gridTemplateColumns: {
        'card-2': 'repeat(auto-fit, minmax(45%, 1fr))',
        'card-3': 'repeat(auto-fit, minmax(30%, 1fr))',
        'card-4': 'repeat(auto-fit, minmax(20%, 1fr))',
      },
      content: {
        burger: 'url("/src/assets/images/general/burger-mini.svg")',
        breadcrumbs: 'url("/src/assets/images/general/breadcrumb-arrow.svg")',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      opacity: {
        35: '0.35',
        41: '0.41',
        58: '0.58',
        67: '0.67',
        72: '0.72',
      },
      backgroundImage: {
        mailing: `url(/src/assets/images/films/mailing-bg.png)`,
        checkmark: 'url(/src/assets/images/general/checkmark.svg)',
        'news-gradient': 'linear-gradient(1deg, #D4A574 0%, rgba(0, 0, 0, 0.00) 100%)',
      },
      borderRadius: {
        10: '10px',
        5: '5px',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addBase, config, theme }) {
      addBase({
        body: {
          color: theme('colors.text-base'),
          fontFamily: theme('fontFamily.inter'),
          backgroundColor: theme('colors.noir'),
        },
      })

      addUtilities({
        '.bg-img': {
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        },
        '.flex-center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.flex-between': {
          display: 'flex',
          'justify-content': 'space-between',
          'align-items': 'center',
        },
        '.cols-2': {
          columns: '2',
        },
        '.item-border': {
          'border-bottom': `solid 1px ${theme('colors.noir-border')}`,
        },
        '.modal-content-transform': {
          transformBox: 'border-box',
          transition: 'transform 400ms ease-in-out',
          transformOrigin: 'left',
        },
        '.input': {
          color: theme('colors.text-base'),
          background: theme('colors.noir-soft'),
          borderRadius: theme('borderRadius.10'),
          outline: 'none',
          fontSize: theme('fontSize["15"]'),
          fontFamily: theme('fontFamily.inter'),
          border: '1px solid rgba(212, 165, 116, 0.2)',
          transition: 'border-color 200ms',

          '&:focus': {
            borderColor: 'rgba(212, 165, 116, 0.55)',
          },

          '&::placeholder': {
            color: `${theme('colors.text-muted')}`,
          },

          '@screen md': {
            fontSize: theme('fontSize["14"]'),
          },
        },
        '.input-text': {
          fontSize: theme('fontSize["15"]'),
          fontFamily: theme('fontFamily.inter'),

          '@screen md': {
            fontSize: theme('fontSize["14"]'),
          },
        },
        '.input-padding': {
          padding: '7.5px 18px',

          '@screen md': {
            padding: '7.5px 20px',
          },
        },
        '.select-padding': {
          padding: '3px 18px',

          '@screen md': {
            padding: '3px 20px',
          },
        },
        '.scroll': {
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme('colors.gold'),
          },
        },
        '.comment-editor': {
          border: theme('colors.white'),
        },
      })
    }),
  ],
}
