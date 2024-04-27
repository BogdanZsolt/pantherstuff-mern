import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Post from '../components/Post';
import { useGetAuthorQuery } from '../slices/usersApiSlice';

const AuthorScreen = () => {
  const { id: authorId } = useParams();

  const {
    data: user,
    isLoaing: loadingUser,
    error: errorUser,
  } = useGetAuthorQuery(authorId);

  return (
    <>
      {loadingUser ? (
        <Loader />
      ) : errorUser ? (
        <Message variant="danger">
          {errorUser?.data?.message || errorUser.error}
        </Message>
      ) : (
        <>
          <Banner
            title={`Author: ${user?.name}`}
            src={user?.posts[0]?.bannerImage}
            alt="Banner"
          />
          <Meta title={`Author: ${user?.name}`} />
          <Container>
            <Row style={{ '--bs-gutter-y': '1.5rem' }}>
              {user?.posts?.map((post) => (
                <Col lg={12} key={post._id}>
                  <Post
                    src={
                      post.bannerImage ? post.bannerImage : '/images/sample.jpg'
                    }
                    postId={post._id}
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

export default AuthorScreen;
