import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import ImageList from '../../components/ImageList';
import SelectSizes from '../../components/SelectSizes';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';
import SelectCategory from '../../components/SelectCategory';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [colors, setColors] = useState(['']);
  const [sizes, setSizes] = useState([]);
  const [active, setActive] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setThumbnails(product.thumbnails);
      setDescription(product.description);
      setCategory(product?.category?._id || '');
      setBeforePrice(product.beforePrice || 0);
      setCurrentPrice(product.currentPrice || 0);
      setCountInStock(product.countInStock);
      setColors(product.colors);
      setSizes(product.sizes);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        thumbnails,
        description,
        category,
        beforePrice,
        currentPrice,
        countInStock,
        colors,
        sizes,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  console.log(sizes);

  return (
    <>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Container className="mt-5">
          <Link to="/admin/productlist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Edit Product</h2>
          </Row>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* THUMBNAIL INPUT PLACEHOLDER */}
              <ImageList
                images={thumbnails}
                setImages={setThumbnails}
                activeImage={active}
                setActiveImage={setActive}
              />

              <Form.Group controlId="description" className="my-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="category" className="my-2">
                <Form.Label>Category</Form.Label>
                <SelectCategory category={category} setCategory={setCategory} />
              </Form.Group>

              <Form.Group controlId="sizes" className="my-2">
                <Form.Label>Sizes</Form.Label>
                <SelectSizes productSize={sizes} setProductSize={setSizes} />
              </Form.Group>

              {/* <Form.Group controlId="category" className="my-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

              <Form.Group controlId="beforePrice" className="my-2">
                <Form.Label>Before Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Before price"
                  value={beforePrice}
                  onChange={(e) => setBeforePrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="currentPrice" className="my-2">
                <Form.Label>Current Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Current price"
                  value={currentPrice}
                  onChange={(e) => setCurrentPrice(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="countInStock" className="my-2">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              {/* COLORS INPUT PLACEHOLDER */}

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </FormContainer>
        </Container>
      )}
    </>
  );
};

export default ProductEditScreen;
