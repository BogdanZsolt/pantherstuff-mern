import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';
// import { RiArrowRightSLine } from 'react-icons/ri';

const Post = ({ postId, src, category, author, title, description, date }) => {
  const { t, i18n } = useTranslation(['blog']);

  return (
    <article className="blog-post">
      <strong
        className="d-inline-block mb-2 text-primary-emphasis"
        style={{ fontSize: '1.25rem' }}
      >
        <Link to={category?._id ? `/category/${category?._id}` : ''}>
          {i18n.language === 'en'
            ? category?.title
              ? category?.title
              : 'Uncategorized'
            : category?.translations?.hu?.title
            ? category?.translations?.hu?.title
            : t('uncategorized')}
        </Link>
      </strong>
      <div className="post-image-wrapper">
        <Image src={src} className="post-image" />
        <h2 className="title display-5 link-body-emphasis mb-2">{title}</h2>
      </div>
      <p className="blog-post-meta">
        <span className="fw-bold">
          {new Date(date).toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </span>
        <span className="mx-1">by</span>
        <Link to={`/author/${author._id}`} className="fw-bold">
          {author.name}
        </Link>
      </p>
      <p className="lead">{description}</p>
      <p className="lead mb-0">
        <Link to={`/post/${postId}`} className="text-body-emphasis fw-bold">
          {t('continueReading')}...
        </Link>
      </p>
    </article>
  );
};

export default Post;
