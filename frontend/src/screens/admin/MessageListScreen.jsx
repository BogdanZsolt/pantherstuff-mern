import { useParams } from 'react-router-dom';
import { Button, Container, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { useGetContactMessagesQuery } from '../../slices/contactMessageApiSlice.js';
import Paginate from '../../components/Paginate.jsx';

const MessageListScreen = () => {
  let { pageNumber: page } = useParams();
  if (!page) page = 1;
  const {
    data: messages,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetContactMessagesQuery({ page, limit: 15 });

  const deleteHandler = () => {};

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Contact Messages</h2>
      </Row>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error?.data?.messages}</Message>
      ) : (
        isSuccess && (
          <>
            <Table striped hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>USER</th>
                  <th>TELEPHONE</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {messages?.data.map((item) => (
                  <tr key={item?._id} className={item?.read ? '' : 'fw-bold'}>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.user?.name}</td>
                    <td>{item?.telephone}</td>
                    <td>
                      <LinkContainer to={`/admin/message/${item?._id}`}>
                        <Button variant="primary" className="btn-sm mx-2">
                          <span className="d-flex align-items-center justify-content-center py">
                            <FaEdit />
                          </span>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler()}
                      >
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaTrash className="text-primary" />
                        </span>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Paginate
              pages={messages.pages}
              page={messages.page}
              isAdmin={true}
              pageName="messagelist"
            />
          </>
        )
      )}
    </Container>
  );
};

export default MessageListScreen;
