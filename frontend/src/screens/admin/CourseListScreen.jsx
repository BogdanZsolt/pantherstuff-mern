import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaCopy, FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { getDuration, toCurrency } from '../../utils/converter.js';
import { toast } from 'react-toastify';
import {
  useCopyCourseMutation,
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useGetCoursesQuery,
} from '../../slices/coursesApiSlice.js';

const CourseListScreen = () => {
  const {
    data: courses,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetCoursesQuery();

  const [
    createCourse,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateCourseMutation();

  const [
    copyCourse,
    { isLoading: isLoadingCopy, isError: isErrorCopy, error: errorCopy },
  ] = useCopyCourseMutation();

  const [
    deleteCourse,
    { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteCourseMutation();

  const createCourseHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Course?')) {
      try {
        await createCourse();
        toast.success('Course created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const copyCourseHandler = async (id) => {
    if (window.confirm('Are you copy this Course?')) {
      try {
        await copyCourse(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteCourseHandler = async (id) => {
    if (window.confirm('Are you delete?')) {
      try {
        await deleteCourse(id);
        toast.success('Course deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (courses) {
    console.log(courses);
  }

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Courses</h2>
      </Row>
      <Row className="align-items-center">
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createCourseHandler}>
            <div className="d-flex">
              <FaEdit className="me-2" /> Create event
            </div>
          </Button>
        </Col>
      </Row>
      {isLoadingCreate ? (
        <Loader />
      ) : (
        isErrorCreate &&
        toast.danger(errorCreate.data?.message || errorCreate.error)
      )}
      {isLoadingCopy ? (
        <Loader />
      ) : (
        isErrorCopy && toast.danger(errorCopy.data?.message || errorCopy.error)
      )}
      {isLoadingDelete ? (
        <Loader />
      ) : (
        isErrorDelete &&
        toast.danger(errorDelete.data?.message || errorDelete.error)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>CATEGORY</th>
                <th>DURATION</th>
                <th>CURRENT PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isSuccess &&
                courses.data.map((course) => (
                  <tr key={course._id}>
                    <td className="fw-semibold">{course.title}</td>
                    <td>{course.category?.title}</td>
                    <td>{getDuration(course.duration)}</td>
                    <td>{toCurrency('en', course.currentPrice)}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/courselist/${course._id}/edit`}
                      >
                        <Button
                          variant="primary"
                          className="btn-sm me-2"
                          title="Edit Course"
                        >
                          <span className="d-flex align-items-center justify-content-center">
                            <FaEdit />
                          </span>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="primary"
                        className="btn-sm me-2"
                        onClick={() => copyCourseHandler(course._id)}
                        title="Copy Course"
                      >
                        <span className="d-flex align-items-center justify-content-center">
                          <FaCopy className="text-primary" />
                        </span>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteCourseHandler(course._id)}
                        title="Delete Course"
                      >
                        <span className="d-flex align-items-center justify-content-center">
                          <FaTrash className="text-primary" />
                        </span>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default CourseListScreen;
