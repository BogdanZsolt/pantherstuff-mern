import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Container } from 'react-bootstrap';
import Message from './Message';
import Banner from './Banner';
import Loader from './Loader';
import { FaCheckCircle } from 'react-icons/fa';
import {
  useCheckAuthStatusQuery,
  useVerifyUserAccountMutation,
} from '../slices/usersApiSlice';
import { isAuthenticated } from '../slices/authSlice';

const AccountVerification = () => {
  const { t } = useTranslation(['profile']);
  const [isVisible, setIsVisible] = useState(false);
  const { verifyToken } = useParams();

  const { data, checkAuthIsLoading, refetch } = useCheckAuthStatusQuery();

  // const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500); // delay for the fade-in effect
    return () => clearTimeout(timeout);
  }, []);

  const [verifyUserAccount, { error, isLoading, isError, isSuccess }] =
    useVerifyUserAccountMutation();

  useEffect(() => {
    verifyUserAccount(verifyToken);
  }, [verifyToken, verifyUserAccount, refetch]);

  const gotoHandler = () => {
    refetch();
    dispatch(isAuthenticated(data));
    navigate('/profile');
  };

  console.log(data);

  return (
    <div>
      <Banner title="" src="uploads/image-1724508536083.jpg" />
      <Container>
        <div className="account-verify">
          <div className="title-info">
            <div className="title-box">
              {isVisible && (
                <div className="title-wrap pt-5 shadow">
                  {checkAuthIsLoading && <Loader />}
                  {isLoading ? (
                    <Loader />
                  ) : isError ? (
                    <>
                      <Message
                        variant="danger"
                        className="d-flex justify-content-center fs-5"
                      >
                        {error.data.message}
                      </Message>
                      <Button
                        onClick={() => navigate('/profile')}
                        variant="success"
                        className="text-primary btn-lasaphire"
                      >
                        {t('goToProfile')}
                      </Button>
                    </>
                  ) : (
                    isSuccess && (
                      <>
                        <div className="d-flex align-items-stretch">
                          <FaCheckCircle className="fs-2 me-1 pt-0 text-success-emphasis" />
                          <h3 className="fw-bold">{t('accountVerified')}</h3>
                        </div>
                        <p className="lead">
                          {t('yourAccountHasBeenSuccessfullyVerified')}
                        </p>
                        <Button
                          onClick={gotoHandler}
                          variant="success"
                          className="text-primary btn-lasaphire"
                        >
                          {t('goToProfile')}
                        </Button>
                      </>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AccountVerification;
