import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import Slider from 'react-slick';
import TodayConcertCard from './TodayConcertCard';
import { performanceSampleData } from '../../data/performanceSampleData';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TodayConcertCarousel = forwardRef((props, ref) => {
  const sliderRef = useRef();

  // 외부에서 slickNext() 호출할 수 있게 노출
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
        {performanceSampleData.map((item, index) => (
          <TodayConcertCard
            key={index}
            title={item.title}
            posterUrl={item.posterUrl}
            place={item.place}
            date={item.date}
            onGoClick={() => sliderRef.current.slickNext()}
            onClick={() => props.onClickPerformance?.(item.id)}
          />
        ))}
      </Slider>
    </div>
  );
});

export default TodayConcertCarousel;
