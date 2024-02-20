import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Product from '../components/Product.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate';
import Banner from '../components/Banner.jsx';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';

const ShopScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
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
          <Container className="my-4">
            <h1>Latest Products</h1>
            <Row>
              {data.products.map((product) => (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ''}
            />
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default ShopScreen;
