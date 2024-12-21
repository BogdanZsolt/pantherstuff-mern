import { useTranslation } from 'react-i18next';
import { Button, Table } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toCurrency } from '../../utils/converter';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTimes } from 'react-icons/fa';

const MyOrdersTable = ({ orders, isLoading, isError, error }) => {
  const { t } = useTranslation(['profile']);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>{t('id')}</th>
              <th>{t('date')}</th>
              <th>{t('total')}</th>
              <th>{t('paid')}</th>
              <th>{t('delivered')}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{toCurrency(order.language, order.totalPrice)}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
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

export default MyOrdersTable;
