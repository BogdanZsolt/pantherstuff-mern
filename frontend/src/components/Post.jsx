import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

const ArticleCard = ({ postId, src, title, description, author, date }) => {
  return (
    <Card className="article-card flex-column flex-md-row">
      <Link to={`/post/${postId}`}>
        <Card.Img src={src} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/post/${postId}`}>
          <Card.Title className="fw-bold">{title}</Card.Title>
        </Link>
        <Card.Text>
          {description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          facilis repudiandae velit qui doloribus, ipsam illum iusto deleniti
          sapiente voluptatum iste soluta commodi itaque atque perspiciatis
          ullam voluptatibus. Amet, placeat.
        </Card.Text>
        <Card.Text>
          <span className="d-flex justify-content-between align-items-center">
            <span className="fw-bold">{author} </span>
            {new Date(date).toLocaleDateString('hu-HU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </Card.Text>
        <span className="d-flex justify-content-end align-items-end">
          <LinkContainer to={`/post/${postId}`}>
            <Button>Read more</Button>
          </LinkContainer>
        </span>
      </Card.Body>
    </Card>
  );
};

export default ArticleCard;
