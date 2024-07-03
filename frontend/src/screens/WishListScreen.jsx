import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeFromWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice';
import { useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter';

const WishListScreen = () => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;

  const removeFromWishListHandler = async (id) => {
    dispatch(removeFromWishList(id));
  };

  const addToCartHandler = async (product) => {
    const qty = 1;
    dispatch(addToCart({ ...product, qty }));
    removeFromWishListHandler(product._id);
  };

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
                          src={item.thumbnails[0]}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>
                          {i18n.language == 'en'
                            ? item.name
                            : item.translations?.hu?.name || item.name}
                        </Link>
                      </Col>
                      <Col md={2}>
                        {toCurrency(
                          i18n.language,
                          i18n.language === 'en'
                            ? item.currentPrice
                            : item.translations?.hu?.currentPrice ||
                                item.currentPrice
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
