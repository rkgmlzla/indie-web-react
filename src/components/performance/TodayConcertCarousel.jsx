// ✅ src/components/performance/TodayConcertCarousel.jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Slider from 'react-slick';
import TodayConcertCard from './TodayConcertCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TodayConcertCarousel = forwardRef(({ performances = [], onClickPerformance }, ref) => {
  const sliderRef = useRef();

  useImperativeHandle(ref, () => ({
    next: () => sliderRef.current.slickNext(),
  }));

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ marginTop: '16px' }}>
      <Slider {...settings} ref={sliderRef}>
        {performances.map((item) => (
          <TodayConcertCard
            key={item.id}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.venue}
            date={item.date}
            onClick={() => onClickPerformance?.(item.id)}
            onGoClick={() => sliderRef.current.slickNext()}
          />
        ))}
      </Slider>
    </div>
  );
});

export default TodayConcertCarousel;
