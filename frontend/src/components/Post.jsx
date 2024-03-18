import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';

const ArticleCard = ({ postId, src, title, description, date }) => {
  return (
    <div className="row g-0 border border-secondary rounded overflow-hidden flex-md-row mb-4 shadow-md h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <strong className="d-inline-block mb-2 text-primary-emphasis">
          World
        </strong>
        <Link to={`/post/${postId}`}>
          <h3 className="mb-0">{title}</h3>
        </Link>
        <div className="mb-1 text-body-secondary">
          {new Date(date).toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <p className="card-text mb-auto">{description}</p>
        <Link
          to={`/post/${postId}`}
          className="icon-link gap-1 icon-link-hover"
        >
          Continue reading
          <RiArrowRightSLine style={{ fontSize: '1.875rem' }} />
        </Link>
      </div>
      <Link
        to={`/post/${postId}`}
        className="col-auto d-block"
        style={{ width: '250px', height: '250px' }}
      >
        <img src={src} alt="post" />
      </Link>
    </div>
  );
};

export default ArticleCard;
