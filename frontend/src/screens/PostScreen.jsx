import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import parse from 'html-react-parser';
import Editor from '../components/Editor.jsx';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import {
  useGetPostDetailsQuery,
  useLastNumPostsQuery,
} from '../slices/postsApiSlice.js';
import SuggestedPosts from '../components/SuggestedPosts';
import CommentsContainer from '../components/comments/CommentsContainer.jsx';
import SocialShareButtons from '../components/SocialShareButtons.jsx';

const PostScreen = () => {
  const { id: postId } = useParams();
  const {
    data: post,
    refetch,
    isLoading,
    error,
  } = useGetPostDetailsQuery(postId);

  const {
    data: postsData,
    isPostDataLoading,
    postDataError,
  } = useLastNumPostsQuery({
    sort: '-createdAt',
    limit: '3',
    fields: '_id,user,bannerImage,title,createdAt',
  });

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
                    <Link
                      to={`/category/${post.category._id}`}
                      className="fw-bold fs-5"
                    >
                      {post.category.title}
                    </Link>
                    <div className="mb-2">
                      {new Date(post.createdAt).toLocaleDateString('hu-HU', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                      <span className="mx-1">by</span>
                      <Link
                        to={`/author/${post?.user?._id}`}
                        className="fw-bold"
                      >
                        {post?.user?.name}{' '}
                      </Link>
                    </div>
                    <div className="mt-4 d-flex gap-1">
                      {post?.categories?.map((category, index) => (
                        <Link
                          key={index}
                          className="mb-2 d-inline-block"
                          to={`/blog?category=${category.name}`}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <h2 className="fs-1">{post.title}</h2>
                    <Editor content={post.body} editable={false} />
                    {/* <div className="mt-3">{parse(post.body)}</div> */}
                    <CommentsContainer
                      className="mt-4"
                      comments={post.comments}
                      postId={postId}
                      logginedUserId={userInfo?._id}
                      refetch={refetch}
                    />
                  </article>
                </Col>
                {isPostDataLoading ? (
                  <Loader />
                ) : postDataError ? (
                  <Message variant="danger">
                    {postDataError?.data?.message || error.error}
                  </Message>
                ) : (
                  <Col lg={3} className="mt-3 mt-lg-0">
                    <div>
                      <SuggestedPosts
                        header="Latest Posts"
                        posts={postsData}
                        tags={post?.tags}
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
                )}
              </Row>
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default PostScreen;
