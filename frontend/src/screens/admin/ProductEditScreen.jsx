import { useState, useEffect, lazy } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import ImageList from '../../components/ImageList';
import SelectSizes from '../../components/SelectSizes';
import { toast } from 'react-toastify';
import SelectCategory from '../../components/SelectCategory';
import SelectCollection from '../../components/SelectCollection';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';
import InputColors from '../../components/InputColors.jsx';
const Editor = lazy(() => import('../../components/Editor.jsx'));

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [collections, setCollections] = useState(null);
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
      setCollections(product?.collections || []);
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
        collections,
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

              {/* <Form.Group controlId="description" className="my-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
              </Form.Group> */}

              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="category" className="my-2">
                    <Form.Label>Category</Form.Label>
                    <SelectCategory
                      category={category}
                      setCategory={setCategory}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="collection" className="my-2">
                    <Form.Label>Collection</Form.Label>
                    <SelectCollection
                      collection={collections}
                      setCollection={setCollections}
                      multi
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group controlId="sizes" className="my-2">
                <Form.Label>Sizes</Form.Label>
                <SelectSizes productSize={sizes} setProductSize={setSizes} />
              </Form.Group>

              {/* COLORS INPUT PLACEHOLDER */}
              <Form.Group controlId="colors" className="my-2">
                <Form.Label>Colors</Form.Label>
                <InputColors colors={colors} setColors={setColors} />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="beforePrice" className="my-2">
                    <Form.Label>Before Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Before price"
                      value={beforePrice}
                      onChange={(e) => setBeforePrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="currentPrice" className="my-2">
                    <Form.Label>Current Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Current price"
                      value={currentPrice}
                      onChange={(e) => setCurrentPrice(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>
              </div>

              <Form.Group controlId="countInStock" className="my-2">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="body" className="my-2">
                <Form.Label>Description</Form.Label>
                <Editor
                  content={description}
                  onDataChange={(data) => setDescription(data)}
                  editable
                />
              </Form.Group>

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
