import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeFromWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice';
import { useTranslation } from 'react-i18next';
import { toCurrency, uuid } from '../utils/converter';

const WishListScreen = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;

  const removeFromWishListHandler = async (id) => {
    dispatch(removeFromWishList(id));
  };

  const addToCartHandler = async (item) => {
    const qty = 1;
    const cartId = uuid();
    dispatch(addToCart({ ...item, cartId, qty }));
    removeFromWishListHandler(item._id);
  };

  console.log(wishList);

  return (
    <>
      <Banner src="/uploads/image-1710576218997.webp" title={t('wishlist')} />
      <Container>
        <Row>
          <Col>
            {wishListItems.length === 0 ? (
              <Message>
                {t('yourWishListIsEmpty')} <Link to="/shop">{t('goBack')}</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {wishListItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center gap-2 gap-md-0">
                      <Col md={1}>
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/${item.type}/${item._id}`}>
                          {i18n.language == 'en' ? item.name : item.name_hu}
                        </Link>
                      </Col>
                      <Col md={2}>
                        {toCurrency(
                          i18n.language,
                          i18n.language === 'en'
                            ? item.currentPrice
                            : item.currentPrice_hu
                        )}
                      </Col>
                      <Col md={2}></Col>
                      <Col md={2}>
                        <Button
                          title={t('removeItem')}
                          type="button"
                          variant="primary"
                          onClick={() => removeFromWishListHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                      <Col md={2}>
                        <Button
                          title={t('addItemToCart')}
                          type="button"
                          variant="primary"
                          onClick={() => addToCartHandler(item)}
                        >
                          {t('addToCart')}
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WishListScreen;
