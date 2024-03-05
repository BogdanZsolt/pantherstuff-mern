import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Post from '../components/Post';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const BlogScreen = () => {
  const { data, isLoading, error } = useGetPostsQuery();
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
            <Row>
              {data.posts.map((post) => (
                <Col xl={6} key={post._id}>
                  <Post
                    src={
                      post.bannerImage ? post.bannerImage : '/images/sample.jpg'
                    }
                    slug={post.slug}
                    title={post.title}
                    description={post.description}
                    author={post.user.name}
                    date={post.createdAt}
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
