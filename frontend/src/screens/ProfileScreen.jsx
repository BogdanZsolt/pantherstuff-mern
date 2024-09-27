import { useState, useEffect } from 'react';
import {
  Table,
  Form,
  Button,
  Row,
  Col,
  FormGroup,
  Container,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { toCurrency } from '../utils/converter';
import {
  useProfileMutation,
  useSendEmailVerificationTokenMutation,
} from '../slices/usersApiSlice';
import { isAuthenticated } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';

const ProfileScreen = () => {
  const { t } = useTranslation(['profile']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('info');
  const [hasEmail, setHasEmail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const [
    sendEmailVerificationToken,
    {
      isLoading: sendVerifyEmailIsLoading,
      isError: sendVerifyEmailIsError,
      error: sendVerifyEmailError,
      isSuccess: sendVerifyEmailIsSuccess,
    },
  ] = useSendEmailVerificationTokenMutation();

  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userAuth) {
      setName(userAuth.name);
      setEmail(userAuth.email);
      setHasEmail(userAuth.email ? true : false);
      setIsEmailVerified(userAuth.isEmailVerified);
    }
  }, [userAuth]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error(t('passwordDoNotMatch'));
    } else {
      try {
        const res = await updateProfile({
          _id: userAuth._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(isAuthenticated(res));
        toast.success(t('profileUpdatedSuccsessfully'));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const handleSendVerificationEmail = async () => {
    await sendEmailVerificationToken();
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
            <Tabs
              id="profile-tab"
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3 profile-tab scrollto"
              justify
            >
              <Tab eventKey="info" title="Info">
                {sendVerifyEmailIsLoading ? (
                  <Message variant="danger">Email sending loading...</Message>
                ) : sendVerifyEmailIsError ? (
                  <Message variant="danger">
                    {sendVerifyEmailError.data.message}
                  </Message>
                ) : (
                  sendVerifyEmailIsSuccess && (
                    <Message variant="success">
                      {t('accountVerificationEmailSuccess')}
                    </Message>
                  )
                )}
                {!hasEmail && (
                  <Message variant="danger">{t('missingEmail')}</Message>
                )}
                {!isEmailVerified ? (
                  <Message variant="danger">
                    <Trans
                      i18nKey={t('missingAccountVerify')}
                      components={{
                        1: <p className="text-center" />,
                        2: (
                          <a
                            className="text-danger fw-bold"
                            style={{ cursor: 'pointer' }}
                            onClick={handleSendVerificationEmail}
                          />
                        ),
                      }}
                    />
                  </Message>
                ) : (
                  <Message>{t('accountIsVerified')}</Message>
                )}
              </Tab>
              <Tab eventKey="orders" title={t('myOrders')}>
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
                          <td>
                            {toCurrency(order.language, order.totalPrice)}
                          </td>
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
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfileScreen;
