import { Col, Container, Row } from 'react-bootstrap';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import Course from '../../components/Course.jsx';
import { useGetCoursesListQuery } from '../../slices/usersApiSlice.js';

const MyCoursesTable = () => {
  const { data: courses, isLoading, isError, error } = useGetCoursesListQuery();

  if (courses) {
    console.log(courses);
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Container className="my-4">
          <h4 className="text-center g-3">Online kurzusaim</h4>
          <Row>
            {courses.map((course) => (
              <Col xs={12} md={6} xxl={4} key={course.course?._id}>
                <Course
                  course={course.course}
                  purchased={course.purchasedAt ? true : false}
                  date={course.purchasedAt}
                  orderId={course.order}
                />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </>
  );
};

export default MyCoursesTable;
