import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CardGroup } from 'react-bootstrap';
import Post from './Post';
import Message from './Message';
import Loader from './Loader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const LatestPostsCarousel = () => {
  const { i18n } = useTranslation(['home']);

  const [lang, setLang] = useState('');

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  const {
    data: posts,
    isLoading,
    error,
  } = useGetPostsQuery({
    sort: '-createdAt',
    language: lang,
    limit: '3',
    fields: '_id,user,bannerImage,title,description,createdAt, language',
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <CardGroup
          className="position-relative text-center"
          style={{ gap: '1rem' }}
        >
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: '.swiper-button-blog-next',
              prevEl: '.swiper-button-blog-prev',
            }}
            spaceBetween={30}
            slidesPerGroup={1}
            breakpoints={{
              481: {
                slidesPerView: 1,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                centeredSlides: false,
              },
              1200: {
                slidesPerView: 3,
                centeredSlides: false,
              },
            }}
            className="blog-swiper p-3"
          >
            {posts.data.map((post) => (
              <SwiperSlide key={post._id}>
                <Post
                  style={{ '--bs-card-height': '100%' }}
                  className="mx-3 mx-md-0"
                  src={
                    post.bannerImage ? post.bannerImage : '/images/sample.jpg'
                  }
                  postId={post._id}
                  title={post.title}
                  description={post.description}
                  author={post.user}
                  date={post.createdAt}
                  category={post?.category}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="carousel-nav">
            <div className="swiper-button-blog-prev">
              <RiArrowLeftLine />
            </div>
            <div className="swiper-button-blog-next">
              <RiArrowRightLine />
            </div>
          </div>
        </CardGroup>
      )}
    </>
  );
};

export default LatestPostsCarousel;
