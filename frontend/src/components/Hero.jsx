import { Button } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

const Hero = () => {
  const heros = [
    {
      image: 'pepsz-zafival.jpg',
      title: 'Fugiat quos consequatur',
      description:
        'Quasi enim repellendus mollitia, inventore cumque eaque fuga?',
      buttonText: 'praesentium',
    },
    {
      image: 'ecoprint-02.webp',
      title: 'Rem obcaecati id pariatur',
      description:
        'Distinctio facilis voluptatem mollitia dolore nesciunt minus odit',
      buttonText: 'Laudantium',
    },
    {
      image: 'ecoprint-03.webp',
      title: 'adipisicing elit',
      description: 'Dolor sit amet consectetur alias magni necessitatibus.',
      buttonText: 'Voluptas',
    },
  ];

  return (
    <Swiper
      modules={[Pagination, Autoplay, EffectFade]}
      autoHeight={true}
      loop={true}
      pagination={{
        el: '.swiper-pagination',
        clickable: true,
      }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      effect={'fade'}
      className="slider"
    >
      {heros.map((hero, index) => (
        <SwiperSlide className="item" key={index}>
          <div className="image">
            <div className="ls-cover">
              <img src={`/images/${hero.image}`} alt="" />
              <div className="overlay"></div>
            </div>
            <div className="title-info">
              <div className="title-box">
                <div className="title-wrap">
                  <h3 className="title">{hero.title}</h3>
                  <p>{hero.description}</p>
                  <Button
                    variant="success"
                    className="text-primary btn-lasaphire"
                  >
                    {hero.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className="custom-pagination">
        <div className="swiper-pagination"></div>
      </div>
    </Swiper>
  );
};

export default Hero;
