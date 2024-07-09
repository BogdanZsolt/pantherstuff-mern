import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { Container, Row, Col } from 'react-bootstrap';
import Post from './Post';
import Message from './Message';
import Loader from './Loader';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const LatestPosts = () => {
  const { t, i18n } = useTranslation(['home']);

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
    <Container className="mt-5">
      <h2>
        <Trans
          i18nKey={t('latestPosts')}
          components={{ 1: <Link to={'blog'} /> }}
        />
        {/* <Link to={`/blog`}>Posts</Link> */}
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
