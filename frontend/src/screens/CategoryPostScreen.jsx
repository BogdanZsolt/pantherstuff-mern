import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Post from '../components/Post';
import { useGetPostCategoryDetailsQuery } from '../slices/postCategoriiesApiSlice';

const CategoryPostScreen = () => {
  const { id: catId } = useParams();

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
            title={`category: ${category?.title}`}
            src={category?.posts[0]?.bannerImage}
            alt="Banner"
          />
          <Meta title={`Category: ${category?.title}`} />
          <Container>
            <Row style={{ '--bs-gutter-y': '1.5rem' }}>
              {category?.posts?.map((post) => (
                <Col lg={6} key={post._id}>
                  <Post
                    postId={post._id}
                    src={
                      post.bannerImage ? post.bannerImage : '/images/sample.jpg'
                    }
                    title={post.title}
                    category={post.category}
                    description={post.description}
                    author={post.user}
                    date={post.createdAt}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default CategoryPostScreen;
