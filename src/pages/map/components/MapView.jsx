import React, { useEffect, useRef, useState } from 'react';
import { LocateFixed } from 'lucide-react';

const MapView = ({
  data,
  selectedVenue,
  setSelectedCardId,
  setSelectedVenue,
  handleMarkerClick,
}) => {
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const [currentMarker, setCurrentMarker] = useState(null);

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          const map = new window.naver.maps.Map('map', {
            center: new window.naver.maps.LatLng(latitude, longitude),
            zoom: 13,
          });
          mapRef.current = map;

          const markers = data
            .map((item) => {
              if (item.latitude && item.longitude) {
                const position = new window.naver.maps.LatLng(
                  item.latitude,
                  item.longitude
                );
                const marker = new window.naver.maps.Marker({
                  position,
                  map,
                  title: item.name,
                });

                // ✅ 마커 클릭 시 venue 전체 상태 업데이트
                window.naver.maps.Event.addListener(marker, 'click', () => {
                  if (handleMarkerClick) {
                    handleMarkerClick(item);
                  }
                });

                return marker;
              }
              return null;
            })
            .filter(Boolean);

          markersRef.current = markers;
        },
        (error) => {
          console.error('❌ 위치 정보를 가져오지 못했습니다:', error);
        }
      );
    }

    return () => {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
      if (mapRef.current) {
        mapRef.current.destroy?.();
      }
    };
  }, [data]);

  useEffect(() => {
    if (selectedVenue && mapRef.current) {
      const { latitude, longitude } = selectedVenue;
      if (latitude && longitude) {
        const latLng = new window.naver.maps.LatLng(latitude, longitude);
        mapRef.current.panTo(latLng);

        const selectedMarker = markersRef.current.find(
          (marker) =>
            marker.getTitle() === selectedVenue.name &&
            marker.getPosition().lat() === latitude &&
            marker.getPosition().lng() === longitude
        );

        if (selectedMarker) {
          new window.naver.maps.InfoWindow({
            content: `<div style="padding:6px 12px; font-size:14px;">${selectedVenue.name}</div>`,
          }).open(mapRef.current, selectedMarker);
        }
      }
    }
  }, [selectedVenue]);

  const handleLocateMe = () => {
    if (!mapRef.current || !window.naver?.maps) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latLng = new window.naver.maps.LatLng(latitude, longitude);

        mapRef.current.panTo(latLng);

        if (currentMarker) {
          currentMarker.setMap(null);
        }

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
      (err) => {
        console.error('❌ 현재 위치를 찾을 수 없습니다:', err);
      }
    );
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
        }}></div>

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
        }}>
        <LocateFixed size={20} color="#000" />
      </button>
    </div>
  );
};

export default MapView;
