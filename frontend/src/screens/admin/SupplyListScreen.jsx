import { Row, Container, Col, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { FaCheck, FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Paginate from '../../components/Paginate';
import {
  useGetSuppliesQuery,
  useCreateSupplyMutation,
  useDeleteSupplyMutation,
} from '../../slices/suppliesApiSlice';

const SupplyListScreen = () => {
  let { pageNumber: page } = useParams();

  if (!page) page = 1;

  const {
    data: supplies,
    isLoading,
    refetch,
    error,
  } = useGetSuppliesQuery({ page, limit: 20 });

  const [createSupply, { isLoading: loadingCreate }] =
    useCreateSupplyMutation();

  const [deleteSupply, { isLoading: loadingDelete }] =
    useDeleteSupplyMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSupply(id);
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createSupplyHandler = async () => {
    if (window.confirm('Are you sure you want to create a new supply?')) {
      try {
        await createSupply();
        toast.success('Product created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  console.log(supplies?.data);

  return (
    <Container className="mt-5">
      <Row className="text-center">
        <h2 className="fs-1 fw-semibold">Supplies</h2>
      </Row>
      <Row className="align-items-center">
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createSupplyHandler}>
            <FaEdit /> Create Supply
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
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>TO BE DELIVERED</th>
                <th>BEFORE PRICE</th>
                <th>CURRENT PRICE</th>
                <th>CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {supplies.data.map((supply) => (
                <tr key={supply._id}>
                  <td title={`id: ${supply._id}`}>{supply.name}</td>
                  <td>
                    {supply.toBeDelivered ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td>{supply.beforePrice}</td>
                  <td>{supply.currentPrice}</td>
                  <td>{supply?.category?.title}</td>
                  <td>
                    <LinkContainer to={`/admin/supply/${supply._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(supply._id)}
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
            pages={supplies.pages}
            page={supplies.page}
            isAdmin={true}
            pageName="supplylist"
          />
        </>
      )}
    </Container>
  );
};

export default SupplyListScreen;
