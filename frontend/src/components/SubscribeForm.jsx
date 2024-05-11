import { useState } from 'react';
import {
  Container,
  Card,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
} from 'react-bootstrap';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useCreateSubscriberMutation } from '../slices/subscribersApiSlice';
import Message from './Message';

const SubscribeForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [createSubscriber, { isLoading, error }] =
    useCreateSubscriberMutation();

  const subscribeHandler = async (e) => {
    e.preventDefault();
    try {
      createSubscriber({ name, email });
      setName('');
      setEmail('');
      toast.success('subscribed');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="my-5">
      <Card
        className="subscribe-decoration"
        style={{
          backgroundImage: 'url("/images/newsletter_sub_patt_640.jpg")',
        }}
      >
        <Card.Body>
          <Card.Title className="text-center text-primary fs-2 fw-bold">
            PantherStuff LoveLetters
          </Card.Title>
          <Card.Text className="text-center text-primary lead fw-medium">
            Sign Up To Get Regular PantherStuff News, Knowledge & Events.
            Support the Healing and Clearing of our Beloved Mother Nature by
            transforming the cloth industry 🌎🌿🫀☀️
          </Card.Text>
          <Form onSubmit={subscribeHandler}>
            <Row>
              <Form.Group
                as={Col}
                lg="5"
                className="mb-2 mb-lg-0"
                controlId="name"
              >
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
              <Form.Group
                as={Col}
                lg="5"
                xl="6"
                className="mb-2 mb-lg-0"
                controlId="email"
              >
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
                  Subscribe
                </Button>
                {isLoading && <Loader />}
              </Col>
            </Row>
            {error && (
              <Row>
                <Message variant="danger">{error?.data?.message}</Message>
              </Row>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SubscribeForm;
