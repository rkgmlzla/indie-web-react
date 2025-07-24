// src/components/map/Map.jsx
import React, { useEffect } from 'react';

const MapView = () => {
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(37.5665, 126.9780),
        zoom: 13,
      });
    }
  }, []);

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
    ></div>
  );
};

export default MapView;
