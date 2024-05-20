import { useEffect, useState } from 'react';
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
import {
  useGetProductsQuery,
  useGetProductsMinMaxPriceQuery,
} from '../slices/productsApiSlice.js';

const ShopScreen = () => {
  let { pageNumber, keyword } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }

  const [sort, setSort] = useState('-rating,-createdAt');
  const [category, setCategory] = useState(undefined);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);

  const { data: minmax, isLoading: isMinMaxLoading } =
    useGetProductsMinMaxPriceQuery();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    sort,
    category,
    page,
    limit: 8,
    currentPrice_gte: minPrice === 0 ? undefined : minPrice,
    currentPrice_lte: maxPrice === 0 ? undefined : maxPrice,
  });

  useEffect(() => {
    if (products) {
      setPages(products.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [products, pages, page, pageNumber]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(`pages: ${pages}, page: ${page}`);

  return (
    <>
      {isMinMaxLoading && <Loader />}
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
                <FilterSidebar
                  category={category}
                  setCategory={setCategory}
                  min={minmax[0].minPrice}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  max={minmax[0].maxPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                />
              </Col>
              <Col xs={12} lg={9} xxl={10}>
                <Row className="align-items-center justify-content-between">
                  <Col>
                    Showing {products?.data?.length} of {products?.count}{' '}
                    results
                  </Col>
                  <Col
                    sm={7}
                    md={6}
                    xxl={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Form.Select
                      aria-label="Default sorting"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="-rating,-createdAt">
                        Default sorting
                      </option>
                      <option value="-rating">Popular</option>
                      <option value="rating">Rating</option>
                      <option value="-createdAt">Latest</option>
                      <option value="currentPrice">Price low to high</option>
                      <option value="-currentPrice">Price high to low</option>
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
                  {products.data.map((product) => (
                    <Col sm={6} md={4} xl={3} key={product._id}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={pages}
                  page={page}
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
              <FilterSidebar
                category={category}
                setCategory={setCategory}
                min={minmax[0].minPrice}
                minPrice={minPrice}
                setMinPrice={setMinPrice}
                max={minmax[0].maxPrice}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
              />
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
      ;
    </>
  );
};

export default ShopScreen;
