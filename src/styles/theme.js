// src/styles/theme.js

export const theme = {
  colors: {
    // 기본 색상
    black: '#1C1C1E',
    white: '#FAFAFA',
    red: '#FF3B30',
    bgWhite: '#FFFFFF',

    // 회색 계열
    darkGray: '#4B4B4B',
    lightGray: '#B0B0B0',
    outlineGray: '#E4E4E4',

    // 테마 색상
    themeOrange: '#F14F21',
    themeOrangeAlpha: '#F14F214D', // alpha 포함

    // 텍스트 계열
    textPrimary: '#FF1C1C1E',
    textHint: '#FFB0B0B0',
    textRed: '#9A1616',
  },

  // 폰트 크기/굵기, 여백 등
  fontSizes: {
    xxs: '0.625rem',  // 10px
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.25rem',    // 20px
    xl: '1.5rem',     // 24px
  },

  fontWeights: {
    thin: 100,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },

  layout: {
    maxWidth: '480px',  // 반응형 최대 폭
  },
};
