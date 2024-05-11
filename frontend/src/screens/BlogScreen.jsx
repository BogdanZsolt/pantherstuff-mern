import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Post from '../components/Post';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const BlogScreen = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery();
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
          <Banner src="/images/ecoprint-03-1280x360.webp" title="Blog" />
          <Meta title="Blog" />
          <Container>
            <Row style={{ '--bs-gutter-y': '1.5rem' }}>
              {posts.data.map((post) => (
                <Col lg={6} xxl={4} key={post._id}>
                  <Post
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
                </Col>
              ))}
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default BlogScreen;
