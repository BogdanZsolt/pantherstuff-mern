import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Offcanvas,
  Button,
  Form,
  ButtonGroup,
} from 'react-bootstrap';
import {
  RiFilterLine,
  RiPauseMiniLine,
  RiListCheck2,
  RiLayoutGridLine,
  RiLayoutMasonryLine,
} from 'react-icons/ri';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate';
import Banner from '../components/Banner.jsx';
import FilterSidebar from '../components/FilterSidebar.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const ShopScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner
            title="shop"
            src="/images/ecoprint-04.webp"
            alt="Shop Banner"
          />
          <Container className="my-4" fluid>
            <h2 className="text-center">Products</h2>
            <Row>
              <Col lg={3} xxl={2} className="d-none d-lg-block">
                <FilterSidebar />
              </Col>
              <Col xs={12} lg={9} xxl={10}>
                <Row className="align-items-center justify-content-between">
                  <Col>Showing 9 of 34 results</Col>
                  <Col
                    sm={7}
                    md={6}
                    xxl={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Form.Select aria-label="Default sorting">
                      <option value="0">Default sorting</option>
                      <option value="1">Popular</option>
                      <option value="2">Rating</option>
                      <option value="3">Latest</option>
                      <option value="4">Price low to high</option>
                      <option value="4">Price high to low</option>
                    </Form.Select>
                    <ButtonGroup>
                      <Button>
                        <RiPauseMiniLine />
                      </Button>
                      <Button>
                        <RiListCheck2 />
                      </Button>
                      <Button>
                        <RiLayoutGridLine />
                      </Button>
                      <Button>
                        <RiLayoutMasonryLine />
                      </Button>
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row>
                  {data.products.map((product) => (
                    <Col sm={6} md={4} xl={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={data.pages}
                  page={data.page}
                  keyword={keyword ? keyword : ''}
                />
              </Col>
            </Row>
          </Container>
          <Button
            variant="primary"
            onClick={handleShow}
            className="d-lg-none position-fixed start-0 top-50 rounded-circle p-2 lh-1"
          >
            <RiFilterLine />
          </Button>
          <Offcanvas
            show={show}
            onHide={handleClose}
            scroll={true}
            backdrop={false}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              Some text as placeholder. In real life you can have the elements
              you have chosen. Like, text, images, lists, etc.
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
      ;
    </>
  );
};

export default ShopScreen;
