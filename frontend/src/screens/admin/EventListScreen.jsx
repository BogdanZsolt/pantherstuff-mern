import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash, FaCopy } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import { getEventDate } from '../../utils/converter';
import {
  useGetEventsQuery,
  useCreateEventMutation,
  useCopyEventMutation,
  useDeleteEventMutation,
} from '../../slices/eventsApiSlice';

const EventListScreen = () => {
  const {
    data: events,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetEventsQuery();

  const [
    createEvent,
    { isLoading: isLoadingCreate, isError: isErrorCreate, error: errorCreate },
  ] = useCreateEventMutation();

  const [
    copyEvent,
    { isLoading: isLoadingCopy, isError: isErrorCopy, error: errorCopy },
  ] = useCopyEventMutation();

  const [
    deleteEvent,
    { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete },
  ] = useDeleteEventMutation();

  const createEventHandler = async () => {
    if (window.confirm('Are you sure you want to create a new Event?')) {
      try {
        await createEvent();
        toast.success('Event created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteEventHandler = async (id) => {
    if (window.confirm('Are you delete?')) {
      try {
        await deleteEvent(id);
        toast.success('Event deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const copyEventHandler = async (id) => {
    if (window.confirm('Are you copy this Event?')) {
      try {
        await copyEvent(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Events</h2>
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
                <th>START DATE</th>
                <th>CURRENT PRICE</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {isSuccess &&
                events.data.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td>{event.category?.title}</td>
                    <td className="d-flex flex-column bg-transparent">
                      <span>
                        {event.startDate
                          ? getEventDate(event.startDate, 'en')
                          : '-'}
                      </span>
                    </td>
                    <td>{event.currentPrice}</td>
                    <td>
                      <LinkContainer to={`/admin/eventlist/${event._id}/edit`}>
                        <Button
                          variant="primary"
                          className="btn-sm me-2"
                          title="Edit Event"
                        >
                          <span className="d-flex align-items-center justify-content-center">
                            <FaEdit />
                          </span>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="primary"
                        className="btn-sm me-2"
                        onClick={() => copyEventHandler(event._id)}
                        title="Copy Event"
                      >
                        <span className="d-flex align-items-center justify-content-center">
                          <FaCopy className="text-primary" />
                        </span>
                      </Button>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteEventHandler(event._id)}
                        title="Delete Event"
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

export default EventListScreen;
