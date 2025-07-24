import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

/*
const ScrollableContainer = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ScrollableContent>{children}</ScrollableContent>
    </>
  );
};

export default ScrollableContainer;

// ✅ 스크롤 컴포넌트
const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  scrollbar-gutter: stable both-edges;
  box-sizing: border-box;

  margin-right: -8px; 
  padding-right: 8px; 

  position: relative;
  z-index: 0;
`;

const GlobalStyle = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(0, 0, 0, 0) transparent;
  }
`;
*/

const ScrollableContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* 스크롤바 숨기기 (웹킷 브라우저) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Firefox용 */
  scrollbar-width: none;

  /* IE, Edge 용 (필요하면 추가) */
  -ms-overflow-style: none;

  box-sizing: border-box;
`;

export default ScrollableContainer;