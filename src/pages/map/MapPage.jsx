// MapPage.jsx
import React, { useEffect, useState } from 'react';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import ScrollableContainer from '../../components/common/ScrollableContainer';
import MapView from './components/MapView';
import MapTime from './components/MapTime';
import MapGrid from './components/MapGrid';
import styled from 'styled-components';
import axios from 'axios';

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapPage = () => {
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const handleMarkerClick = async (venue) => {
    const now = new Date().toISOString();

    try {
      const res = await axios.get(
        `http://localhost:8000/nearby/venue/${venue.venue_id}/performance`,
        {
          params: { after: now },
        }
      );

      const performances = res.data;

      const updatedVenue = {
        ...venue,
        upcomingPerformance: performances.slice(0, 1),
      };

      setSelectedVenue(updatedVenue);

      // 📌 venues 배열도 업데이트
      setVenues((prev) =>
        prev.map((v) =>
          v.venue_id === updatedVenue.venue_id ? updatedVenue : v
        )
      );
    } catch (error) {
      console.error('공연 정보 불러오기 실패:', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log('📍 현재 위치:', { latitude, longitude });
        try {
          const venueRes = await axios.get(
            'http://localhost:8000/nearby/venue',
            {
              params: { lat: latitude, lng: longitude, radius: 3 },
            }
          );

          const venueList = venueRes.data;

          const venuesWithPerformance = await Promise.all(
            venueList.map(async (venue) => {
              try {
                const now = new Date();
                const kstMidnight = new Date(
                  now.getFullYear(),
                  now.getMonth(),
                  now.getDate(),
                  0,
                  0,
                  0
                );
                const performanceRes = await axios.get(
                  `http://localhost:8000/nearby/venue/${venue.venue_id}/performance`,
                  {
                    params: {
                      after: kstMidnight.toISOString(), // 현재 시간 기준
                    },
                  }
                );

                const performances = performanceRes.data;
                return {
                  ...venue,
                  upcomingPerformance: performances.slice(0, 1), // 가장 첫 공연 하나만
                };
              } catch (e) {
                console.error(
                  `공연 불러오기 실패 (venue_id: ${venue.venue_id})`,
                  e
                );
                return { ...venue, upcomingPerformance: [] };
              }
            })
          );

          setVenues(venuesWithPerformance);
        } catch (error) {
          console.error('🎯 근처 공연장 불러오기 실패:', error);
        }
      },
      (err) => {
        console.error('❌ 위치 정보 가져오기 실패:', err);
      }
    );
  }, []);
  useEffect(() => {
    console.log('📦 venue list from API:', venues);
  }, [venues]);

  return (
    <PageWrapper>
      <Header title="가까운 공연" />
      <div style={{ height: '56px' }} />
      <MapView
        data={venues}
        selectedVenue={selectedVenue}
        setSelectedVenue={setSelectedVenue}
        setSelectedCardId={setSelectedCardId}
        handleMarkerClick={handleMarkerClick}
      />
      <MapTime />
      <Divider />

      <ScrollableContainer>
        <MapGrid
          data={venues}
          onSelectVenue={setSelectedVenue}
          selectedCardId={selectedCardId}
        />
      </ScrollableContainer>
    </PageWrapper>
  );
};

export default MapPage;
