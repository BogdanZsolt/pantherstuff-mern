import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getEventDate, toCurrency } from '../../utils/converter';
import { LinkContainer } from 'react-router-bootstrap';

const MyBookingsTable = ({
  bookings,
  isLoadingBookings,
  isErrorBookings,
  errorBookings,
}) => {
  const { t, i18n } = useTranslation(['profile']);

  return (
    <>
      {isLoadingBookings ? (
        <Loader />
      ) : isErrorBookings ? (
        <Message variant="danger">
          {errorBookings?.data?.message || errorBookings.error}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>{t('title')}</th>
              <th>{t('date')}</th>
              <th>{t('total')}</th>
              <th>{t('paid')}</th>
              <th>{t('payable')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>
                  <Link to={`/event/${booking.event._id}`}>
                    {i18n.language === 'en'
                      ? booking.event.title
                      : booking.event.translations?.hu?.title ||
                        booking.event.title}
                  </Link>
                </td>
                <td>{getEventDate(booking.event.startDate, i18n.language)}</td>
                <td>{toCurrency(booking.order.language, booking.price)}</td>
                <td>
                  {toCurrency(booking.order.language, booking.amountPaid)}
                </td>
                <td className={booking.stillToBePaid > 0 ? 'text-danger' : ''}>
                  {toCurrency(booking.order.language, booking.stillToBePaid)}
                </td>
                <td>
                  <LinkContainer to={`/event/${booking.event._id}`}>
                    <Button className="btn-sm" variant="primary">
                      {t('details')}
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MyBookingsTable;
