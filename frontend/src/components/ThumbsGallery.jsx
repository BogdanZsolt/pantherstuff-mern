import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, FreeMode, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

const ThumbsGalery = ({ images }) => {
  const [thumbs, setThumbs] = useState(null);
  const slidesPerView = 3;

  return (
    <div className="image">
      <div className="outer-main">
        <Swiper
          loop={images?.length > 1 ? true : false}
          thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
          modules={[Thumbs, Pagination]}
          autoHeight={true}
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          className="main-image"
        >
          {images.map((src, index) => (
            <SwiperSlide className="item" key={index}>
              <img src={src} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="custom-pagination">
          <div className="swiper-pagination"></div>
        </div>
      </div>
      {images?.length > 1 && (
        <div className="outer-thumb ls-cover">
          <Swiper
            onSwiper={setThumbs}
            direction="vertical"
            spaceBetween={15}
            slidesPerView={slidesPerView}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode]}
            className="thumbnail-image"
          >
            {images.map((src, index) => (
              <SwiperSlide className="item" key={index}>
                <div className="thumb-wrap">
                  <img src={src} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ThumbsGalery;
