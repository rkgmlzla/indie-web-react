import styled from 'styled-components';

const Divider = styled.hr`
  border: none;
  height: 1px;
  margin: 0;
  background-color: ${({ theme }) => theme.colors.outlineGray};
  width: 100%;
`;

export default Divider;
