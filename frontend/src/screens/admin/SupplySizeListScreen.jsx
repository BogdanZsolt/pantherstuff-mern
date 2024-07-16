import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetSupplySizesQuery,
  useCreateSupplySizeMutation,
  useDeleteSupplySizeMutation,
} from '../../slices/supplySizesApiSlice';

const SupplySizeListScreen = () => {
  const {
    data: supplySizes,
    isLoading,
    refetch,
    error,
  } = useGetSupplySizesQuery();
  const [createSupplySize, { isLoading: loadingCreate }] =
    useCreateSupplySizeMutation();
  const [deleteSupplySize, { isLoading: loadingDelete }] =
    useDeleteSupplySizeMutation();

  const createHandler = async () => {
    if (window.confirm('Are you sure you want to create a new supply size?')) {
      try {
        await createSupplySize();
        toast.success('Supply size created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSupplySize(id);
        toast.success('Supply size deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center">
          <h2 className="fs-1 fw-semibold">Supply Sizes</h2>
        </Row>
        <Row className="align-items-center">
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createHandler}>
              <div className="d-flex align-items-center gap-1">
                <FaEdit /> Create Supply Size
              </div>
            </Button>
          </Col>
        </Row>
        {loadingCreate && <Loader />}
        {loadingDelete && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {supplySizes.data.map((size) => (
                <tr key={size._id}>
                  <td>{size._id}</td>
                  <td>{size.title}</td>
                  <td>{size.description}</td>
                  <td>
                    <LinkContainer to={`/admin/supplysize/${size._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(size._id)}
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
        )}
      </Container>
    </>
  );
};

export default SupplySizeListScreen;
