import { Link } from 'react-router-dom';
import { Button, Col, Form, FormGroup, Row } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { getEventDate, getTimeStamp } from '../../utils/converter';

const MyInfo = ({
  submitHandler,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  isLoadingUpdateProfile,
  sendVerifyEmailIsLoading,
  sendVerifyEmailIsError,
  sendVerifyEmailError,
  sendVerifyEmailIsSuccess,
  hasEmail,
  isEmailVerified,
  handleSendVerificationEmail,
  userAuth,
}) => {
  const { t, i18n } = useTranslation(['profile']);

  const isValidDate = (date) => {
    return getTimeStamp(date) > Date.now();
  };

  console.log(userAuth);

  return (
    <Row className="flex-wrap-reverse">
      <Col md={6} className="mb-3 mb-md-0">
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
          {isLoadingUpdateProfile && <Loader />}
        </Form>
      </Col>
      <Col md={6}>
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
        {!hasEmail && <Message variant="danger">{t('missingEmail')}</Message>}
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
        {isValidDate(userAuth.premiumExpiresAt) ? (
          <Message variant="success">
            <Trans
              i18nKey={t('validPremiumMembership')}
              components={{
                date: getEventDate(
                  userAuth.premiumExpiresAt,
                  i18n.language,
                  true
                ),
              }}
            />
          </Message>
        ) : (
          <Message variant="danger">
            <Trans
              i18nKey={t('noValidPremiumMembership')}
              components={{
                1: (
                  <Link
                    className="text-danger fw-bold"
                    style={{ cursor: 'pointer' }}
                    to="/membership"
                  />
                ),
              }}
            />
          </Message>
        )}
      </Col>
    </Row>
  );
};

export default MyInfo;
