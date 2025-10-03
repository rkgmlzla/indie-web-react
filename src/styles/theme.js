// src/styles/theme.js

export const theme = {
  colors: {
    // 기본 색상
    black: '#1C1C1E',
    darkblack: '#2F2F2F',
    white: '#FAFAFA',
    red: '#FF3B30',
    bgWhite: '#FFFFFF',

    // 회색 계열
    darkGray: '#4B4B4B',
    midGray: '#808080',
    lightGray: '#B0B0B0',
    outlineGray: '#E4E4E4',
    popupGray: '#edededff',
    stampGray: '#6a6a6a',

    // 테마 색상
    themeOrange: '#F14F21',
    themeOrangeAlpha: '#F14F214D', // alpha 포함
    themeGreen: '#3C9C68',
    themePink: '#eb72a0ff',

    // 텍스트 계열
    textPrimary: '#FF1C1C1E',
    textHint: '#FFB0B0B0',
    textRed: '#9A1616',
 
    //홈 색//캘린더 색
    maybethemeOrange: '#3C9C68', // 앞으로 주황색은 이 값으로!
    gray600: '#4B4B4B',          // 공연장 이름 등
    gray400: '#B0B0B0',          // NEW 업로드 공연 카드의 장소/날짜 등


  },

  // 폰트 크기/굵기, 여백 등
  fontSizes: {
    xxs: '0.625rem',  // 10px
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    md: '1.125rem',   // 18px
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
