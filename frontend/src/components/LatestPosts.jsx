import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Post from './Post';
import Message from './Message';
import Loader from './Loader';
import { useLastNumPostsQuery } from '../slices/postsApiSlice';

const LatestPosts = () => {
  const {
    data: posts,
    isLoading,
    error,
  } = useLastNumPostsQuery({
    sort: '-createdAt',
    limit: '3',
    fields: '_id,user,bannerImage,title,description,createdAt',
  });

  return (
    <Container className="mt-5">
      <h2>
        Latest <Link to={`/blog`}>Posts</Link>
      </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          {posts.data.map((post) => (
            <Col md={6} xl={4} key={post._id}>
              <Post
                className="post-card"
                src={post.bannerImage ? post.bannerImage : '/images/sample.jpg'}
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
      )}
    </Container>
  );
};

export default LatestPosts;
