// components/common/NotifyButton.js
import styled from 'styled-components';
import NotifyOnIcon from '../../assets/icons/icon_notify_on.svg';
import NotifyOffIcon from '../../assets/icons/icon_notify_off.svg';

export default function NotifyButton({ isNotified, onClick, label = '알림' }) {
  return (
    <Button isNotified={isNotified} onClick={onClick}>
      {label}
      <NotifyIcon isNotified={isNotified} />
    </Button>
  );
}

const Button = styled.button`
    display: inline-flex;
    align-items: center;
    height: 1.25rem;
    width: fit-content;
    padding: 0.75rem 0.5rem;
    font-size: ${({ theme }) => theme.fontSizes.xs};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    color: ${({ isNotified, theme }) =>
        isNotified ? theme.colors.darkGray : theme.colors.outlineGray};
    border: 1.5px solid
        ${({ isNotified, theme }) =>
        isNotified ? theme.colors.darkGray : theme.colors.outlineGray};
    border-radius: 1.5rem;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    cursor: pointer;
    gap: 0.25rem;
`;

const NotifyIcon = styled.span`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  background-image: ${({ isNotified }) =>
    isNotified ? `url(${NotifyOnIcon})` : `url(${NotifyOffIcon})`};
  background-size: 100% 100%;
`;
