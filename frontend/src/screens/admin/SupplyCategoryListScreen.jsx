import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetSupplyCategoriesQuery,
  useCreateSupplyCategoryMutation,
  useDeleteSupplyCategoryMutation,
} from '../../slices/supplyCategoriesApiSlice';

const SupplyCategoryListScreen = () => {
  const {
    data: supplyCats,
    isLoading,
    refetch,
    error,
  } = useGetSupplyCategoriesQuery();

  const [createSupplyCategory, { isLoading: loadingCreate }] =
    useCreateSupplyCategoryMutation();
  const [deleteSupplyCategory, { isLoading: loadingDelete }] =
    useDeleteSupplyCategoryMutation();

  const createHandler = async () => {
    if (
      window.confirm('Are you sure you want to create a new supply category?')
    ) {
      try {
        await createSupplyCategory();
        toast.success('Category created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteSupplyCategory(id);
        toast.success('Category deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  console.log(supplyCats);

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center">
          <h2 className="fs-1 fw-semibold">Supply Categories</h2>
        </Row>
        <Row className="align-items-center">
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createHandler}>
              <div className="d-flex align-items-center gap-1">
                <FaEdit /> Create Category
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
                <th>PARENT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {supplyCats.data.map((cat) => (
                <tr key={cat._id}>
                  <td>{cat._id}</td>
                  <td className="text-start">
                    <p className="my-0 py-0">
                      <b>en: </b>
                      {cat.title}
                    </p>
                    <p className="my-0 py-0">
                      <b>hu: </b>
                      {cat.translations?.hu?.title}
                    </p>
                  </td>
                  <td>{cat?.parent?.title}</td>
                  <td>
                    <LinkContainer to={`/admin/supplycategory/${cat._id}/edit`}>
                      <Button variant="primary" className="btn-sm mx-2">
                        <span className="d-flex align-items-center justify-content-center py">
                          <FaEdit />
                        </span>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(cat._id)}
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

export default SupplyCategoryListScreen;
