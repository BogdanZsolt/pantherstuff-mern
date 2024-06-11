import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation(['contact']);

  console.log(telephone);
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
          <Col
            lg={2}
            xl={1}
            className="d-flex justify-content-lg-center align-items-center mt-lg-0"
          >
            <Button
              type="submit"
              variant="success"
              className="text-primary btn-lasaphire"
            >
              {t('formSend')}
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default ContactEmailForm;
