import React, { useEffect, useRef } from 'react';
import { MapPin as LucideMapPin } from 'lucide-react';
import ReactDOMServer from 'react-dom/server';

const MapView2 = ({
  data,
  selectedVenue,
  setSelectedCardId,
  setSelectedVenue,
  handleMarkerClick,
}) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  // 초기/데이터 변경 시: 지도 생성 및 공연장 마커 표시 + 가운데 맞춤
  useEffect(() => {
    if (!window.naver?.maps) return;

    if (!mapRef.current) {
      const defaultCenter = new window.naver.maps.LatLng(37.5665, 126.978); // 기본 서울 중심
      mapRef.current = new window.naver.maps.Map('map', {
        center: defaultCenter,
        zoom: 13,
      });
    }

    const map = mapRef.current;

    // 기존 마커 제거
    markersRef.current.forEach((m) => m.setMap(null));
    markersRef.current = [];

    // 새 마커 생성
    const markers = (data || [])
      .map((item) => {
        const { latitude, longitude, name } = item || {};
        if (typeof latitude !== 'number' || typeof longitude !== 'number')
          return null;

        const position = new window.naver.maps.LatLng(latitude, longitude);

        // Lucide MapPin 아이콘 → SVG 문자열 변환
        const iconSvg = ReactDOMServer.renderToStaticMarkup(
          <LucideMapPin
            size={28}
            stroke="#d55a1f"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );

        const marker = new window.naver.maps.Marker({
          position,
          map,
          title: name,
          icon: {
            content: iconSvg,
            size: new window.naver.maps.Size(28, 28),
            anchor: new window.naver.maps.Point(14, 28), // 핀 끝이 좌표에 오도록
          },
        });

        // 마커 클릭 핸들러
        window.naver.maps.Event.addListener(marker, 'click', () => {
          handleMarkerClick?.(item);
        });

        return marker;
      })
      .filter(Boolean);

    markersRef.current = markers;

    // 공연장 기준 화면/중심 맞춤
    if (markers.length === 1) {
      map.setCenter(markers[0].getPosition());
    } else if (markers.length > 1) {
      const bounds = new window.naver.maps.LatLngBounds();
      markers.forEach((m) => bounds.extend(m.getPosition()));
      map.fitBounds(bounds, { top: 30, right: 30, bottom: 30, left: 30 });
    }
  }, [data, handleMarkerClick]);

  // 선택된 공연장으로 이동 + 인포윈도우
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

  return (
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
  );
};

export default MapView2;
