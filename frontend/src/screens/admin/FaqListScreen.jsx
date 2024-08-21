import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetFaqsQuery,
  useCreateFaqMutation,
  useDeleteFaqMutation,
} from '../../slices/faqsApiSlice';

const FaqListScreen = () => {
  const {
    data: faqs,
    isLoading,
    refetch,
    error,
  } = useGetFaqsQuery({
    sort: '-createdAt',
  });
  const [createFaq, { isLoading: loadingCreate }] = useCreateFaqMutation();
  const [deleteFaq, { isLoading: loadingDelete }] = useDeleteFaqMutation();

  const createFaqHandler = async () => {
    if (window.confirm('Are you sure you want to create a new FAQ?')) {
      try {
        await createFaq();
        toast.success('FAQ created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteFaq(id);
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Faqs</h2>
      </Row>
      <Row className="align-items-center">
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createFaqHandler}>
            <FaEdit /> Create FAQ
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>QUESTION</th>
                <th>AUTHOR NAME</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {faqs.data.map((faq) => (
                <tr key={faq._id}>
                  <td>{faq._id}</td>
                  <td>{faq.question}</td>
                  <td>{faq.user.name}</td>
                  <td>{faq?.category?.title}</td>
                  <td>
                    <LinkContainer to={`/admin/faq/${faq._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <span className="d-flex align-items-center justify-content-center">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(faq._id)}
                    >
                      <span className="d-flex align-items-center justify-content-center">
                        <FaTrash className="text-primary" />
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

export default FaqListScreen;
