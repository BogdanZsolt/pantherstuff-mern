import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  ButtonGroup,
  Offcanvas,
} from 'react-bootstrap';
import Banner from '../components/Banner.jsx';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import Event from '../components/Event.jsx';
import {
  RiFilterLine,
  RiLayoutGridLine,
  RiLayoutMasonryLine,
  RiListCheck2,
  RiPauseMiniLine,
} from 'react-icons/ri';
import EventFilterSidebar from '../components/EventFilterSidebar.jsx';
import { toast } from 'react-toastify';
import Paginate from '../components/Paginate.jsx';
import {
  useGetEventsQuery,
  useGetEventsMinMaxPriceQuery,
} from '../slices/eventsApiSlice.js';
import { useGetEventCategoriesQuery } from '../slices/eventCategoriesApiSlice.js';

const EventsScreen = () => {
  let { pageNumber, keyword, category } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }
  const { t, i18n } = useTranslation(['event']);

  const [sort, setSort] = useState('startDate');
  const [eventCategory, setEventCategory] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);

  const {
    data: minmax,
    isLoading: isLoadingMinMax,
    isError: isErrorMinMax,
    error: errorMinMax,
  } = useGetEventsMinMaxPriceQuery();

  const {
    data: events,
    isLoading,
    isError,
    error,
  } = useGetEventsQuery({
    sort,
    category_in: eventCategory.length > 0 ? eventCategory : undefined,
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
    startDate_gte: dateRange[0]
      ? new Date(dateRange[0]).toString()
      : Date(Date.now()),
    startDate_lte: dateRange[1] ? new Date(dateRange[1]).toString() : undefined,
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useGetEventCategoriesQuery({ sort: 'title' });

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
    if (events) {
      events.pages < 1 ? setPages(1) : setPages(events.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [events, pages, page, pageNumber]);

  useEffect(() => {
    if (category === undefined) {
      setEventCategory([]);
    } else {
      setEventCategory(category.split(','));
    }
  }, [category]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Banner
        src="/images/ecoprint-06.webp"
        title={t('eventTitle')}
        alt="Events Banner"
      />
      {isLoadingMinMax ? (
        <Loader />
      ) : (
        isErrorMinMax &&
        toast.error(errorMinMax?.data?.message || errorMinMax?.error)
      )}
      {isLoadingCategories ? (
        <Loader />
      ) : (
        isErrorCategories &&
        toast.danger(errorCategories?.data?.message || errorCategories.error)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data.message || error.error}</Message>
      ) : (
        <>
          <Container className="my-4" fluid>
            <h2 className="text-center">{t('events')}</h2>
            <Button
              variant="primary"
              onClick={handleShow}
              className="d-lg-none filter-button"
            >
              <RiFilterLine />
            </Button>
            <Row>
              <Col xs lg={3} xxl={2}>
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
                    {events && (
                      <EventFilterSidebar
                        categories={categories}
                        category={eventCategory}
                        setCategory={setEventCategory}
                        dateRange={dateRange}
                        setDateRange={setDateRange}
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
                  </Offcanvas.Body>
                </Offcanvas>
              </Col>
              <Col xs={12} lg={9} xxl={10}>
                <Row className="align-items-center justify-content-between">
                  <Col>
                    <Trans
                      values={{
                        length: events?.data?.length,
                        count: events?.count,
                      }}
                    >
                      {t('showingOfResults')}
                    </Trans>
                  </Col>
                  <Col
                    sm={12}
                    md={6}
                    xxl={4}
                    className="d-flex align-items-center justify-content-end"
                  >
                    <Form.Select
                      aria-label="Default sorting"
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                    >
                      <option value="startDate,-rating">
                        {t('defaultSorting')}
                      </option>
                      <option value="startDate">
                        {t('inOrderOfStartTime')}
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
                    <ButtonGroup className="d-none d-md-inline-flex">
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
                <Row className="pt-5 pe-3">
                  {events.data.length > 0 ? (
                    events.data.map((event) => (
                      <Col
                        lg={6}
                        xxl={4}
                        style={{ padding: '50px 25px' }}
                        key={event._id}
                      >
                        <Event event={event} className="mx-auto mx-lg-2" />
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
                  pageName="event"
                  category={eventCategory.join(',')}
                  keyword={keyword ? keyword : ''}
                />
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default EventsScreen;
