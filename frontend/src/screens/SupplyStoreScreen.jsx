import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Col,
  Container,
  Row,
  Form,
  ButtonGroup,
  Button,
  Offcanvas,
} from 'react-bootstrap';
import {
  RiFilterLine,
  RiPauseMiniLine,
  RiListCheck2,
  RiLayoutGridLine,
  RiLayoutMasonryLine,
} from 'react-icons/ri';
import Banner from '../components/Banner';
import { useTranslation } from 'react-i18next';
import SupplyFilterSidebar from '../components/SupplyFilterSidebar';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Paginate from '../components/Paginate.jsx';
import Supply from '../components/Supply.jsx';
import {
  useGetSuppliesMinMaxPriceQuery,
  useGetSuppliesQuery,
} from '../slices/suppliesApiSlice.js';

const SupplyStoreScreen = () => {
  const { pageNumber, keyword, supplyCategory } = useParams;
  const { t, i18n } = useTranslation(['supply']);

  const [sort, setSort] = useState('-rating,-createdAt');
  const [category, setCategory] = useState(supplyCategory || '');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [sizes, setSizes] = useState([]);

  const { data: minmax, isLoading: isMinMaxLoading } =
    useGetSuppliesMinMaxPriceQuery();

  const {
    data: supplies,
    isLoading,
    error,
  } = useGetSuppliesQuery({
    sort,
    category: category === '' ? undefined : category,
    sizes_in: sizes.length > 0 ? sizes : undefined,
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

  useEffect(() => {
    if (supplies) {
      supplies.pages < 1 ? setPages(1) : setPages(supplies.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [supplies, pages, page, pageNumber]);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            title={t('supplyStore')}
            src="/images/ecoprint-04.webp"
            alt="Supply Store Banner"
          />
          <Container className="my-4" fluid>
            <h2 className="text-center">{t('supplies')}</h2>
            <Row>
              <Col lg={3} xxl={2} className="d-none d-lg-block">
                {minmax && (
                  <SupplyFilterSidebar
                    size={sizes}
                    setSize={setSizes}
                    category={category}
                    setCategory={setCategory}
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
                  />
                )}
              </Col>
              <Col xs={12} lg={9} xxl={10}>
                <Row className="align-items-center justify-content-between">
                  <Col>
                    {t('showingOfResults', {
                      length: supplies?.data?.length,
                      count: supplies?.count,
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
                  {supplies.data.length > 0 ? (
                    supplies.data.map((supply) => (
                      <Col sm={6} md={4} xl={3} key={supply._id}>
                        <Supply supply={supply} />
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
                  pageName="supplylist"
                  productCategory={supplyCategory}
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
            responsive="lg"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Offcanvas</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {minmax && (
                <SupplyFilterSidebar
                  size={sizes}
                  setSize={setSizes}
                  category={category}
                  setCategory={setCategory}
                  min={minmax[0].minPrice}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  max={minmax[0].maxPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  className="d-lg-none"
                />
              )}
            </Offcanvas.Body>
          </Offcanvas>
        </>
      )}
    </>
  );
};

export default SupplyStoreScreen;
