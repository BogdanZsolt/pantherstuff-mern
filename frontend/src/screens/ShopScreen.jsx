import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
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
import { useGetProductCategoriesQuery } from '../slices/productCategoriesApiSlice';
import { useGetProductCollectionsQuery } from '../slices/productCollectionsApiSlice';

const ShopScreen = () => {
  let { pageNumber, keyword, productCategory, productCollection } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }

  const { t, i18n } = useTranslation(['shop']);

  const [sort, setSort] = useState('-rating,-createdAt');
  const [category, setCategory] = useState([]);
  const [collection, setCollection] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);

  const { data: minmax, isLoading: isMinMaxLoading } =
    useGetProductsMinMaxPriceQuery();

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    sort,
    category_in: category.length > 0 ? category : undefined,
    collections_in: collection.length > 0 ? collection : undefined,
    sizes_in: sizes.length > 0 ? sizes : undefined,
    colors_in: colors.length > 0 ? colors : undefined,
    page,
    limit: 8,
    currentPrice_gte:
      i18n.language === 'en'
        ? minPrice === 0
          ? undefined
          : minPrice
        : undefined,
    currentPrice_lte:
      i18n.language === 'en'
        ? maxPrice === 0
          ? undefined
          : maxPrice
        : undefined,
    translations_hu_currentPrice_gte:
      i18n.language === 'en' ? undefined : minPrice,
    translations_hu_currentPrice_lte:
      i18n.language === 'en' ? undefined : maxPrice,
  });

  const {
    data: categories,
    isLoading: isCatLoading,
    error: catError,
  } = useGetProductCategoriesQuery({ sort: 'title' });

  const {
    data: collections,
    isLoading: isCollLoading,
    error: collError,
  } = useGetProductCollectionsQuery({ sort: 'title' });

  useEffect(() => {
    if (products) {
      products.pages < 1 ? setPages(1) : setPages(products.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [products, pages, page, pageNumber]);

  useEffect(() => {
    if (minmax) {
      setMinPrice(
        i18n.language === 'en' ? minmax[0].minPrice : minmax[0].minPrice_hu
      );
      setMaxPrice(
        i18n.language === 'en' ? minmax[0].maxPrice : minmax[0].maxPrice_hu
      );
    }
  }, [minmax, i18n.language]);

  useEffect(() => {
    if (productCategory === undefined) {
      setCategory([]);
    } else {
      setCategory(productCategory);
    }
  }, [productCategory]);

  useEffect(() => {
    if (productCollection === undefined) {
      setCollection([]);
    } else {
      setCollection(productCollection);
    }
  }, [productCollection]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {isMinMaxLoading && <Loader />}
      {isCatLoading ? (
        <Loader />
      ) : (
        catError && (
          <Message variant="danger">
            {catError?.data?.message || catError.error}
          </Message>
        )
      )}
      {isCollLoading ? (
        <Loader />
      ) : (
        collError && (
          <Message variant="danger">
            {collError?.data?.message || collError.error}
          </Message>
        )
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Banner
            title={t('shop')}
            src="/images/ecoprint-04.webp"
            alt="Shop Banner"
          />
          <Container className="my-4" fluid>
            <h2 className="text-center">{t('products')}</h2>
            <Button
              variant="primary"
              onClick={handleShow}
              className="d-lg-none filter-button"
            >
              <RiFilterLine />
            </Button>
            <Row>
              <Col lg={3} xxl={2}>
                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  scroll={true}
                  backdrop={false}
                  responsive="lg"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {minmax && (
                      <FilterSidebar
                        size={sizes}
                        setSize={setSizes}
                        categories={categories}
                        category={category}
                        setCategory={setCategory}
                        collections={collections}
                        collection={collection}
                        setCollection={setCollection}
                        min={
                          i18n.language === 'en'
                            ? minmax[0].minPrice
                            : minmax[0].minPrice_hu
                        }
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        max={
                          i18n.language === 'en'
                            ? minmax[0].maxPrice
                            : minmax[0].maxPrice_hu
                        }
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        colors={colors}
                        setColors={setColors}
                      />
                    )}
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>
              <Col xs={12} lg={9} xxl={10}>
                <Row className="align-items-center justify-content-between">
                  <Col>
                    {t('showingOfResults', {
                      length: products?.data?.length,
                      count: products?.count,
                    })}
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
                        {t('defaultSorting')}
                      </option>
                      <option value="-rating">{t('popular')}</option>
                      <option value="rating">{t('rating')}</option>
                      <option value="-createdAt">{t('latest')}</option>
                      <option
                        value={
                          i18n.language === 'en'
                            ? 'currentPrice'
                            : 'translations.hu.currentPrice'
                        }
                      >
                        {t('priceLowToHigh')}
                      </option>
                      <option
                        value={
                          i18n.language === 'en'
                            ? '-currentPrice'
                            : '-translations.hu.currentPrice'
                        }
                      >
                        {t('priceHighToLow')}
                      </option>
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
                  {products.data.length > 0 ? (
                    products.data.map((product) => (
                      <Col sm={6} md={4} xl={3} key={product._id}>
                        <Product product={product} />
                      </Col>
                    ))
                  ) : (
                    <p className="lead fw-semibold">
                      {t('thereAreNoItemsToDisplay')}
                    </p>
                  )}
                </Row>
                <Paginate
                  pages={pages}
                  page={page}
                  productCategory={productCategory}
                  productCollection={productCollection}
                  keyword={keyword ? keyword : ''}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
      ;
    </>
  );
};

export default ShopScreen;
