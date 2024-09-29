import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, CardGroup } from 'react-bootstrap';
import Loader from '../components/Loader';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Post from '../components/Post';
import { useGetPostsQuery } from '../slices/postsApiSlice';
import { useTranslation } from 'react-i18next';
import Paginate from '../components/Paginate';

const BlogScreen = () => {
  let { pageNumber } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }

  const { t, i18n } = useTranslation(['blog']);

  const [sort, setSort] = useState('');
  const [lang, setLang] = useState('');
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    setSort('-createdAt');
    setLang(i18n.language);
  }, [i18n.language]);

  const {
    data: posts,
    isLoading,
    error,
  } = useGetPostsQuery({
    sort,
    language: lang,
    page,
    limit: 8,
  });

  useEffect(() => {
    if (posts) {
      posts.pages < 1 ? setPages(1) : setPages(posts.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [posts, pages, page, pageNumber]);

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
          <Banner src="/images/ecoprint-03-1280x360.webp" title={t('blog')} />
          <Meta title={t('blog')} />
          <Container>
            <CardGroup className="blog text-center" style={{ gap: '1rem' }}>
              {posts.data.map((post) => (
                <Post
                  key={post._id}
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
              ))}
            </CardGroup>
            <Paginate pages={pages} page={page} pageName="blog" />
          </Container>
        </>
      )}
    </>
  );
};

export default BlogScreen;
