// src/pages/map/components/MapWideSelectCard.jsx
import React from 'react';
import styled from 'styled-components';
import MapWideCard from './MapWideCard';

const Wrapper = styled.div`
  width: 100%-32px;
  max-width: 100%;
  background-color: #F14F2133; 
  border-radius: 5px;
  padding: 8px;
  margin: 16px 16px 0px 16px; 
  justify-content: center;
  box-sizing: border-box;
  
  & > div {
    margin-left: 0;
    margin-right: 0;
  }
`;

const MapWideSelectCard = (props) => {
  return (
    <Wrapper>
      <MapWideCard data={props} noTopPadding />
    </Wrapper>
  );
};

export default MapWideSelectCard;
