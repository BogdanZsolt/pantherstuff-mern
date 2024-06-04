import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useGetProductCollectionDetailsQuery,
  useUpdateProductCollectionMutation,
} from '../../slices/productCollectionsApiSlice';
import { toast } from 'react-toastify';

const ProductCollectionEditScreen = () => {
  const { id: productCollId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const {
    data: collection,
    isLoading,
    refetch,
    error,
  } = useGetProductCollectionDetailsQuery(productCollId);

  const [updateProductCollection, { isLoading: loadingUpdate }] =
    useUpdateProductCollectionMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (collection) {
      setTitle(collection.title);
      setDescription(collection.description);
    }
  }, [collection]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProductCollection({
        productCollId,
        title,
        description,
      }).unwrap();
      toast.success('Collection updated');
      refetch();
      navigate('/admin/productcollectionlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/productcollectionlist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Product Collection</h2>
      </Row>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default ProductCollectionEditScreen;
