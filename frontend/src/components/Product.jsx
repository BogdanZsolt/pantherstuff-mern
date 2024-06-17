import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiStarLine,
  RiShoppingBagLine,
  RiHeartLine,
  RiHeartFill,
  // PiStarFourLight,
  // PiStarFourFill,
} from 'react-icons/ri';
import Rating from './Rating';
import { addToCart } from '../slices/cartSlice';
import { toggleWishList } from '../slices/wishListSlice';
import { useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter.js';

const Product = ({ product }) => {
  const { t, i18n } = useTranslation(['shop']);

  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;

  const isWishListed = (productId) => {
    const content = wishListItems.find((x) => x._id === productId);

    return content?._id === productId ? true : false;
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const qty = 1;
    dispatch(addToCart({ ...product, qty }));
  };

  const addToWishListHandler = (e) => {
    e.preventDefault();
    dispatch(toggleWishList({ ...product }));
  };

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
              <button onClick={addToWishListHandler} title={t('addToWishList')}>
                {isWishListed(product._id) ? <RiHeartFill /> : <RiHeartLine />}
              </button>
            </li>
            <li>
              <button onClick={addToCartHandler} title={t('addToCart')}>
                <RiShoppingBagLine />
              </button>
            </li>
          </ul>
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>
              {i18n.language === 'en'
                ? product.name
                : product.translations?.hu?.name || product.name}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text as="h3">
          {i18n.language === 'en'
            ? toCurrency(i18n.language, product.currentPrice)
            : toCurrency(
                i18n.language,
                product.translations?.hu?.currentPrice || product.currentPrice
              )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
