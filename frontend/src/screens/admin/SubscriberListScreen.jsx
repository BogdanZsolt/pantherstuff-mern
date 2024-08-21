import { useState, useEffect } from 'react';
import { Container, Row, Form, Col, Table, Button } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useGetGroupsQuery,
  useGetGroupSubscribersQuery,
  useCheckEmailMutation,
} from '../../slices/subscribersApiSlice';

const SubscriberListScreen = () => {
  const [group, setGroup] = useState('');

  const { data, isLoading, error } = useGetGroupsQuery();
  const {
    data: groupSubscribers,
    isLoading: loadingGroupSubscribers,
    error: errorGroupSubscribers,
  } = useGetGroupSubscribersQuery(group, { skip: !group || group === '' });
  const [checkEmail] = useCheckEmailMutation();

  useEffect(() => {
    if (data) {
      setGroup(data.data[0].id);
    }
  }, [data]);

  const checkHandler = async (email) => {
    // console.log(`check: ${email}`);
    try {
      const { data } = await checkEmail({ email });
      console.log(data);
    } catch (err) {
      console.log(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Subscribers</h2>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className="justify-content-center align-items-center my-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Group</Form.Label>
              <Form.Select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
              >
                {data.data.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      )}
      {loadingGroupSubscribers ? (
        <Loader />
      ) : errorGroupSubscribers ? (
        <Message>{errorGroupSubscribers.data.message}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>VALID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {groupSubscribers?.data?.map((item) => (
                <tr key={item.id}>
                  <td>{item.fields.name}</td>
                  <td>{item.email}</td>
                  <td>{item?.fields?.mailercheck_result}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="btn-sm mx-2"
                      onClick={() => {
                        checkHandler(item.email);
                      }}
                    >
                      <span className="d-flex align-items-center justify-content-center">
                        <FaEdit />
                        check
                      </span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default SubscriberListScreen;
