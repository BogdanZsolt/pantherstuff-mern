import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Button,
  Container,
} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import {
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from '../../slices/ordersApiSlice';
import { toCurrency } from '../../utils/converter';

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { i18n } = useTranslation();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const deliverOrderHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <>
        <Container className="mt-5">
          <Link to="/admin/orderlist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Order Id: {order._id}</h2>
          </Row>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong> {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong> {order.user.email}
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address},{' '}
                    {order.shippingAddress.city}{' '}
                    {order.shippingAddress.postalCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on{order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on{order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Order Items</h2>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.thumbnail}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x{' '}
                          {toCurrency(order.language, item.currentPrice)} =
                          {toCurrency(
                            order.language,
                            item.qty * item.currentPrice
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>Order Summary</h2>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>{toCurrency(order.language, order.itemsPrice)}</Col>
                    </Row>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>
                        {toCurrency(order.language, order.shippingPrice)}
                      </Col>
                    </Row>
                    <Row>
                      <Col>Tax</Col>
                      <Col>{toCurrency(order.language, order.taxPrice)}</Col>
                    </Row>
                    <Row>
                      <Col>Total</Col>
                      <Col>{toCurrency(i18n.language, order.totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>
                  {/* PAY ORDER PLACEHOLDER */}

                  {loadingDeliver && <Loader />}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <ListGroup.Item>
                        <Button
                          type="button"
                          className="btn btn-block"
                          onClick={deliverOrderHandler}
                        >
                          Mark As Delivered
                        </Button>
                      </ListGroup.Item>
                    )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    </>
  );
};

export default OrderScreen;
