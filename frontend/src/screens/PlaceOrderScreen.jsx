import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Container,
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import Banner from '../components/Banner';
import CheckoutSteps from '../components/CheckoutSteps';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import { useTranslation } from 'react-i18next';
import { toCurrency } from '../utils/converter';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { t, i18n } = useTranslation();

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.billingAddress.address) {
      navigate('/billing');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [
    cart.paymentMethod,
    cart.shippingAddress.address,
    cart.billingAddress.address,
    navigate,
  ]);

  const createItems = (items) => {
    let newItems = [];
    items.map((item) => {
      let newItem = {};
      newItem._id = item._id;
      newItem.type = item.type;
      newItem.name = i18n.language === 'en' ? item.name : item.name_hu;
      newItem.qty = item.qty;
      newItem.thumbnail = item.thumbnail;
      newItem.currentPrice =
        i18n.language === 'en' ? item.currentPrice : item.currentPrice_hu;
      newItems = [...newItems, newItem];
    });
    return newItems;
  };

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        language: i18n.language,
        orderItems: createItems(cart.cartItems),
        shippingAddress: cart.shippingAddress,
        billingAddress: cart.billingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice:
          i18n.language === 'en' ? cart.itemsPrice : cart.itemsPrice_hu,
        shippingPrice:
          i18n.language === 'en' ? cart.shippingPrice : cart.shippingPrice_hu,
        taxPrice: i18n.language === 'en' ? cart.taxPrice : cart.taxPrice_hu,
        totalPrice:
          i18n.language === 'en' ? cart.totalPrice : cart.totalPrice_hu,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <Banner title={t('order')} />
      <Container>
        <CheckoutSteps step1 step2 step3 step4 step5 />
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{t('shipping')}</h2>
                <p>
                  <strong>{t('address')}: </strong>
                  {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                  {cart.shippingAddress.postalCode},{' '}
                  {cart.shippingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>{t('billing')}</h2>
                <p>
                  <strong>{t('address')}: </strong>
                  {cart.billingAddress.address}, {cart.billingAddress.city}{' '}
                  {cart.billingAddress.postalCode},{' '}
                  {cart.billingAddress.country}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>{t('paymentMethod')}</h2>
                <strong>{t('method')}: </strong>
                {cart.paymentMethod}
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>{t('orderItems')}</h2>
                {cart.cartItems.length === 0 ? (
                  <Message>{'yourCartIsEmpty'}</Message>
                ) : (
                  <ListGroup variant="flush">
                    {cart.cartItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.thumbnail}
                              alt={
                                i18n.language === 'en'
                                  ? item.name
                                  : item.name_hu
                              }
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/${item.type}/${item._id}`}>
                              {i18n.language === 'en'
                                ? item.name
                                : item.name_hu}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} x{' '}
                            {toCurrency(
                              i18n.language,
                              i18n.language === 'en'
                                ? item.currentPrice
                                : item.currentPrice_hu
                            )}
                            {' = '}
                            {toCurrency(
                              i18n.language,
                              (item.qty *
                                ((i18n.language === 'en'
                                  ? item.currentPrice
                                  : item.currentPrice_hu) *
                                  100)) /
                                100
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>{t('orderSummary')}</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('items')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.itemsPrice
                          : cart.itemsPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('shipping')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.shippingPrice
                          : cart.shippingPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('tax')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.taxPrice
                          : cart.taxPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>{t('total')}:</Col>
                    <Col>
                      {toCurrency(
                        i18n.language,
                        i18n.language === 'en'
                          ? cart.totalPrice
                          : cart.totalPrice_hu
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    error && (
                      <Message variant="danger">
                        {error?.data?.message || error.error}
                      </Message>
                    )
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems.length === 0}
                    onClick={placeOrderHandler}
                  >
                    {t('placeOrder')}
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

export default PlaceOrderScreen;
