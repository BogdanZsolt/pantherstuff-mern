import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Banner from '../components/Banner';
import { Button, Container, InputGroup, Form } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { usePasswordResetMutation } from '../slices/usersApiSlice.js';
import Loader from '../components/Loader.jsx';

const ResetPasswordScreen = () => {
  const { token } = useParams();
  const { t } = useTranslation(['login']);
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [passwordReset, { isLoading }] = usePasswordResetMutation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300); // delay for the fade-in effect
    return () => clearTimeout(timeout);
  }, []);

  const passResetHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error(t('passwordDoNotMatch'));
    } else {
      try {
        await passwordReset({ resetToken: token, password }).unwrap();
        setPassword('');
        setConfirmPassword('');
        toast.success(t('theSpecifiedPassword'));
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Banner
        title={t('passwordReset')}
        src="/uploads/image-1724508536083.jpg"
      />
      <Container>
        {isVisible && (
          <div className="password-reset">
            <div className="title-info">
              <div className="title-box">
                <div className="title-wrap pt-5 shadow">
                  <Form onSubmit={passResetHandler}>
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
                          id="show-pass-reset-btn"
                        >
                          {showPass ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="confirm-password" className="my-3">
                      <Form.Label>{t('confirmPassword')}</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPass ? 'text' : 'password'}
                          placeholder={t('enterPassword')}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          id="show-conf-pass-reset-btn"
                        >
                          {showConfirmPass ? <FaEye /> : <FaEyeSlash />}
                        </button>
                      </InputGroup>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="primary"
                      className="mt-2"
                      // disabled={isLoading}
                    >
                      {t('send')}
                    </Button>
                    {isLoading && <Loader />}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

export default ResetPasswordScreen;
