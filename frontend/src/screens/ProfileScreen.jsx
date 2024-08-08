import { useState, useEffect } from 'react';
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  Container,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Banner from '../components/Banner';

const ProfileScreen = () => {
  const { t } = useTranslation(['profile']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('passwordDoNotMatch'));
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success(t('profileUpdatedSuccsessfully'));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Banner
        src="/images/ecoprint-02.webp"
        alt="ecoprint"
        title={t('profile', { name: name })}
      />
      <Container>
        <Row className="mt-5">
          <Col md={3}>
            <h2>{t('userProfile')}</h2>

            <Form onSubmit={submitHandler}>
              <FormGroup controlId="name" className="my-2">
                <Form.Label>{t('name')}</Form.Label>
                <Form.Control
                  type="name"
                  placeholder={t('enterName')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </FormGroup>

              <FormGroup controlId="email" className="my-2">
                <Form.Label>{t('emailAddress')}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={t('enterEmail')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </FormGroup>

              <FormGroup controlId="password" className="my-2">
                <Form.Label>{t('password')}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t('enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </FormGroup>

              <FormGroup controlId="confirmPassword" className="my-2">
                <Form.Label>{t('confirmPassword')}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t('confirmPassword')}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </FormGroup>

              <Button type="submit" variant="primary" className="my-2">
                {t('update')}
              </Button>
              {loadingUpdateProfile && <Loader />}
            </Form>
          </Col>
          <Col md={9}>
            <h2>{t('myOrders')}</h2>
            {isLoading ? (
              <Loader />
            ) : error ? (
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
                      <td>${order.totalPrice}</td>
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
                          <Button className="btn-sm" variant="light">
                            {t('details')}
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
