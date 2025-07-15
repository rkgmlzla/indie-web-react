// src/components/layout/Layout.js
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
`;

function Layout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

export default Layout;
