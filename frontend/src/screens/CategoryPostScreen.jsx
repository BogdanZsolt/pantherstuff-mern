import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Post from '../components/Post';
import { useGetPostCategoryDetailsQuery } from '../slices/postCategoriesApiSlice.js';

const CategoryPostScreen = () => {
  const { id: catId } = useParams();

  const { t, i18n } = useTranslation(['blog']);

  const {
    data: category,
    isLoading,
    error,
  } = useGetPostCategoryDetailsQuery(catId);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner
            title={`${t('category')}: ${
              i18n.language === 'en'
                ? category?.title
                : category?.translations?.hu?.title || category?.title
            }`}
            src={category?.posts[0]?.bannerImage}
            alt="Banner"
          />
          <Meta
            title={`${t('category')}: ${
              i18n.language === 'en'
                ? category?.title
                : category?.translations?.hu?.title || category?.title
            }`}
          />
          <Container>
            <Row style={{ '--bs-gutter-y': '1.5rem' }}>
              {category?.posts?.map(
                (post) =>
                  post.language === i18n.language && (
                    <Col lg={12} key={post._id}>
                      <Post
                        postId={post._id}
                        src={
                          post.bannerImage
                            ? post.bannerImage
                            : '/images/sample.jpg'
                        }
                        title={post.title}
                        category={post.category}
                        description={post.description}
                        author={post.user}
                        date={post.createdAt}
                      />
                    </Col>
                  )
              )}
            </Row>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default CategoryPostScreen;
