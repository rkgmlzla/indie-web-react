// src/pages/stamp/StampPage.jsx

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import PeriodModal from '../../components/modals/PeriodModal';
import StampButtonIcon from "../../assets/icons/icon_s_stamp.svg";
import FilterButtonNone from '../../components/common/FilterButtonNone'; 
import StampPopup from '../../components/stamp/StampPopup';
import StampPopupSmall from '../../components/stamp/StampPopupSmall';
import StampPopupSmall2 from '../../components/stamp/StampPopupSmall2';
import StampDetailPopup from '../../components/stamp/StampDetailPopup';
import {
  fetchCollectedStamps,
  fetchAvailableStamps,
  collectStamp,
  fetchStampDetail
} from '../../api/stampApi';

export default function StampPage() {
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(9);
  const [isStampPopupOpen, setIsStampPopupOpen] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedStampDetail, setSelectedStampDetail] = useState(null);
  const [isStampSmall2Open, setIsStampSmall2Open] = useState(false);

  // ✅ API 연결 관련 상태
  const [collectedStamps, setCollectedStamps] = useState([]);
  const [availableStamps, setAvailableStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // ✅ 인증 토큰 가져오기 (FavoritePage와 동일)
  //const authToken = localStorage.getItem('accessToken');

  // ✅ 수집한 스탬프 목록 로드
  useEffect(() => {
    const loadCollectedStamps = async () => {
      try {
        setLoading(true);
        const stamps = await fetchCollectedStamps(startMonth, endMonth);
        setCollectedStamps(stamps);
      } catch (e) {
        console.error('📛 수집한 스탬프 로딩 실패:', e);
        setError('스탬프를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };
    loadCollectedStamps();
  }, [startMonth, endMonth]);

  
useEffect(() => {
  if (!isStampPopupOpen) return;   // 팝업 열릴 때만 호출
  (async () => {
    try {
      const list = await fetchAvailableStamps({ days: 30 }); // 필요시 days 조절
      console.log('🎯 available stamps:', list);
      setAvailableStamps(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('❌ available 오류', e?.response?.data || e.message);
      setAvailableStamps([]);
    }
  })();
}, [isStampPopupOpen]);

  // ✅ 스탬프 수집 처리
  const handleStampCollect = async (stampData) => {
    try {
      await collectStamp(stampData.id);
      
      // 성공 후 수집한 스탬프 목록 새로고침
      const updatedStamps = await fetchCollectedStamps(startMonth, endMonth);
      setCollectedStamps(updatedStamps);

      setIsConfirmPopupOpen(false);
      setIsStampPopupOpen(false);
      setSelectedStamp(null);
    } catch (e) {
      console.error('📛 스탬프 수집 실패:', e);
      alert('스탬프 수집에 실패했습니다.');
    }
  };

  return (
    <PageWrapper>
      <Header title="스탬프" />
      <div style={{ height: '16px' }} />
      <FilterBar>
          <FilterGroup>
            <FilterButtonNone onClick={() => setIsPeriodModalOpen(true)}>
              기간 설정
            </FilterButtonNone>
          </FilterGroup>
      </FilterBar>

      {/* ✅ 메인 스탬프판 */}
      <StampBoard>
        <ScrollArea>
          <StampPageContainer>
            {collectedStamps
              .slice()
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((stamp) => (
                <StampItem
                  key={stamp.id}
                  onClick={() => setSelectedStampDetail(stamp)}
                >
                  <StampImage src={stamp.venueImageUrl} alt={stamp.place} />
                  <StampDate>{stamp.date}</StampDate>
                </StampItem>
            ))}
          </StampPageContainer>
        </ScrollArea>
      </StampBoard>

      {/* ✅ 하단 버튼 */}
      <StampButton onClick={() => setIsStampPopupOpen(true)}>
        <img src={StampButtonIcon} alt="스탬프 찍기" />
      </StampButton>

      {isStampPopupOpen && (
        <StampPopup
          onClose={() => setIsStampPopupOpen(false)}
          stamps={availableStamps}
          onStampSelect={(stamp) => {
            // 3. 팝업 로직 수정
            if (stamp.is_collected) { // is_collected 상태에 따라 분기
              setIsStampSmall2Open(true); // StampPopupSmall2 띄우기
            } else {
              setSelectedStamp(stamp);
              setIsConfirmPopupOpen(true);
            }
          }}
        />
      )}

      {isConfirmPopupOpen && (
        <StampPopupSmall
          onConfirm={() => handleStampCollect(selectedStamp)}
          onCancel={() => setIsConfirmPopupOpen(false)}
        />
      )}

      {isStampSmall2Open && (
        <StampPopupSmall2 onClose={() => setIsStampSmall2Open(false)} />
      )}

      {selectedStampDetail && (
      <StampDetailPopup
        concert={selectedStampDetail}
        onClose={() => setSelectedStampDetail(null)}
      />
    )}

      {isPeriodModalOpen && (
        <PeriodModal
          startMonth={startMonth}
          endMonth={endMonth}
          onChange={({ startMonth, endMonth }) => {
            setStartMonth(startMonth);
            setEndMonth(endMonth);
          }}
          onClose={() => setIsPeriodModalOpen(false)}
        />
      )}
    </PageWrapper>
  );
}

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PageWrapper = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto; 
  min-height: 100vh;
  position: relative;
  background: ${({ theme }) => theme.colors.bgWhite};
  overflow-y: auto;
`;

const StampButton = styled.button`
  position: absolute;
  right: 8px;
  bottom: 108px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;

  img {
    width: 72px;
    height: 72px;
    display: block;
  }
`;

const StampBoard = styled.div`
  position: absolute;
  top: 80px;
  bottom: 64px; /* ???? */
  left: 16px;
  right: 16px;
  display: flex;
  flex-direction: column; 
`;

const StampPageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  row-gap: 48px; 
  padding: 0 8px 64px 0;
  width: 100%;
  box-sizing: border-box;
`;

const StampItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  &:nth-child(3n + 1) { justify-self: start; }  
  &:nth-child(3n + 2) { justify-self: center; } 
  &:nth-child(3n + 3) { justify-self: end; }   
`;

const StampImage = styled.img`
  width: 20vw;
  max-width: 100px;
  height: 20vw;
  max-height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 1.6px solid ${({ theme }) => theme.colors.outlineGray}; 
`;

const StampDate = styled.div`
  margin-top: 12px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.stampGray};
`;

const ScrollArea = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent; 
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0,0,0,0.3);
    border-radius: 2px;
  }
`;
