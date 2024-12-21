import { Container, Row, Form, Table, Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import { LinkContainer } from 'react-router-bootstrap';
import { TiEyeOutline } from 'react-icons/ti';
import { useGetEventsQuery } from '../../slices/eventsApiSlice.js';
import { getEventDate } from '../../utils/converter.js';

const BookingListScreen = () => {
  const [eventDate, setEventDate] = useState('actual');

  const {
    data: events,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetEventsQuery({
    sort: 'startDate',
    startDate_gte: eventDate === 'actual' ? Date(Date.now()) : undefined,
    startDate_lte: eventDate === 'past' ? Date(Date.now()) : undefined,
  });

  if (isSuccess) {
    console.log(events);
  }

  console.log(eventDate);

  return (
    <Container className="mt-5">
      <Row className="text-center mb-3">
        <h2 className="fs-1 fw-semibold">Events</h2>
      </Row>
      <Row className="align-items-center justify-content-end mb-3">
        <Col xs={12} md={6} xxl={3}>
          <Form.Select
            aria-label="Default sorting"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          >
            <option value="all">All events</option>
            <option value="actual">Actual events</option>
            <option value="past">Past events</option>
          </Form.Select>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        isSuccess && (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>TITLE</th>
                  <th>DATE</th>
                  <th>MAX PARTICIPANT</th>
                  <th>PARTICIPANT</th>
                  <th>BOOKED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {isSuccess &&
                  events.data.map((event) => (
                    <tr key={event._id}>
                      <td>{event.title}</td>
                      <td>{getEventDate(event.startDate, 'en')}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <LinkContainer to={`/admin/booking/${event._id}/view`}>
                          <Button
                            variant="primary"
                            className="btn-sm me-2"
                            title="View details"
                          >
                            <span className="d-flex align-items-center justify-content-center">
                              <TiEyeOutline />
                            </span>
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </>
        )
      )}
    </Container>
  );
};

export default BookingListScreen;
