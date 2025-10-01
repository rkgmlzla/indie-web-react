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
  position: fixed;
  top: 56px;
 bottom: 84px;  /* ✅ 실제 하단바 높이에 맞춰 증가 */
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  background-color: rgba(255,255,255,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 9999;
  pointer-events: all;
`;

const Message = styled.div`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.darkGray};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;
