import { Table, Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import {
  useGetProductCollectionsQuery,
  useCreateProductCollectionMutation,
  useDeleteProductCollectionMutation,
} from '../../slices/productCollectionsApiSlice';

const ProductCollectionListScreen = () => {
  const {
    data: productCollections,
    isLoading,
    refetch,
    error,
  } = useGetProductCollectionsQuery();
  const [createProductCollection, { isLoading: loadingCreate }] =
    useCreateProductCollectionMutation();
  const [deleteProductCollection, { isLoading: loadingDelete }] =
    useDeleteProductCollectionMutation();

  const createHandler = async () => {
    if (window.confirm('Are you sure you want to create a new post?')) {
      try {
        await createProductCollection();
        toast.success('Collection created');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProductCollection(id);
        toast.success('Category deleted');
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
          <h2 className="fs-1 fw-semibold">Product Collections</h2>
        </Row>
        <Row className="align-items-center">
          <Col className="text-end">
            <Button className="btn-sm m-3" onClick={createHandler}>
              <div className="d-flex align-items-center gap-1">
                <FaEdit /> Create Collection
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
              {productCollections.data.map((collection) => (
                <tr key={collection._id}>
                  <td>{collection._id}</td>
                  <td className="text-center">
                    <p className="text-start my-0 py-0">
                      <b>en: </b> {collection.title}
                    </p>
                    <p className="text-start my-0 py-0">
                      <b>hu: </b> {collection.translations?.hu?.title}
                    </p>
                  </td>
                  <td className="text-center">
                    <p className="text-start my-0 py-0">
                      <b>en: </b>
                      {collection.description}
                    </p>
                    <p className="text-start my-0 py-0">
                      <b>hu: </b>
                      {collection.translations?.hu?.description}
                    </p>
                  </td>
                  <td>
                    <LinkContainer
                      to={`/admin/productcollection/${collection._id}/edit`}
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
                      onClick={() => deleteHandler(collection._id)}
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

export default ProductCollectionListScreen;
