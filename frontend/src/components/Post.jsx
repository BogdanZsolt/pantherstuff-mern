import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, Image } from 'react-bootstrap';
import { toLocalDate } from '../utils/converter';
// import { RiArrowRightSLine } from 'react-icons/ri';

const Post = ({ postId, src, category, author, title, description, date }) => {
  const { t, i18n } = useTranslation(['blog']);

  return (
    <Card>
      {/* <Card.Header
        as="strong"
        className="text-primary-emphasis text-start lead d-inline-block"
      ></Card.Header> */}
      <div className="post-image-wrapper">
        <Image src={src} className="post-image" />
        <h3 className="title fs-2 link-body-emphasis mb-2">{title}</h3>
      </div>
      <Card.Body>
        <div className="d-flex flex-column mb-3">
          <div className="blog-post-meta">
            <span className="fw-bold">{toLocalDate(i18n.language, date)}</span>
            <span className="mx-1">by</span>
            <Link to={`/author/${author?._id}`} className="fw-bold">
              {author?.name}
            </Link>
          </div>
          <Link
            to={category?._id ? `/category/${category?._id}` : ''}
            className="text-start"
          >
            <span>
              <b>
                {i18n.language === 'en'
                  ? category?.title
                    ? category?.title
                    : 'Uncategorized'
                  : category?.translations?.hu?.title
                  ? category?.translations?.hu?.title
                  : t('uncategorized')}
              </b>
            </span>
          </Link>
        </div>
        <Card.Text as="p" className="lead text-start">
          {description}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Link
          to={`/post/${postId}`}
          className="lead text-body-emphasis fw-bold text-start"
        >
          {t('continueReading')}...
        </Link>
      </Card.Footer>

      {/* <p className="lead mb-0"></p> */}
    </Card>
  );
};

export default Post;
