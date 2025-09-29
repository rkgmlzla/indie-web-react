// src/components/stamp/StampLogin.jsx
import React from 'react';
import styled from 'styled-components';

export default function StampLogin() {
  return (
    <Overlay>
      <Message>로그인 후 이용 가능합니다.</Message>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: absolute;
  top: 56px;
  left: 0;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: calc(100vh - 56px - 84px); /* 헤더 + 하단바 제외 */
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: rgba(255,255,255,0.5)
`;

const Message = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
