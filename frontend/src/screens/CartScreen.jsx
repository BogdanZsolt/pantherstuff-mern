import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from 'react-bootstrap';
import { toCurrency } from '../utils/converter';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import Banner from '../components/Banner';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (product) => {
    dispatch(removeFromCart({ ...product }));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <>
      <Banner src="/images/ecoprint-01.webp" title={t('shoppingCart')} />
      <Container>
        <Row>
          <Col md={8}>
            {/* <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1> */}
            {cartItems.length === 0 ? (
              <Message>
                {t('yourCartIsEmpty')} <Link to="/shop">{t('goBack')}</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col sm={2}>
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col className="my-2 my-md-0">
                        <Link to={`/${item.type}/${item._id}`}>
                          {i18n.language === 'en' ? item.name : item.name_hu}
                        </Link>
                      </Col>
                      <Col className="my-2 my-md-0">
                        {toCurrency(
                          i18n.language,
                          i18n.language === 'en'
                            ? item.currentPrice
                            : item.currentPrice_hu
                        )}
                      </Col>
                      <Col className="my-2 my-md-0">
                        <Form.Control
                          as="select"
                          value={item.qty}
                          onChange={(e) => {
                            addToCartHandler(item, Number(e.target.value));
                          }}
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col className="my-2 my-md-0">
                        <div
                          className="product-color"
                          style={{ backgroundColor: item.color }}
                        ></div>
                      </Col>
                      <Col className="my-2 my-md-0">
                        <div className="product-size">{item.size?.title}</div>
                      </Col>
                      <Col className="mt-2 my-mt-0">
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    {t('subtotal', {
                      count: cartItems.reduce((acc, item) => acc + item.qty, 0),
                    })}
                  </h2>
                  {toCurrency(
                    i18n.language,
                    i18n.language === 'en'
                      ? cartItems
                          .reduce(
                            (acc, item) => acc + item.qty * item.currentPrice,
                            0
                          )
                          .toFixed(2)
                      : cartItems
                          .reduce(
                            (acc, item) =>
                              acc +
                              item.qty *
                                (item.currentPrice_hu || item.currentPrice),
                            0
                          )
                          .toFixed(0)
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    {t('proceedToCheckout')}
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
