import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import {
  useCreateEventCategoryMutation,
  useDeleteEventCategoryMutation,
  useGetEventCategoriesQuery,
} from '../../slices/eventCategoriesApiSlice.js';

const EventCategoryListScreen = () => {
  const {
    data: eventCategories,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetEventCategoriesQuery({
    sort: 'title',
  });

  const [
    createEventCategory,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateEventCategoryMutation();

  const [
    deleteEventCategory,
    { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteEventCategoryMutation();

  const createEventHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Faq Category?')) {
      try {
        await createEventCategory();
        toast.success('Event category created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err?.error);
      }
    }
  };

  const deleteEventHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteEventCategory(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  if (isSuccess) {
    console.log(eventCategories);
  }

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Event categories</h2>
      </Row>
      <Row className="align-items-center">
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createEventHandler}>
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
        toast.error(errorCreate?.data?.message || errorCreate?.error)
      )}
      {isLoadingDelete ? (
        <Loader />
      ) : (
        isErrorDelete &&
        toast.error(errorDelete?.data?.message || errorDelete?.error)
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
                <th>ID</th>
                <th>TITLE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isSuccess &&
                eventCategories.data.map((eventCategory) => (
                  <tr key={eventCategory._id}>
                    <td>{eventCategory._id}</td>
                    <td>{eventCategory.title}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/eventcategorylist/${eventCategory._id}/edit`}
                      >
                        <Button variant="primary" className="btn-sm mx-2">
                          <span className="d-flex align-items-center justify-content-center">
                            <FaEdit />
                          </span>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteEventHandler(eventCategory._id)}
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

export default EventCategoryListScreen;
