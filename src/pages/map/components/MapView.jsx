import React, { useEffect } from 'react';

const MapView = ({ data }) => {
  useEffect(() => {
    if (window.naver && window.naver.maps) {
      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 13,
      });

      // 마커 찍기
      data.forEach((item) => {
        if (item.latitude && item.longitude) {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(
              item.latitude,
              item.longitude
            ),
            map,
            title: item.name,
          });
        }
      });
    }
  }, [data]);

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
      }}></div>
  );
};

export default MapView;
