import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Col,
  Container,
  Row,
  Form,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import Banner from '../components/Banner';
import Meta from '../components/Meta';
import Loader from '../components/Loader.jsx';
import Message from '../components/Message.jsx';
import {
  RiLayoutGridLine,
  RiLayoutMasonryLine,
  RiListCheck2,
  RiPauseMiniLine,
} from 'react-icons/ri';
import Course from '../components/Course.jsx';
import { useGetCoursesQuery } from '../slices/coursesApiSlice.js';
import Paginate from '../components/Paginate.jsx';

const OnlineCoursesScreen = () => {
  let { pageNumber, keyword, courseCategory } = useParams();

  if (!pageNumber) {
    pageNumber = 1;
  }
  const { t, i18n } = useTranslation(['course']);

  const [sort, setSort] = useState('-rating,-createdAt');
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  // const [category, setCategory] = useState([]);

  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useGetCoursesQuery({ sort, page, limit: 8 });

  useEffect(() => {
    if (courses) {
      courses.pages < 1 ? setPages(1) : setPages(courses.pages);
      pages < page ? setPage(pages) : setPage(pageNumber);
    }
  }, [courses, pages, page, pageNumber]);

  // useEffect(() => {
  //   if (courseCategory === undefined) {
  //     setCategory([]);
  //   } else {
  //     setCategory(courseCategory);
  //   }
  // }, [courseCategory]);

  console.log(courses);

  return (
    <>
      <Banner
        src="/images/ecoprint-03-1280x360.webp"
        title={t('onlineCourses')}
      />
      <Meta title={t('onlineCourses')} />
      <Container className="my-4" fluid>
        {isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <>
            <h2 className="text-center">{t('courses')}</h2>
            <Row>
              <Col lg={3} xxl={2}></Col>
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
                        <Course course={course} />
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
                  productCategory={courseCategory}
                  keyword={keyword ? keyword : ''}
                />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default OnlineCoursesScreen;
