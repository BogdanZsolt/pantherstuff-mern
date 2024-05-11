import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import {
  useGetProductCategoryDetailsQuery,
  useUpdateProductCategoryMutation,
  useGetProductCategoriesQuery,
} from '../../slices/productCategoriesApiSlice';
import { toast } from 'react-toastify';

const ProductCatEditScreen = () => {
  const { id: productCatId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [parent, setParent] = useState('');

  const {
    data: productCats,
    isLoading: GetLoading,
    error: getError,
  } = useGetProductCategoriesQuery({ sort: '-title' });

  const {
    data: category,
    isLoading,
    refetch,
    error,
  } = useGetProductCategoryDetailsQuery(productCatId);

  const [updateProductCategory, { isLoading: loadingUpdate }] =
    useUpdateProductCategoryMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setDescription(category.description);
      setParent(category.parent);
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProductCategory({
        productCatId,
        title,
        description,
        parent,
      }).unwrap();
      toast.success('Category updated');
      refetch();
      navigate('/admin/productcategorylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  console.log(productCats);

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/productcategorylist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Product Category</h2>
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
            {GetLoading ? (
              <Loader />
            ) : getError ? (
              <Message variant="danger">{getError.data.message}</Message>
            ) : (
              productCats.data &&
              productCats.data.length > 1 && (
                <Form.Group controlId="parent" className="my-2">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                  >
                    <option>No parent</option>
                    {productCats.data.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )
            )}

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default ProductCatEditScreen;
