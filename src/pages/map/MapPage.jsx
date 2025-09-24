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
import { baseUrl } from '../../api/config';

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

  // 각 공연장에 "오늘 0시 이후 첫 공연 1개" 붙여주는 헬퍼
  const attachFirstUpcoming = async (venueList) => {
  const now = new Date(); 
  
  const withPerf = await Promise.all(
    (venueList || []).map(async (venue) => {
      try {
        const { data: perfs } = await axios.get(
          `${baseUrl}/nearby/venue/${venue.venue_id}/performance`
        );

        const upcoming = (perfs || []).filter((p) => {
          const perfDateTime = new Date(`${p.date}T${p.time}`);
          return perfDateTime >= now;
        });

        return { ...venue, upcomingPerformance: upcoming.slice(0, 1) };
      } catch (e) {
        console.error(`공연 불러오기 실패 (venue_id: ${venue.venue_id})`, e);
        return { ...venue, upcomingPerformance: [] };
      }
    })
  );
  return withPerf;
};


  // 핀(마커) 클릭 시: 해당 장소만 공연 갱신 + 선택 동기화
  const handleMarkerClick = async (venue) => {
  try {
    const { data: performances } = await axios.get(
      `${baseUrl}/nearby/venue/${venue.venue_id}/performance`
    );

    const upcoming = (performances || []).filter((p) => {
      const perfDateTime = new Date(`${p.date}T${p.time}`);
      return perfDateTime >= new Date();
    });

    const updatedVenue = {
      ...venue,
      upcomingPerformance: upcoming.slice(0, 1),
    };

    setSelectedVenue(updatedVenue);
    setSelectedCardId(updatedVenue.venue_id);

    setVenues((prev) =>
      prev.map((v) =>
        v.venue_id === updatedVenue.venue_id ? updatedVenue : v
      )
    );
  } catch (error) {
    console.error('공연 정보 불러오기 실패:', error);
  }
};

  // 최초 로딩: 내 위치 기준 3km
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const { data: venueList } = await axios.get(
            `${baseUrl}/nearby/venue`,
            {
              params: {
                lat: coords.latitude,
                lng: coords.longitude,
                radius: 3,
              },
            }
          );
          setVenues(await attachFirstUpcoming(venueList));
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
      <div style={{ height: '30px' }} />

      <MapView
        data={venues}
        selectedVenue={selectedVenue}
        setSelectedVenue={setSelectedVenue}
        setSelectedCardId={setSelectedCardId}
        handleMarkerClick={handleMarkerClick}
        // “현 지도에서 검색”: 지도 중심 기준 반경 3km 재조회
        onSearchInMap={async ({ center }) => {
          try {
            const { lat, lng } = center;
            const { data: venueList } = await axios.get(
              `${baseUrl}/nearby/venue`,
              {
                params: { lat, lng, radius: 3 },
              }
            );
            setVenues(await attachFirstUpcoming(venueList));
            setSelectedVenue(null); // 선택 초기화 (원하면 유지하도록 변경 가능)
            setSelectedCardId(null);
          } catch (error) {
            console.error('🎯 지도 내 공연장 불러오기 실패:', error);
          }
        }}
      />

      <MapTime />
      <Divider />

      <ScrollableContainer>
        <MapGrid
          data={venues}
          selectedCardId={selectedCardId} // ✅ 제어형으로 전달
          onChangeSelected={(id) => {
            // ✅ 카드 클릭 시 동기화
            setSelectedCardId(id);
            const found = venues.find((v) => v.venue_id === id) || null;
            setSelectedVenue(found); // 지도 이동 + InfoWindow
          }}
          onSelectVenue={setSelectedVenue} // (선택 유지용, MapGrid 내부 호출 시)
        />
      </ScrollableContainer>
    </PageWrapper>
  );
};

export default MapPage;
