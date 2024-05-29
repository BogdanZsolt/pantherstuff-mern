import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useGetProductSizeDetailsQuery,
  useUpdateProductSizeMutation,
} from '../../slices/productSizesApiSlice';
import { toast } from 'react-toastify';

const ProductSizeEditScreen = () => {
  const { id: productSizeId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const {
    data: size,
    isLoading,
    refetch,
    error,
  } = useGetProductSizeDetailsQuery(productSizeId);

  const [updateProductSize, { isLoading: loadingUpdate }] =
    useUpdateProductSizeMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (size) {
      setTitle(size.title);
      setDescription(size.description);
    }
  }, [size]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProductSize({
        productSizeId,
        title,
        description,
      }).unwrap();
      toast.success('Category updated');
      refetch();
      navigate('/admin/productsizelist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/productsizelist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Product Size</h2>
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

export default ProductSizeEditScreen;
