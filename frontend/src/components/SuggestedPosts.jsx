import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SuggestedPosts = ({ className, header, posts = [], tags = [] }) => {
  return (
    <div className={`w-100 shadow rounded rounded-2 ${className}`}>
      <h2>{header}</h2>
      {posts.map((item, index) => (
        <Row className="my-3" key={index}>
          <Col xs={4}>
            <img
              src={item.bannerImage}
              alt={item.title}
              className="suggested-image"
            />
          </Col>
          <Col
            xs={8}
            className="d-flex flex-column align-items-start justify-content-center"
          >
            <span>{item.user.name}</span>
            <Link to={`/post/${item._id}`}>
              <span className="fw-semibold" style={{ fontSize: '1rem' }}>
                {item.title}
              </span>
            </Link>
            <span
              className="text-secondary"
              style={{ fontSize: '0.875rem', '--bs-text-opacity': '0.8' }}
            >
              {new Date(item.createdAt).toLocaleDateString('hu-HU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </Col>
        </Row>
      ))}
      <h2>Tags</h2>
      <Row>
        {tags.map((item, index) => (
          <Col key={index}>
            <Link
              to="/"
              className="d-inline-block rounded-2 shadow px-3 py-1 bg-secondary text-primary m-1"
            >
              {item}
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SuggestedPosts;
