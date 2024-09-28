import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Form, Col } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { toLocalDate } from '../../utils/converter';
import {
  useGetContactMessageDetailsQuery,
  useUpdateContactMessageMutation,
} from '../../slices/contactMessageApiSlice';

const MessageScreen = () => {
  const { id: messageId } = useParams();

  const { userAuth } = useSelector((state) => state.auth);

  const {
    data: message,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetContactMessageDetailsQuery(messageId);

  const [updateContactMessage, { isLoading: updateIsLoading }] =
    useUpdateContactMessageMutation();

  useEffect(() => {
    const asyncUpdate = async () => {
      await updateContactMessage({
        messageId,
        read: true,
        readAt: Date.now(),
        readId: userAuth._id,
      });
    };
    asyncUpdate();
    refetch();
  }, [messageId, userAuth, updateContactMessage, refetch]);

  return updateIsLoading && isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variand="danger">{error?.data?.message}</Message>
  ) : (
    isSuccess && (
      <Container className="mt-5">
        <Link to="/admin/messagelist" className="btn btn-primary my-3">
          Go Back
        </Link>
        <Row>
          <h2 className="text-center fs-1 fw-bold">Contact Message</h2>
        </Row>
        <FormContainer>
          <Form>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextName">
              <Form.Label column sm="3" className="fs-5">
                Name:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  size="lg"
                  readOnly
                  defaultValue={message.name}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3" className="fs-5">
                Email:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  size="lg"
                  readOnly
                  defaultValue={message.email}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextPhone"
            >
              <Form.Label column sm="3" className="fs-5">
                Telephone:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="tel"
                  size="lg"
                  readOnly
                  defaultValue={message.telephone}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextsendAt"
            >
              <Form.Label column sm="3" className="fs-5">
                Send
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  size="lg"
                  readOnly
                  defaultValue={toLocalDate('en', message.createdAt)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextReadAt"
            >
              <Form.Label column sm="3" className="fs-5">
                Read by
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  size="lg"
                  readOnly
                  defaultValue={
                    message?.readId ? message?.readId?.name : userAuth.name
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextReadAt"
            >
              <Form.Label column sm="3" className="fs-5">
                Read
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  size="lg"
                  readOnly
                  defaultValue={toLocalDate(
                    'en',
                    message.readAt ? message.readAt : Date.now()
                  )}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formPlaintextMessage"
            >
              <Form.Label column sm="3" className="fs-5">
                Message
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="textarea"
                  rows={8}
                  size="lg"
                  readOnly
                  defaultValue={message.message}
                />
              </Col>
            </Form.Group>
          </Form>
        </FormContainer>
      </Container>
    )
  );
};

export default MessageScreen;
