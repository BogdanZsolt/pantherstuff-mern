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
  Nav,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Trans, useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { FaTimes } from 'react-icons/fa';
import { getEventDate, toCurrency } from '../utils/converter.js';
import {
  useProfileMutation,
  useSendEmailVerificationTokenMutation,
} from '../slices/usersApiSlice';
import { isAuthenticated } from '../slices/authSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { useGetMyBookingsQuery } from '../slices/bookingsApiSlice';

const ProfileScreen = () => {
  const { t, i18n } = useTranslation(['profile']);

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

  console.log(bookings);

  return (
    <>
      <Banner
        src="/images/ecoprint-02.webp"
        alt="ecoprint"
        title={t('profile', { name: name })}
      />
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="info">
          <Row>
            <Col sm={2}>
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
                <Tab.Pane eventKey="info">Info tab content</Tab.Pane>
                <Tab.Pane eventKey="orders">Orders tab content</Tab.Pane>
                <Tab.Pane eventKey="bookings">Bookings tab content</Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </>
  );
};

export default ProfileScreen;
