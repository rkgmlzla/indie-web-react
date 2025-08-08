import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import MapWideSelectCard from './MapWideSelectCard';

const Container = styled.div`
  width: 100%;
  position: relative;
  z-index: 1;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const CardContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  margin: 0 8px;
  flex-direction: column;
`;

const CardWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3 / 4;
  display: flex;
  flex-direction: column;
  padding: 8px;
  border-radius: 13px;
  cursor: pointer;
  box-sizing: border-box;
  border: ${({ $isSelected }) =>
    $isSelected ? '1px solid rgba(241, 79, 33, 0.8)' : 'none'};
  flex-shrink: 0;
`;

const Poster = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 5px;
  object-fit: cover;
`;

const Venue = styled.div`
  margin-top: 6px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: ${({ theme }) => theme.colors.black};
  line-height: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Time = styled.div`
  margin-top: 2px;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xxs};
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const formatOnlyTime = (timeStr) => {
  if (!timeStr) return '-';
  const [hourStr, minuteStr = '00'] = timeStr.split(':');
  const hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const period = hour >= 12 ? '오후' : '오전';
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
  return minute === 0
    ? `${period} ${formattedHour}시`
    : `${period} ${formattedHour}시 ${minute}분`;
};

const formatKoreanDateTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  if (isNaN(date)) return '시간 정보 없음';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = date.getHours();
  const min = String(date.getMinutes()).padStart(2, '0');
  const period = h >= 12 ? '오후' : '오전';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${y}.${m}.${d} ${period} ${hour}:${min}`;
};

const MapGrid = ({ data = [], onSelectVenue }) => {
  const [selectedCardId, setSelectedCardId] = useState(null);

  const rows = [];
  for (let i = 0; i < data.length; i += 3) {
    const slice = data.slice(i, i + 3);
    while (slice.length < 3) {
      slice.push(null);
    }
    rows.push(slice);
  }

  return (
    <Container>
      {rows.map((rowItems, rowIndex) => {
        const selectedItem = data.find(
          (item) => item?.venue_id === selectedCardId
        );

        const isSelectedInThisRow = rowItems.some(
          (item) => item?.venue_id === selectedCardId
        );

        return (
          <motion.div layout key={rowIndex}>
            <Row>
              {rowItems.map((item, colIndex) => {
                if (!item) return <CardContainer key={colIndex} />;

                const firstUpcoming = item.upcomingPerformance?.[0];

                const isSelected = item.venue_id === selectedCardId;
                return (
                  <CardContainer key={colIndex}>
                    <MapCard
                      poster={item.image_url}
                      venue={item.name}
                      time={
                        firstUpcoming
                          ? formatOnlyTime(firstUpcoming.time)
                          : '예정 공연 없음'
                      }
                      onClick={() => {
                        setSelectedCardId((prevId) =>
                          prevId === item.venue_id ? null : item.venue_id
                        );
                        onSelectVenue?.(item);
                      }}
                      isSelected={isSelected}
                    />
                  </CardContainer>
                );
              })}
            </Row>

            <AnimatePresence initial={false}>
              {isSelectedInThisRow &&
                selectedItem &&
                (() => {
                  const firstUpcoming =
                    selectedItem.upcomingPerformance?.[0] ?? null;

                  return (
                    <motion.div
                      key={`wide-${selectedItem.venue_id}`}
                      layout
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{
                        duration: 0.4,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                      style={{
                        overflow: 'hidden',
                        width: '100%',
                        padding: '0 8px',
                        marginTop: '12px',
                      }}>
                      <MapWideSelectCard
                        title={firstUpcoming?.title ?? '공연 없음'}
                        time={
                          firstUpcoming?.date
                            ? formatKoreanDateTime(
                                `${firstUpcoming.date}T${
                                  firstUpcoming.time ?? ''
                                }`
                              )
                            : formatOnlyTime(firstUpcoming?.time)
                        }
                        name={selectedItem.name}
                        address={
                          firstUpcoming?.address ?? selectedItem.address ?? '-'
                        }
                        poster={
                          firstUpcoming?.image_url ?? selectedItem.image_url
                        }
                        upcomingPerformance={
                          firstUpcoming ? [firstUpcoming] : []
                        }
                        venue_id={selectedItem.venue_id}
                      />
                    </motion.div>
                  );
                })()}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </Container>
  );
};

const MapCard = ({ poster, venue, time, onClick, isSelected }) => {
  return (
    <CardWrapper onClick={onClick} $isSelected={isSelected}>
      <Poster src={poster} alt={venue} />
      <Venue>{venue}</Venue>
      <Time>{time}</Time>
    </CardWrapper>
  );
};

export default MapGrid;
