// Divider.jsx
import styled from 'styled-components';

const DividerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 1px;
  margin-top: ${({ mt }) => mt || '0px'};
  margin-bottom: ${({ mb }) => mb || '0px'};
`;

const DividerLine = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;  /* 진짜 브라우저 전체 넓이 */
  height: 1px;
  background-color: ${({ theme }) => theme.colors.outlineGray || '#ccc'};
`;

function Divider({ mt, mb }) {
  return (
    <DividerWrapper mt={mt} mb={mb}>
      <DividerLine />
    </DividerWrapper>
  );
}

export default Divider;
