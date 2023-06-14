import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  breakpoints: [320, 672, 1056, 1312, 1584],
  colors: {},

  space: {
    full: '100%',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xs8: '14rem', // 8.75rem (old measures)
    sm8: '29.6rem', // 18.5rem (old measures)
    md8: '45.2rem', // 28.25rem (old measures)
    lg8: '60.8rem', // 38rem (old measures)
    sm6: '19.2rem', // 12rem (old measures)
    md6: '40rem', // 25rem (old measures)
    space: '1.6rem',
  },

  fonts: {
    primary: 'Lato, sans-serif',
    heading: 'Lato, sans-serif',
    body: 'Lato, sans-serif',
  },
  fontSizes: {
    xxs: '1rem',
    xs: '1.2rem',
    sm: '1.4rem',
    md: '1.6rem',
    lg: '1.8rem',
    xl: '2rem',
    '2xl': '2.4rem',
    '3xl': '2.8rem',
    '4xl': '3.6rem',
    '5xl': '4.8rem',
    '6xl': '6.4rem',
  },
  fontWeights: {
    bold: 700,
    medium: 500,
    normal: 400,
    light: 300,
    thin: 100,
  },
  lineHeights: {
    normal: 'normal',
    none: '1',
    shorter: '1.25',
    short: '1.375',
    base: '1.5',
    tall: '1.625',
    taller: '2',
    tallerXL: '3',
  },
  letterSpacings: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  radii: {
    none: '0',
    sm: '0.3rem',
    base: '0.8rem',
    md: '1rem',
    lg: '1.2rem',
    xl: '2rem',
    '2xl': '4rem',
    '3xl': '8rem',
    full: '9999.0rem',
  },
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    form: 1250,
    overlay: 1300,
    modal: 1300,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
  borders: {
    none: 0,
    sm: '0.05rem solid',
    md: '0.1rem solid',
    xl: '0.2rem solid',
    xxl: '0.4rem solid',
  },
  shadows: {
    outline: 'none',
  },
});

export type Theme = typeof theme;