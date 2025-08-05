// MapPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import ScrollableContainer from '../../components/common/ScrollableContainer';
import MapView from './components/MapView';
import MapTime from './components/MapTime';
import MapGrid from './components/MapGrid';
import styled from 'styled-components';
import MapWideCard from './components/MapWideCard';
import axios from 'axios';

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapPage = () => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    // 사용자의 현재 위치를 기준으로 공연장 조회 (기본 반경 3km)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get('http://localhost:8000/nearby/venue', {
            params: {
              lat: latitude,
              lng: longitude,
              radius: 3,
            },
          });
          setVenues(res.data);
        } catch (error) {
          console.error('🎯 근처 공연장 불러오기 실패:', error);
        }
      },
      (err) => {
        console.error('❌ 위치 정보 가져오기 실패:', err);
      }
    );
  }, []);
  return (
    <PageWrapper>
      <Header title="가까운 공연" />
      <div style={{ height: '56px' }} />
      <MapView data={venues} />
      <MapTime />
      <Divider />

      <ScrollableContainer>
        <MapGrid data={venues} />
      </ScrollableContainer>
    </PageWrapper>
  );
};

export default MapPage;
