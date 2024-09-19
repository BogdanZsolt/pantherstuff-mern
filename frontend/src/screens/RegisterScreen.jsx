import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Banner from '../components/Banner.jsx';
import FormContainer from '../components/FormContainer.jsx';
import Loader from '../components/Loader.jsx';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '../slices/usersApiSlice.js';

const RegisterScreen = () => {
  const { t } = useTranslation(['login']);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userAuth } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userAuth) {
      navigate(redirect);
    }
  }, [userAuth, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        if (res) {
          toast.success(`${res.name} user created`);
          navigate('/login');
        }
        // dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
  };

  return (
    <>
      <Banner src="uploads/image-1724509650005.jpg" title={t('signUp')} />
      <Container>
        <FormContainer>
          <h1>{t('signUp')}</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>{t('name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterName')}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>{t('emailAddress')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('enterEmail')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-3">
              <Form.Label>{t('password')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="my-3">
              <Form.Label>{t('confirmPassword')}</Form.Label>
              <Form.Control
                type="password"
                placeholder={t('confirmPassword')}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              disabled={isLoading}
            >
              {t('register')}
            </Button>

            {isLoading && <Loader />}
          </Form>
          <Row className="py-3">
            <Col>
              <Trans
                i18nKey={t('haveAnAccount')}
                components={{
                  1: (
                    <Link
                      to={redirect ? `/login?redirect=${redirect}` : '/login'}
                    ></Link>
                  ),
                }}
              />
            </Col>
            {/* Google login button */}
            <Col className="d-flex justify-content-end align-items-center">
              <Link
                to="http://localhost:5000/api/users/auth/google"
                className="btn btn-secondary d-flex justify-content-center align-items-center"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={25}
                    height={25}
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <path
                      d="M10.5003 1.91667C12.5358 1.91667 14.3903 2.67493 15.8117 3.91839L13.8037 5.92643C12.9021 5.19326 11.7542 4.75001 10.5003 4.75001C7.601 4.75001 5.25033 7.10068 5.25033 10C5.25033 12.8993 7.601 15.25 10.5003 15.25C12.7863 15.25 14.7244 13.7867 15.4456 11.7501L15.5636 11.4167H15.2099H10.7503V8.58334H17.7503V8.61792H18.0003H18.4637C18.5415 9.06752 18.5837 9.52907 18.5837 10C18.5837 14.464 14.9643 18.0833 10.5003 18.0833C6.03631 18.0833 2.41699 14.464 2.41699 10C2.41699 5.53599 6.03631 1.91667 10.5003 1.91667Z"
                      fill="#FFC107"
                      stroke="#FFC107"
                      strokeWidth="0.5"
                    />
                    <path
                      d="M3.12793 6.12125L5.86585 8.12917C6.60668 6.29501 8.40085 5.00001 10.5004 5.00001C11.775 5.00001 12.9346 5.48084 13.8175 6.26625L16.1746 3.90917C14.6863 2.52209 12.6954 1.66667 10.5004 1.66667C7.2996 1.66667 4.52376 3.47375 3.12793 6.12125Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M10.4998 18.3333C12.6523 18.3333 14.6081 17.5096 16.0869 16.17L13.5077 13.9875C12.6429 14.6452 11.5862 15.0009 10.4998 15C8.3323 15 6.49189 13.6179 5.79855 11.6892L3.08105 13.7829C4.46022 16.4817 7.26105 18.3333 10.4998 18.3333Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M18.6713 8.36791H18V8.33333H10.5V11.6667H15.2096C14.8809 12.5902 14.2889 13.3972 13.5067 13.9879L13.5079 13.9871L16.0871 16.1696C15.9046 16.3354 18.8333 14.1667 18.8333 9.99999C18.8333 9.44124 18.7758 8.89583 18.6713 8.36791Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <span>{t('signInWithGoogle')}</span>
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </>
  );
};

export default RegisterScreen;
