// ✅ src/components/common/NotifyButton.js
import styled from 'styled-components';
import NotifyOnIcon from '../../assets/icons/icon_notify_on.svg';
import NotifyOffIcon from '../../assets/icons/icon_notify_off.svg';

export default function NotifyButton({ isNotified, onClick, label = '알림' }) {
  return (
    <Button $isNotified={isNotified} onClick={onClick}>
      {label}
      <NotifyIcon $isNotified={isNotified} />
    </Button>
  );
}

// ✅ styled-components에서는 DOM에 전달되지 않도록 $ 접두어 사용
const Button = styled.button`
  display: inline-flex;
  align-items: center;
  height: 1.25rem;
  width: fit-content;
  padding: 12px 8px;
  padding-right: ${({ $isNotified }) => ($isNotified ? '6px' : '8px' )};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  color: ${({ $isNotified, theme }) =>
    $isNotified ? theme.colors.darkGray : theme.colors.lightGray};
  border: 1.2px solid
    ${({ $isNotified, theme }) =>
      $isNotified ? theme.colors.darkGray : theme.colors.lightGray};
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.bgWhite};
  cursor: pointer;
  gap: 4px;
`;

const NotifyIcon = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: ${({ $isNotified }) =>
    $isNotified ? `url(${NotifyOnIcon})` : `url(${NotifyOffIcon})`};
  background-size: 100% 100%;
  margin-top: ${({ $isNotified }) => ($isNotified ? '3.5px' : '0')};
  margin-left: ${({ $isNotified }) => ($isNotified ? '1.8px' : '0')};
`;
