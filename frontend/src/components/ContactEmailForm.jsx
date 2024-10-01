import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
  // FormControl,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
// import ReCAPTCHA from 'react-google-recaptcha';
import Loader from './Loader';
import PantherCaptcha from './PantherCaptcha';

const ContactEmailForm = ({
  name,
  setName,
  email,
  setEmail,
  telephone,
  setTelephone,
  message,
  setMessage,
  messageHandler,
  captchaInput,
  setCaptchaInput,
  captchaValue,
  setCaptchaValue,
  loader,
}) => {
  const { t } = useTranslation(['contact']);

  // window.recaptchaOptions = {
  //   lang: 'hu',
  // };

  return (
    <Container fluid>
      <Row>
        <Form onSubmit={messageHandler}>
          <Form.Group as={Col} className="mb-3" controlId="name">
            <FloatingLabel label={t('formName')}>
              <Form.Control
                type="text"
                placeholder={t('formEnterName')}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="email">
            <FloatingLabel label={t('formEmail')}>
              <Form.Control
                type="email"
                placeholder={t('formEnterEmail')}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="phone">
            <FloatingLabel label={t('formPhoneNumber')}>
              <Form.Control
                type="tel"
                placeholder={t('formEnterPhoneNumber')}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                pattern="+[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{4}"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="message">
            <FloatingLabel label={t('formMessage')}>
              <Form.Control
                as="textarea"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <div className="d-flex justify-content-between flex-wrap-reverse">
            <Col
              lg={2}
              xl={1}
              className="d-flex justify-content-lg-center align-items-center mt-lg-0"
            >
              <Button
                type="submit"
                variant="success"
                className="text-primary btn-lasaphire"
                disabled={captchaInput === ''}
              >
                {t('formSend')}
              </Button>
            </Col>
            <PantherCaptcha
              captchaValue={captchaValue}
              setCaptchaValue={setCaptchaValue}
              captchaInput={captchaInput}
              setCaptchaInput={setCaptchaInput}
            />
            {/* <div>
              <ReCAPTCHA
                hl={i18n.language}
                onChange={(val) => setCapVal(val)}
                sitekey={import.meta.env.VITE_GOOGLE_RECAPTCHA}
              />import { InputGroup } from 'react-bootstrap';

            </div> */}
          </div>
          {loader && <Loader />}
        </Form>
      </Row>
    </Container>
  );
};

export default ContactEmailForm;
