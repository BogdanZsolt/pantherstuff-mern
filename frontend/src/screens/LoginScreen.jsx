import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container, InputGroup } from 'react-bootstrap';
import Banner from '../components/Banner.jsx';
import FormContainer from '../components/FormContainer.jsx';
import Loader from '../components/Loader.jsx';
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';
import { Trans, useTranslation } from 'react-i18next';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../slices/authSlice.js';

const LoginScreen = () => {
  const { t } = useTranslation(['login']);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userAuth } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userAuth && userAuth.isAuthenticated) {
      navigate(redirect);
    }
  }, [userAuth, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      if (res) {
        dispatch(
          isAuthenticated({
            isAuthenticated: true,
            _id: res._id,
            name: res.name,
            email: res.email,
            isEmailVerified: res.isEmailVerified,
            isAdmin: res.isAdmin,
            isPremium: res.isPremium,
            premiumExpiresAt: res.premiumExpiresAt,
          })
        );
        navigate('/');
      }
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Banner title={t('signIn')} src="uploads/image-1724508536083.jpg" />
      <Container>
        <FormContainer>
          <h1>{t('signIn')}</h1>

          <Form onSubmit={submitHandler}>
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
              <InputGroup>
                <Form.Control
                  type={showPass ? 'text' : 'password'}
                  placeholder={t('enterPassword')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPass(!showPass)}
                  id="showPass-btn"
                >
                  {showPass ? <FaEye /> : <FaEyeSlash />}
                </button>
              </InputGroup>
            </Form.Group>
            <Row>
              <Col>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-2"
                  disabled={isLoading}
                >
                  {t('signIn')}
                </Button>
              </Col>
              <Col className="d-flex justify-content-end align-items-center">
                <Link
                  className="fw-semibold text-secondary"
                  to="/forgot-password"
                >
                  {t('forgotPassword')}
                </Link>
              </Col>
            </Row>

            {isLoading && <Loader />}
          </Form>
          <Row className="py-3">
            <Col>
              <Trans
                i18nKey={t('newCustomer')}
                components={{
                  1: (
                    <Link
                      to={
                        redirect
                          ? `/register?redirect=${redirect}`
                          : '/register'
                      }
                    ></Link>
                  ),
                }}
              />
            </Col>
            {/* Google login button */}
            <Col className="d-flex justify-content-end align-items-center">
              <a
                href={
                  import.meta.env.VITE_ENV === 'developer'
                    ? 'http://localhost:5000/api/users/auth/google'
                    : 'https://pantherstuff.com/api/users/auth/google'
                }
                className="btn btn-secondary d-flex justify-content-center align-items-center"
              >
                <span className="google-btn__icon">
                  <FaGoogle />
                </span>
                <span>{t('signInWithGoogle')}</span>
              </a>
            </Col>
          </Row>
        </FormContainer>
      </Container>
    </>
  );
};

export default LoginScreen;
