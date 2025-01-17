import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  RiHeartFill,
  RiHeartLine,
  RiShoppingBagLine,
  RiStarLine,
} from 'react-icons/ri';
import { PiStudent } from 'react-icons/pi';
import Rating from './Rating';
import { getDateMMDDYY, toCurrency, uuid } from '../utils/converter';
import { toggleWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice';

const Course = ({ course, date, purchased, orderId }) => {
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
    const { _id, title: name, currentPrice, images } = course;
    const name_hu = course.translations?.hu?.title || course.title;
    const currentPrice_hu =
      course.translations?.hu?.currentPrice || course.currentPrice;
    const thumbnail = images[0];
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
    const { _id, title: name, currentPrice, images } = course;
    const cartId = uuid();
    const name_hu = course.translations?.hu?.title || name;
    const currentPrice_hu =
      course.translations?.hu?.currentPrice || currentPrice;
    const qty = 1;
    const thumbnail = images[0];
    const toBeDelivered = false;
    const type = 'course';
    dispatch(
      addToCart({
        cartId,
        _id,
        type,
        name,
        name_hu,
        thumbnail,
        currentPrice,
        currentPrice_hu,
        qty,
        toBeDelivered,
      })
    );
  };

  return (
    <Card className="my-3 rounded shadow card-course" border="secondary">
      <Link to={`/course/${course._id}`}>
        <div className="img-container">
          <Card.Img
            src={course.images[0]}
            variant="top"
            className="course-img"
          />
          {course.images.length > 1 && (
            <Card.Img
              src={course.images[1]}
              variant="top"
              className="hover-img course-img"
            />
          )}
          <ul className="card-data">
            <li>
              <button>
                <RiStarLine />
              </button>
            </li>
            {!purchased && (
              <li>
                <button
                  onClick={addToWishListHandler}
                  title={t('addToWishList')}
                >
                  {isWishListed(course._id) ? <RiHeartFill /> : <RiHeartLine />}
                </button>
              </li>
            )}
            {!purchased && (
              <li>
                <button onClick={addToCartHandler} title={t('addToCart')}>
                  <RiShoppingBagLine />
                </button>
              </li>
            )}
            {purchased && (
              <li>
                <Link
                  to={`/classroom/${course._id}`}
                  title={t('toTheClassroom')}
                >
                  <PiStudent />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </Link>
      <Card.Body>
        <Link to={`/course/${course._id}`}>
          <Card.Title as="div" className="course-title">
            <strong className="h4 fw-bolder">
              {i18n.language === 'en'
                ? course.title
                : course.translations?.hu?.title || course.title}
            </strong>
          </Card.Title>
        </Link>

        {/* <Card.Text as="div">
          <p className="lead">{course.description}</p>
        </Card.Text> */}

        {purchased ? (
          <Card.Text as="div" className="mb-3">
            <Link to={`/order/${orderId}`}>
              <Trans
                values={{ date: getDateMMDDYY(date, i18n.language, true) }}
              >
                {t('youPurchasedThisCourse')}
              </Trans>
            </Link>
          </Card.Text>
        ) : (
          <Card.Text as="div" className="mb-3">
            <Rating
              value={course.rating}
              text={`${course.numReviews} reviews`}
            />
          </Card.Text>
        )}

        {!purchased && (
          <Card.Text as="div" className="h3">
            {i18n.language === 'en'
              ? toCurrency(i18n.language, course.currentPrice)
              : toCurrency(
                  i18n.language,
                  course.translations?.hu?.currentPrice || course.currentPrice
                )}
          </Card.Text>
        )}
        {purchased && (
          <div>
            <Link to={`/classroom/${course._id}`} className="btn btn-primary">
              {t('toTheClassroom')}
            </Link>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Course;
