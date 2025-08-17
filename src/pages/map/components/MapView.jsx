import React, { useEffect, useRef, useState } from 'react';
import { LocateFixed, RotateCcw } from 'lucide-react';
import { MapPin as LucideMapPin } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const PIN_COLOR = '#d55a1f';
const PIN_SIZE = 28;

function svgPin(color = PIN_COLOR, size = PIN_SIZE) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    <LucideMapPin
      size={size}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  return {
    content: svg,
    size: new window.naver.maps.Size(size, size),
    anchor: new window.naver.maps.Point(size / 2, size),
  };
}

const MapView = ({
  data,
  selectedVenue,
  setSelectedCardId,
  setSelectedVenue,
  handleMarkerClick,
  /** “현 지도에서 검색” 눌렀을 때 호출 */
  onSearchInMap, // ({center:{lat,lng}, ne, sw}) => void
}) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [currentMarker, setCurrentMarker] = useState(null);

  /** 1) 지도는 마운트 시 딱 한 번만 생성 */
  useEffect(() => {
    if (!window.naver?.maps) return;

    const initMap = (lat, lng) => {
      mapRef.current = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(lat, lng),
        zoom: 13, // 대략 3km
      });
    };

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => initMap(coords.latitude, coords.longitude),
      () => initMap(37.5665, 126.978) // 실패 시 서울 시청
    );

    // 언마운트 시에만 지도 파괴
    return () => {
      // 마커 정리
      markersRef.current.forEach((m) => m.setMap(null));
      markersRef.current = [];
      mapRef.current?.destroy?.();
    };
  }, []);

  /** 2) data 변경 시 마커만 업데이트 (지도는 유지) */
  useEffect(() => {
    if (!mapRef.current || !window.naver?.maps) return;

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    const map = mapRef.current;

    const markers = (data || [])
      .map((item) => {
        if (
          typeof item?.latitude !== 'number' ||
          typeof item?.longitude !== 'number'
        )
          return null;

        const marker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(item.latitude, item.longitude),
          map,
          title: item.name,
          icon: svgPin(PIN_COLOR, PIN_SIZE),
        });

        window.naver.maps.Event.addListener(marker, 'click', () => {
          handleMarkerClick?.(item);
        });

        return marker;
      })
      .filter(Boolean);

    markersRef.current = markers;
  }, [data, handleMarkerClick]);

  /** 3) 외부에서 공연장 선택 시 지도만 이동 */
  useEffect(() => {
    if (!selectedVenue || !mapRef.current) return;

    const { latitude, longitude, name } = selectedVenue;
    if (typeof latitude !== 'number' || typeof longitude !== 'number') return;

    const latLng = new window.naver.maps.LatLng(latitude, longitude);
    mapRef.current.panTo(latLng);

    const selectedMarker = markersRef.current.find(
      (marker) =>
        marker.getTitle() === name &&
        marker.getPosition().lat() === latitude &&
        marker.getPosition().lng() === longitude
    );

    if (selectedMarker) {
      new window.naver.maps.InfoWindow({
        content: `<div style="padding:6px 12px; font-size:14px;">${name}</div>`,
      }).open(mapRef.current, selectedMarker);
    }
  }, [selectedVenue]);

  /** 내 위치로 이동 버튼 */
  const handleLocateMe = () => {
    if (!mapRef.current || !window.naver?.maps) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const latLng = new window.naver.maps.LatLng(
          coords.latitude,
          coords.longitude
        );
        mapRef.current.panTo(latLng);

        if (currentMarker) currentMarker.setMap(null);

        const marker = new window.naver.maps.Marker({
          position: latLng,
          map: mapRef.current,
          icon: {
            content:
              '<div style="background:#007bff;border-radius:50%;width:14px;height:14px;border:2px solid white;"></div>',
            size: new window.naver.maps.Size(14, 14),
            anchor: new window.naver.maps.Point(7, 7),
          },
        });

        setCurrentMarker(marker);
      },
      (err) => console.error('❌ 현재 위치를 찾을 수 없습니다:', err)
    );
  };

  /** 현 지도에서 검색 버튼 */
  const handleSearchHere = () => {
    if (!mapRef.current || !onSearchInMap) return;
    const bounds = mapRef.current.getBounds();
    const ne = bounds.getNE();
    const sw = bounds.getSW();
    const center = mapRef.current.getCenter();

    onSearchInMap({
      ne: { lat: ne.lat(), lng: ne.lng() },
      sw: { lat: sw.lat(), lng: sw.lng() },
      center: { lat: center.lat(), lng: center.lng() },
    });
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        id="map"
        style={{
          width: '100%',
          aspectRatio: 5 / 3,
          marginTop: '16px',
          marginBottom: '16px',
          boxSizing: 'border-box',
          borderRadius: '5px',
        }}
      />

      {/* 상단 중앙: 현 지도에서 검색 */}
      <button
        onClick={handleSearchHere}
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '4px 8px',
          borderRadius: 24,
          border: '1px solid #ff7a3d',
          background: '#fff5ef',
          color: '#d55a1f',
          fontWeight: 500,
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          cursor: 'pointer',
          zIndex: 2,
        }}
        aria-label="현 지도에서 검색">
        <RotateCcw size={16} />현 지도에서 검색
      </button>

      {/* 우하단: 내 위치로 이동 */}
      <button
        onClick={handleLocateMe}
        style={{
          position: 'absolute',
          right: '12px',
          bottom: '24px',
          background: '#ffffffcc',
          border: '1px solid #ccc',
          borderRadius: '50%',
          padding: '10px',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
        aria-label="현재 위치로 이동">
        <LocateFixed size={20} color="#000" />
      </button>
    </div>
  );
};

export default MapView;
