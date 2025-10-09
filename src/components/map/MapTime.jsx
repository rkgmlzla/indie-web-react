// CurrentTimeText.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const TimeText = styled.div`
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
  padding-bottom: 16px;
`;

const CurrentTimeText = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? '오후' : '오전';
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinute = String(minutes).padStart(2, '0');

    return `${period} ${formattedHour}시 ${formattedMinute}분 이후 공연`;
  };

  return <TimeText>{formatTime(time)}</TimeText>;
};

export default CurrentTimeText;
