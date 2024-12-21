import { useState, useEffect } from 'react';
import { Row, Col, Container, Tab, Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Banner from '../../components/Banner';
import { toast } from 'react-toastify';
import MyInfo from './MyInfo.jsx';
import MyOrdersTable from './MyOrdersTable.jsx';
import MyBookingsTable from './MyBookingsTable.jsx';
import {
  useProfileMutation,
  useSendEmailVerificationTokenMutation,
} from '../../slices/usersApiSlice';
import { isAuthenticated } from '../../slices/authSlice';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetMyBookingsQuery } from '../../slices/bookingsApiSlice';

const ProfileScreen = () => {
  const { t, i18n } = useTranslation(['profile']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const { data: orders, isLoading, isError, error } = useGetMyOrdersQuery();
  const {
    data: bookings,
    isLoading: isLoadingBookings,
    isError: isErrorBookings,
    error: errorBookings,
  } = useGetMyBookingsQuery();

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

  const handleSendVerificationEmail = async (e) => {
    e.preventDefault();
    try {
      await sendEmailVerificationToken({ language: i18n.language }).unwrap;
    } catch (err) {
      toast.error(err?.data?.message || err.message);
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
        <Tab.Container defaultActiveKey="info">
          <Row className="profile-tab mt-5">
            <Col sm={2} className="mb-5 mb-md-0">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="info">{t('info')}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="orders">{t('myOrders')}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="bookings">{t('myBookings')}</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="info">
                  <MyInfo
                    submitHandler={submitHandler}
                    name={name}
                    setName={setName}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    confirmPassword={confirmPassword}
                    setConfirmPassword={setConfirmPassword}
                    loadingUpdateProfile={loadingUpdateProfile}
                    sendVerifyEmailIsLoading={sendVerifyEmailIsLoading}
                    sendVerifyEmailIsError={sendVerifyEmailIsError}
                    sendVerifyEmailError={sendVerifyEmailError}
                    sendVerifyEmailIsSuccess={sendVerifyEmailIsSuccess}
                    hasEmail={hasEmail}
                    isEmailVerified={isEmailVerified}
                    handleSendVerificationEmail={handleSendVerificationEmail}
                    userAuth={userAuth}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="orders">
                  <MyOrdersTable
                    orders={orders}
                    isLoading={isLoading}
                    isError={isError}
                    error={error}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="bookings">
                  <MyBookingsTable
                    bookings={bookings}
                    isLoadingBookings={isLoadingBookings}
                    isErrorBookings={isErrorBookings}
                    errorBookings={errorBookings}
                  />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default ProfileScreen;
