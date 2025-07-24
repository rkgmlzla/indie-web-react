// components/modals/ModalWrapper.js
import styled from 'styled-components';

const ModalWrapper = styled.div`
    background: ${({ theme }) => theme.colors.bgWhite};
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    width: 100%;
    padding: 1.5rem;
    box-sizing: border-box;

    @media (min-width: ${({ theme }) => theme.layout.maxWidth}) {
        width: ${({ theme }) => theme.layout.maxWidth}; 
`;

export default ModalWrapper;
