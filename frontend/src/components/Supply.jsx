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
import { toCurrency, uuid } from '../utils/converter.js';

const Supply = ({ supply }) => {
  const { t, i18n } = useTranslation(['supply']);

  console.log(supply);

  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;

  const isWishListed = (supplyId) => {
    const content = wishListItems.find((x) => x._id === supplyId);

    return content?._id === supplyId ? true : false;
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const { _id, name, currentPrice, thumbnails, countInStock, toBeDelivered } =
      supply;
    const cartId = uuid();
    const name_hu = supply.translations?.hu?.name || supply.name;
    const currentPrice_hu =
      supply.translations?.hu?.currentPrice || supply.currentPrice;
    const qty = 1;
    const thumbnail = thumbnails[0];
    const type = 'supply';
    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        currentPrice,
        currentPrice_hu,
        thumbnail,
        qty,
        countInStock,
        toBeDelivered,
      })
    );
  };

  const addToWishListHandler = (e) => {
    e.preventDefault();
    const { _id, name, currentPrice, thumbnails, toBeDelivered } = supply;
    const name_hu = supply.translations?.hu?.name || supply.name;
    const currentPrice_hu =
      supply.translations?.hu?.currentPrice || supply.currentPrice;
    const thumbnail = thumbnails[0];
    const type = 'supply';
    dispatch(
      toggleWishList({
        _id,
        type,
        name,
        name_hu,
        currentPrice,
        currentPrice_hu,
        thumbnail,
        toBeDelivered,
      })
    );
  };

  return (
    <Card className="my-3 rounded shadow card-supply" border="secondary">
      <Link to={`/supply/${supply._id}`}>
        <div className="img-container">
          <Card.Img
            src={supply.thumbnails[0]}
            variant="top"
            className="supply-img"
          />
          {supply.thumbnails.length > 1 && (
            <Card.Img
              src={supply.thumbnails[1]}
              variant="top"
              className="hover-img supply-img"
            />
          )}
          <ul className="card-data">
            <li>
              <button>
                <RiStarLine />
              </button>
            </li>
            <li>
              <button onClick={addToWishListHandler} title={t('addToWishList')}>
                {isWishListed(supply._id) ? <RiHeartFill /> : <RiHeartLine />}
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
        <Link to={`/supply/${supply._id}`}>
          <Card.Title as="div" className="supply-title">
            <strong className="h4 fw-bold">
              {i18n.language === 'en'
                ? supply.name
                : supply.translations?.hu?.name || supply.name}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <Rating value={supply.rating} text={`${supply.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3" className="text-center">
          {i18n.language === 'en'
            ? toCurrency(i18n.language, supply.currentPrice)
            : toCurrency(
                i18n.language,
                supply.translations?.hu?.currentPrice || supply.currentPrice
              )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Supply;
