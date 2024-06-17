import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetProductCategoriesQuery,
  useCreateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} from '../../slices/productCategoriesApiSlice';

const ProductCategoryListScreen = () => {
  const {
    data: productCats,
    isLoading,
    refetch,
    error,
  } = useGetProductCategoriesQuery();
  const [createProductCategory, { isLoading: loadingCreate }] =
    useCreateProductCategoryMutation();
  const [deleteProductCategory, { isLoading: loadingDelete }] =
    useDeleteProductCategoryMutation();

  const createHandler = async () => {
    if (window.confirm('Are you sure you want to create a new post?')) {
      try {
        await createProductCategory();
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
        await deleteProductCategory(id);
        toast.success('Category deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  console.log(productCats);

  return (
    <>
      <Container className="mt-5">
        <Row className="text-center">
          <h2 className="fs-1 fw-semibold">Product Categories</h2>
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
              {productCats.data.map((cat) => (
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
                    <LinkContainer
                      to={`/admin/productcategory/${cat._id}/edit`}
                    >
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

export default ProductCategoryListScreen;
