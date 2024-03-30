import {
  Container,
  Row,
  Col,
  Form,
  FloatingLabel,
  Button,
} from 'react-bootstrap';

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
  console.log(telephone);
  return (
    <Container fluid>
      <Row>
        <Form onSubmit={messageHandler}>
          <Form.Group as={Col} className="mb-3" controlId="name">
            <FloatingLabel label="Name">
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="email">
            <FloatingLabel label="Email">
              <Form.Control
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="email">
            <FloatingLabel label="Phone Number">
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                pattern="+[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{4}"
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="email">
            <FloatingLabel label="Message">
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
              Send
            </Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default ContactEmailForm;
