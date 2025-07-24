// components/modals/SortModal.js
import styled from 'styled-components';
import ModalWrapper from './ModalWrapper';
import OptionButton from '../common/OptionButton';

const options = ['최근등록순', '공연임박순', '인기많은순'];

export default function SortModal({ selected, onSelect, onClose, ...props }) {
    return (
        <ModalWrapper onClick={(e) => e.stopPropagation()} {...props}>
        <Title>정렬 선택</Title>
        <OptionRow>
            {options.map((opt) => (
                <OptionButton
                    key={opt}
                    label={opt}
                    isSelected={selected === opt}
                    onClick={() => {
                        onSelect(opt);
                        onClose();
                    }}
                />
            ))}
        </OptionRow>
        </ModalWrapper>
    );
}

const Title = styled.div`
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.black};
    margin-bottom: 1rem;
`;

const OptionRow = styled.div`
  display: flex;
  justify-content: space-between;
`;