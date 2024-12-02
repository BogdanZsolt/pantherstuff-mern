import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiHeartFill,
  RiHeartLine,
  RiShoppingBagLine,
  RiStarLine,
} from 'react-icons/ri';
import Rating from './Rating';
import { toCurrency, uuid } from '../utils/converter';
import { toggleWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice';

const Course = ({ course }) => {
  const { t, i18n } = useTranslation(['course']);

  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;

  const isWishListed = (courseId) => {
    const content = wishListItems.find((x) => x._id === courseId);

    return content?._id === courseId ? true : false;
  };

  const addToWishListHandler = (e) => {
    e.preventDefault();
    const { _id, title: name, currentPrice, image } = course;
    const name_hu = course.translations?.hu?.title || course.title;
    const currentPrice_hu =
      course.translations?.hu?.currentPrice || course.currentPrice;
    const thumbnail = image;
    const type = 'course';
    dispatch(
      toggleWishList({
        _id,
        type,
        name,
        name_hu,
        currentPrice,
        currentPrice_hu,
        thumbnail,
      })
    );
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    const { _id, title: name, currentPrice, image } = course;
    const cartId = uuid();
    const name_hu = course.translations?.hu?.title || course.title;
    const currentPrice_hu =
      course.translations?.hu?.currentPrice || course.currentPrice;
    const qty = 1;
    const thumbnail = image;
    const toBeDelivered = false;
    const type = 'course';
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
        toBeDelivered,
      })
    );
  };

  return (
    <Card className="my-3 rounded" border="secondary">
      <Link to={`/onlinecourses/${course._id}`}>
        <Card.Img src={course.image} variant="top" className="course-img" />
        <Card.ImgOverlay>
          <div className="overlay-actions">
            <ul className="d-flex justify-content-center">
              <li>
                <button>
                  <RiStarLine />
                </button>
              </li>
              <li>
                <button
                  onClick={addToWishListHandler}
                  title={t('addToWishList')}
                >
                  {isWishListed(course._id) ? <RiHeartFill /> : <RiHeartLine />}
                </button>
              </li>
              <li>
                <button onClick={addToCartHandler} title={t('addToCart')}>
                  <RiShoppingBagLine />
                </button>
              </li>
            </ul>
          </div>
        </Card.ImgOverlay>
      </Link>
      <Card.Body>
        <Link to={`/onlinecourses/${course._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>
              {i18n.language === 'en'
                ? course.title
                : course.translations?.hu?.title || course.title}
            </strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <p className="lead">{course.description}</p>
        </Card.Text>

        <Card.Text as="div">
          <Rating value={course.rating} text={`${course.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">
          {i18n.language === 'en'
            ? toCurrency(i18n.language, course.currentPrice)
            : toCurrency(
                i18n.language,
                course.translations?.hu?.currentPrice || course.currentPrice
              )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Course;
