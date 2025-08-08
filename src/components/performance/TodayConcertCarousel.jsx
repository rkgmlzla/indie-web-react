// ✅ src/components/performance/TodayConcertCarousel.jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Slider from 'react-slick';
import TodayConcertCard from './TodayConcertCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TodayConcertCarousel = forwardRef(({ performances = [], onClickPerformance }, ref) => {
  const sliderRef = useRef();

  useImperativeHandle(ref, () => ({
    next: () => sliderRef.current?.slickNext(),
  }));

  if (!performances || performances.length === 0) return null;

  const settings = {
    dots: performances.length > 1,
    infinite: performances.length > 1,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div style={{
      marginTop: '16px',
      width: '100%',
      overflow: 'visible',
      minHeight: '200px', // ✅ 밑변 잘림 방지
    }}>
      {performances.length === 1 ? (
        <TodayConcertCard
          key={performances[0].id}
          title={performances[0].title}
          posterUrl={performances[0].posterUrl}
          place={performances[0].venue}
          date={performances[0].date}
          onClick={() => onClickPerformance?.(performances[0].id)}
        />
      ) : (
        <Slider {...settings} ref={sliderRef}>
          {performances.map((item) => (
            <div key={item.id}>
              <TodayConcertCard
                title={item.title}
                posterUrl={item.posterUrl}
                place={item.venue}
                date={item.date}
                onClick={() => onClickPerformance?.(item.id)}
                onGoClick={() => sliderRef.current?.slickNext()}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
});

export default TodayConcertCarousel;
