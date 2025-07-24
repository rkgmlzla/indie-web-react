// MapGrid.jsx
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
  width: 30%;  // 간격 조정
  display: flex;
  justify-content: center;
  margin: 0 8px;
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
  border: ${({ isSelected }) =>
    isSelected ? '1px solid rgba(241, 79, 33, 0.8)' : 'none'};
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

const MapGrid = ({ data = [] }) => {
  const rows = [];
  const [selectedCardId, setSelectedCardId] = useState(null);

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
        const hasSelected = rowItems.some(item => item?.id === selectedCardId);
        const selectedItem = rowItems.find(item => item?.id === selectedCardId);

        return (
          <motion.div layout key={rowIndex}>
            <Row>
              {rowItems.map((item, colIndex) => (
                <CardContainer key={colIndex}>
                  {item && (
                    <MapCard
                      poster={item.poster}
                      venue={item.venue}
                      time={item.time}
                      onClick={() =>
                        setSelectedCardId(prevId =>
                          prevId === item.id ? null : item.id
                        )
                      }
                      isSelected={item.id === selectedCardId}
                    />
                  )}
                </CardContainer>
              ))}
            </Row>

            <AnimatePresence initial={false}>
              {hasSelected && selectedItem && (
                <motion.div
                  key={selectedItem.id}
                  layout
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.43, 0.13, 0.23, 0.96], 
                  }}
                  style={{ overflow: 'hidden' }}
                >
                  <MapWideSelectCard
                    title={selectedItem.title}
                    time={selectedItem.time}
                    name={selectedItem.venue}
                    address={selectedItem.address}
                    poster={selectedItem.poster}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </Container>
  );
};

const MapCard = ({ poster, venue, time, onClick, isSelected }) => {
  return (
    <CardWrapper onClick={onClick} isSelected={isSelected}>
      <Poster src={poster} alt={venue} />
      <Venue>{venue}</Venue>
      <Time>{time}</Time>
    </CardWrapper>
  );
};

export default MapGrid;
