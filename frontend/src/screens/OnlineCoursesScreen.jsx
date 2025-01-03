import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Container,
  Row,
  Form,
  ButtonGroup,
  Button,
  Offcanvas,
} from 'react-bootstrap';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import {
  RiFilterLine,
  RiLayoutGridLine,
  RiLayoutMasonryLine,
  RiListCheck2,
  RiPauseMiniLine,
} from 'react-icons/ri';
import Course from '../components/Course.jsx';
import CourseFilterSidebar from '../components/CourseFilterSidebar.jsx';
import Paginate from '../components/Paginate.jsx';
import { toast } from 'react-toastify';
import { isLoggedUserOwner } from '../utils/ownnerUser.js';
import {
  useGetCoursesQuery,
  useGetCoursesMinMaxPriceQuery,
} from '../slices/coursesApiSlice.js';
import { useGetCourseCategoriesQuery } from '../slices/courseCategoriesApiSlice.js';

const OnlineCoursesScreen = () => {
  let { pageNumber, keyword, category } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }
  const { t, i18n } = useTranslation(['course']);

  const [sort, setSort] = useState('-rating,-createdAt');
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [courseCategory, setCourseCategory] = useState([]);
  const [show, setShow] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const { userAuth } = useSelector((state) => state.auth);

  const {
    data: minmax,
    isLoading: isLoadingMinMax,
    isError: isErrorMinMax,
    error: errorMinMax,
  } = useGetCoursesMinMaxPriceQuery();

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetCoursesQuery({
    sort,
    category_in: courseCategory.length > 0 ? courseCategory : undefined,
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
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    error: errorCategories,
  } = useGetCourseCategoriesQuery();

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
    if (courses) {
      courses.pages < 1 ? setPages(1) : setPages(courses.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [courses, pages, page, pageNumber]);

  useEffect(() => {
    if (category === undefined) {
      setCourseCategory([]);
    } else {
      setCourseCategory(category.split(','));
    }
  }, [category]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (courses) {
    console.log(courses);
  }

  return (
    <>
      <Banner
        src="/images/ecoprint-03-1280x360.webp"
        title={t('onlineCourses')}
      />
      <Meta title={t('onlineCourses')} />
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
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Container className="my-4" fluid>
            <h2 className="text-center">{t('courses')}</h2>
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
                    {courses && (
                      <CourseFilterSidebar
                        categories={categories}
                        category={courseCategory}
                        setCategory={setCourseCategory}
                        min={
                          i18n.language === 'en'
                            ? minmax[0].minPrice
                            : minmax[0].minPrice_hu
                        }
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        max={
                          18n.language === 'en'
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
                    {t('showingOfResults', {
                      length: courses?.data?.length,
                      count: courses?.count,
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
                  {courses.data.length > 0 ? (
                    courses.data.map((course) => (
                      <Col sm={12} md={6} xxl={4} key={course._id}>
                        <Course
                          course={course}
                          purchased={isLoggedUserOwner(userAuth?._id, course)}
                          date={course.students[0]?.purchasedAt}
                          orderId={course.students[0]?.order}
                        />
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
                  pageName="onlinecourses"
                  category={courseCategory.join(',')}
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

export default OnlineCoursesScreen;
