import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import { useGetPostDetailsQuery } from '../slices/postsApiSlice.js';
import SuggestedPosts from '../components/SuggestedPosts';
import CommentsContainer from '../components/comments/CommentsContainer.jsx';
import SocialShareButtons from '../components/SocialShareButtons.jsx';
import { useSelector } from 'react-redux';

const PostScreen = () => {
  const { slug: postSlug } = useParams();
  const {
    data: post,
    refetch,
    isLoading,
    error,
  } = useGetPostDetailsQuery(postSlug);

  const postsData = [
    {
      _id: '1',
      bannerImage: '/images/sample.jpg',
      title: "És így lett a La'Saphire",
      createdAt: '2024-03-01T06:48:14.509Z',
    },
    {
      _id: '2',
      bannerImage: '/images/sample.jpg',
      title: 'A herbárium project',
      createdAt: '2024-02-29T11:39:14.142Z',
    },
    {
      _id: '1',
      bannerImage: '/images/sample.jpg',
      title: 'Fantasztikus gombák - film',
      createdAt: '2024-02-28T13:28:05.143Z',
    },
  ];

  const tagsData = [
    'Ecoprint',
    'Lifestyle',
    'Dye',
    'Education',
    'Nature',
    'Dress',
  ];

  const { userInfo } = useSelector((state) => state.auth);

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
          <Banner title={post.title} src={post.bannerImage} alt="Banner" />
          <Meta title={post.title} />
          <Container>
            <div className="post">
              <Link className="btn btn-primary my-3" to="/blog">
                Go Back
              </Link>
              <Row className="my-5">
                <Col lg={9}>
                  <article>
                    <div className="mb-2">
                      <span className="fw-bold">{post.user.name} </span>
                      {new Date(post.createdAt).toLocaleDateString('hu-HU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                    <Link
                      className="mb-2 d-inline-block"
                      to="/blog?category=selectedCategory"
                    >
                      OPINION
                    </Link>
                    <h2 className="fs-1">{post.title}</h2>
                    <div className="mt-3">
                      <p className="lead">Háromszor.</p>
                      <p className="lead">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Numquam at nam voluptates repellendus iste beatae
                        laudantium eum quae! Quasi, qui? Odit officia placeat
                        natus omnis cum debitis pariatur eum dolorum culpa
                        deserunt.
                      </p>
                      <p className="lead">
                        Placeat ullam, incidunt voluptas aliquid voluptatum iste
                        odio inventore culpa quam sed eaque cum veniam nemo
                        rerum repellat recusandae fuga rem nisi, cumque deleniti
                        dolorum est natus debitis. Autem quibusdam minima
                        laudantium asperiores, eaque aut non necessitatibus
                        culpa repudiandae dolor tenetur dolorem.{' '}
                      </p>
                    </div>
                    <CommentsContainer
                      className="mt-4"
                      comments={post.comments}
                      slug={postSlug}
                      logginedUserId={userInfo?._id}
                      refetch={refetch}
                    />
                  </article>
                </Col>
                <Col lg={3} className="mt-3 mt-lg-0">
                  <div>
                    <SuggestedPosts
                      header="Latest Posts"
                      posts={postsData}
                      tags={tagsData}
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="mb-1">Share on:</h2>
                    <SocialShareButtons
                      url={encodeURI()}
                      // title={encodeURIComponent('Fantasztikus Gombák – film')}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default PostScreen;
