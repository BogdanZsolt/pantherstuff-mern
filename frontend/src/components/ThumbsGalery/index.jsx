import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import './style.css';

const EventThumbsGallery = ({
  images,
  direction = 'horizontal',
  aspectRatio = 16 / 9,
}) => {
  const [thumbs, setThumbs] = useState(null);
  const slidesPerView = 4;

  console.log(thumbs);

  return (
    <div className={`image ${direction}`}>
      <div
        className={`outer-main${images.length <= 1 ? '-no-outer-thumbs' : ''}`}
      >
        <Swiper
          loop={images?.length > slidesPerView ? true : false}
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          modules={[FreeMode, Pagination, Thumbs]}
          className="main-image"
          pagination={
            direction === 'vertical' && {
              el: '.swiper-pagination',
              clickable: true,
            }
          }
        >
          {images.map((src, index) => (
            <SwiperSlide className="item" key={index}>
              <img src={src} style={{ '--aspect-ratio': aspectRatio }} />
            </SwiperSlide>
          ))}
          {direction === 'vertical' && (
            <div className="custom-pagination">
              <div className="swiper-pagination"></div>
            </div>
          )}
        </Swiper>
      </div>
      {images?.length > 1 && (
        <div className={direction === 'vertical' ? 'outer-thumb ls-cover' : ''}>
          <Swiper
            onSwiper={setThumbs}
            direction={direction}
            spaceBetween={10}
            slidesPerView={slidesPerView}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            className="thumbnail-image"
          >
            {images.map((src, index) => (
              <SwiperSlide className="item" key={index}>
                <div className="thumb-wrap">
                  <img src={src} style={{ '--aspect-ratio': aspectRatio }} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default EventThumbsGallery;
