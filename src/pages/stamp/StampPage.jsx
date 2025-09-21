// src/pages/stamp/StampPage.jsx

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import PeriodModal from '../../components/modals/PeriodModal';
import StampButtonIcon from "../../assets/icons/icon_s_stamp.svg";
import FilterButtonNone from '../../components/common/FilterButtonNone'; 
import StampPopup from '../../components/stamp/StampPopup';
import StampPopupSmall from '../../components/stamp/StampPopupSmall';
import StampDetailPopup from '../../components/stamp/StampDetailPopup';
import {
  fetchCollectedStamps,
  fetchAvailableStamps,
  collectStamp,
  fetchStampDetail
} from '../../api/stampApi';

// 🔐 추가: 라우팅 훅 (로그인 가드용)
import { useNavigate, useLocation } from 'react-router-dom';

export default function StampPage() {
  const [isPeriodModalOpen, setIsPeriodModalOpen] = useState(false);
  const [startMonth, setStartMonth] = useState(1);
  const [endMonth, setEndMonth] = useState(9);
  const [isStampPopupOpen, setIsStampPopupOpen] = useState(false);
  const [selectedStamp, setSelectedStamp] = useState(null);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedStampDetail, setSelectedStampDetail] = useState(null);

  // ✅ API 연결 관련 상태
  const [collectedStamps, setCollectedStamps] = useState([]);
  const [availableStamps, setAvailableStamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🔐 추가: 인증 가드 상태
  const [authed, setAuthed] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔐 추가: 토큰 없으면 로그인 페이지로 이동 (원래 위치 기억)
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      navigate('/login', { state: { from: location.pathname } });
      setAuthed(false);
      setAuthChecked(true);
      return;
    }
    setAuthed(true);
    setAuthChecked(true);
  }, [navigate, location.pathname]);

  // ✅ 수집한 스탬프 목록 로드 (🔐 인증 후에만)
  useEffect(() => {
    if (!authChecked || !authed) return;
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
  }, [authChecked, authed, startMonth, endMonth]);

  // ✅ 사용 가능한 스탬프 목록 로드 (🔐 인증 후에만)
  useEffect(() => {
    if (!authChecked || !authed) return;
    const loadAvailableStamps = async () => {
      try {
        const stamps = await fetchAvailableStamps();
        setAvailableStamps(stamps);
      } catch (e) {
        console.error('📛 사용 가능한 스탬프 로딩 실패:', e);
      }
    };
    loadAvailableStamps();
  }, [authChecked, authed]);

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

  // 🔐 인증 체크 중엔 아무 것도 렌더하지 않음 (깜빡임 방지)
  if (!authChecked) return null;
  // 🔐 인증 실패로 /login 이동한 경우에도 여기선 아무 것도 렌더하지 않음
  if (!authed) return null;

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
            {collectedStamps.map((stamp) => {
              // (선택) 널/대체값 대비 안전 처리 — 기존 구조는 유지하되 NPE 방지
              const venueImg =
                stamp?.venueImageUrl ??
                stamp?.performance?.venue?.image_url ??
                null;
              const place =
                stamp?.place ??
                stamp?.performance?.venue?.name ??
                '공연장';
              const dateStr =
                typeof stamp?.date === 'string'
                  ? stamp.date
                  : (stamp?.performance?.date ?? '');

              return (
                <StampItem
                  key={stamp.id}
                  onClick={() => setSelectedStampDetail(stamp)}
                >
                  <StampImage src={venueImg || ''} alt={place} />
                  <StampDate>{dateStr}</StampDate>
                </StampItem>
              );
            })}
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
            if (!stamp.is_collected) {
              setSelectedStamp(stamp);
              setIsConfirmPopupOpen(true);
            } else {
              alert('이미 스탬프를 받은 공연입니다.');
            }
          }}
        />
      )}

      {isConfirmPopupOpen && (
        <StampPopupSmall
          onConfirm={() => handleStampCollect(selectedStamp)}
        />
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

const ModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: flex-end;
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
  bottom: 108px; 
  left: 16px;
  right: 16px;
  display: flex;
  flex-direction: column; /* ScrollArea가 flex:1 먹도록 */
`;

const StampPageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; 
  row-gap: 48px; 
  padding: 0 8px 0 0;
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
`;

const StampDate = styled.div`
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.black};
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
