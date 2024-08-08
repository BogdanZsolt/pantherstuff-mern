import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../components/Banner.jsx';
import FormContainer from '../components/FormContainer.jsx';
import Loader from '../components/Loader.jsx';
import { Trans, useTranslation } from 'react-i18next';
import { useLoginMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const { t } = useTranslation(['login']);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <>
      <Banner title={t('signIn')} />
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
              <Form.Control
                type="password"
                placeholder={t('enterPassword')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              className="mt-2"
              disabled={isLoading}
            >
              {t('signIn')}
            </Button>

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
          </Row>
        </FormContainer>
      </Container>
    </>
  );
};

export default LoginScreen;
