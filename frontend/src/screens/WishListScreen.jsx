import { useDispatch, useSelector } from 'react-redux';
import { Col, Container, ListGroup, Row, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Banner from '../components/Banner';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { removeFromWishList } from '../slices/wishListSlice';
import { addToCart } from '../slices/cartSlice';

const WishListScreen = () => {
  const dispatch = useDispatch();

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
      <Banner src="/uploads/image-1710576218997.webp" title="Wish List" />
      <Container>
        <Row>
          <Col>
            {wishListItems.length === 0 ? (
              <Message>
                Your Wish List is empty <Link to="/">Go Back</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {wishListItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={item.thumbnails[0]}
                          alt={item.name}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.currentPrice}</Col>
                      <Col md={2}></Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromWishListHandler(item._id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                      <Col md={2}>
                        <Button
                          type="button"
                          variant="primary"
                          onClick={() => addToCartHandler(item)}
                        >
                          Add to cart
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
