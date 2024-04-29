import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  RiStarLine,
  RiArrowLeftRightLine,
  RiShoppingBagLine,
} from 'react-icons/ri';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded" border="secondary">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.thumbnails[0]} variant="top" />
        <Card.Img
          src={product.thumbnails[1]}
          variant="top"
          className="hover-img"
        />
        <div className="actions">
          <ul>
            <li>
              <button>
                <RiStarLine />
              </button>
            </li>
            <li>
              <button>
                <RiArrowLeftRightLine />
              </button>
            </li>
            <li>
              <button>
                <RiShoppingBagLine />
              </button>
            </li>
          </ul>
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">${product.currentPrice}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
