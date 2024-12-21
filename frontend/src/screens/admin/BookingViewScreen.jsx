import { Link, useParams } from 'react-router-dom';
import { Col, Container, Row, Form, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getEventDate } from '../../utils/converter';
import { FaTimes } from 'react-icons/fa';
import { useGetEventDetailsQuery } from '../../slices/eventsApiSlice';

const BookingViewScreen = () => {
  const { id: eventId } = useParams();

  const {
    data: event,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetEventDetailsQuery(eventId);

  const selectBookingType = (type = 'paid') => {
    let temp = [];
    if (type === 'paid') {
      temp = event.booking?.filter((item) => item.isPaid);
    } else if (type === 'booking') {
      temp = event.booking.filter(
        (item) => !item.isPaid && item.stillToBePaid > 0
      );
    } else if (type === 'wouldBeThere') {
      temp = event.booking.filter(
        (item) => !item.isPaid && item.amountPaid <= 0
      );
    }
    return temp;
  };

  if (event) {
    [
      { key: 'paid', title: 'Paid' },
      { key: 'booking', title: 'Booking' },
      { key: 'wouldBeThere', title: 'Would be there' },
    ].forEach((item) => {
      console.log(item.title);
      console.log(selectBookingType(item.key));
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <Container className="mt-5">
          <Link to="/admin/bookinglist" className="btn btn-primary my-3">
            Go Back
          </Link>
          {isSuccess && (
            <Row>
              <h2 className="text-center fs-1 fw-bold">{`"${event.title}"`}</h2>
              <p className="text-center m-0" style={{ fontSize: '1.25rem' }}>
                {getEventDate(event.startDate)}
              </p>
              <p className="text-center" style={{ fontSize: '1.25rem' }}>
                event reservations & informations
              </p>
              <p
                className="text-center fw-bold"
                style={{ fontSize: '1.25rem' }}
              >
                {event.location.address}
              </p>
              <Form>
                <Row>
                  <Form.Label column>Max Group Size:</Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      plaintext
                      readOnly
                      defaultValue={event.maxGroupsize}
                    />
                  </Col>
                  <Form.Label column>Booked:</Form.Label>
                  <Col>
                    <Form.Control
                      type="number"
                      plaintext
                      readOnly
                      defaultValue={event.booking.length}
                    />
                  </Col>
                  {event.maxGroupsize - event.booking.length > 0 ? (
                    <>
                      <Form.Label column>Free space:</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          plaintext
                          readOnly
                          defaultValue={
                            event.maxGroupsize - event.booking.length
                          }
                        />
                      </Col>
                    </>
                  ) : (
                    <>
                      <Form.Label column>would participate</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          plaintext
                          readOnly
                          defaultValue={
                            selectBookingType('wouldBeThere').length
                          }
                        />
                      </Col>
                    </>
                  )}
                </Row>
                {[
                  { key: 'paid', title: 'Paid' },
                  { key: 'booking', title: 'Booking' },
                  { key: 'wouldBeThere', title: 'Would be there' },
                ].map((item, index) => (
                  <Row key={index} className="mb-3">
                    <h4 className="fw-bold mb-1">{item.title}</h4>
                    {selectBookingType(item.key).length > 0 ? (
                      <>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>NAME</th>
                              <th>APPLICATION DATE</th>
                              <th>CHECKED IN AT THE EVENT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectBookingType(item.key).map((b, index) => (
                              <tr key={b._id}>
                                <td>{index + 1}</td>
                                <td>
                                  <Link to={`/admin/user/${b.user._id}/edit`}>
                                    {b.user.name}
                                  </Link>
                                </td>
                                <td>{getEventDate(b.createdAt)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </>
                    ) : (
                      <>
                        <p>
                          <FaTimes className="text-danger" />
                        </p>
                      </>
                    )}
                  </Row>
                ))}
              </Form>
            </Row>
          )}
        </Container>
      )}
    </>
  );
};

export default BookingViewScreen;
