// MapPage.jsx
import React, { useEffect } from 'react';
import Header from '../../components/layout/Header';
import Divider from '../../components/common/Divider';
import ScrollableContainer from '../../components/common/ScrollableContainer';
import MapView from './components/MapView';
import MapTime from './components/MapTime';
import MapGrid from './components/MapGrid';
import samplePosterImage1 from '../../assets/samplePosterItem1.png';
import samplePosterImage2 from '../../assets/samplePosterItem2.png';
import samplePosterImage3 from '../../assets/samplePosterItem3.png';
import styled from 'styled-components';
import MapWideCard from './components/MapWideCard';

const PageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MapPage = () => {
  return (
    <PageWrapper>
      <Header title="가까운 공연" />
      <div style={{ height: '56px' }} />
      <MapView data={sampleData} />
      <MapTime />
      <Divider />

      <ScrollableContainer>
        <MapGrid data={sampleData} />
      </ScrollableContainer>
    </PageWrapper>
  );
};

export default MapPage;

const sampleData = [
  {
    id: 1,
    poster: samplePosterImage1,
    title: 'A Place Called Sound',
    venue: '홍대 언플러그드emememememememem',
    address: '서울특별시 마포구 와우산로 33',
    time: '오후 5시',
    lat: 37.555897,
    lng: 126.930797,
  },
  {
    id: 2,
    poster: samplePosterImage2,
    title: '아직 흐르고 있어',
    venue: '뭥미',
    address: '인천시 연수구',
    time: '오후 11시',
  },
  {
    id: 3,
    poster: samplePosterImage3,
    title: 'FRIDAY THE 13TH',
    venue: '여기가어디냐',
    address: '서울특별시 마포구 와우산로 19999999999999999999999999999999999',
    time: '오후 3시 30분',
  },
  {
    id: 4,
    poster: samplePosterImage1,
    title: '아직 자고 있어',
    venue: '홍대 언플러그드emememememememem',
    address: '서울특별시 마포구 와우산로 33',
    time: '오후 5시',
  },
  {
    id: 5,
    poster: samplePosterImage2,
    title: '아직 먹고 있어',
    venue:
      '어디더라아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ',
    address: '서울특별시 마포구 와우산로 33',
    time: '오후 11시',
  },
  {
    id: 6,
    poster: samplePosterImage3,
    title:
      '으어엉어어어어어엄청 긴 이르으으으으으으으으으으으으으으으으으으으으음',
    venue: '몰라유',
    address: '서울특별시 마포구 와우산로 33',
    time: '오후 3시 30분',
  },
  {
    id: 7,
    poster: samplePosterImage1,
    title: '아직 공부하고 있어',
    venue: '홍대 언플러그드emememememememem',
    address: '서울특별시 인천대로',
    time: '오후 5시',
  },
  {
    id: 8,
    poster: samplePosterImage2,
    title: '아직 뭐하고 있어',
    venue: '몰라',
    address: '서울특별시 마포구 와우산로 33',
    time: '오후 11시',
  },
];

const sampleData2 = {
  // <MapWideCard data={sampleData2} />
  title: '홍대 언플러그드',
  time: '오후 5시',
  name: '홍대 언플러그드',
  address: '서울 마포구 어딘가 123',
  poster: samplePosterImage3,
};
