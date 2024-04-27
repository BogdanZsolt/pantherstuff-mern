import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Image } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import ImageForm from '../../components/admin/ImageForm';
import { toast } from 'react-toastify';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  // useUploadProductImageMutation,
} from '../../slices/productsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailHover, setThumbnailHover] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [colors, setColors] = useState(['']);
  const [thumbnails, setThumbnails] = useState(['']);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  // const [uploadProductImage, { isLoading: loadingUpload }] =
  //   useUploadProductImageMutation();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        thumbnail,
        thumbnailHover,
        description,
        category,
        beforePrice,
        currentPrice,
        countInStock,
        colors,
        thumbnails,
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('Product updated');
      refetch();
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setThumbnail(product.thumbnail);
      setThumbnailHover(product.thumbnailHover);
      setDescription(product.description);
      setCategory(product.category);
      setBeforePrice(product.beforePrice || 0);
      setCurrentPrice(product.currentPrice || 0);
      setCountInStock(product.countInStock);
      setColors(product.colors);
      setThumbnails(product.thumbnails);
    }
  }, [product]);

  // const uploadFileHandler = async (e) => {
  //   const formData = new FormData();
  //   formData.append('image', e.target.files[0]);
  //   try {
  //     const res = await uploadProductImage(formData).unwrap();
  //     console.log(res);
  //     toast.success(res.message);
  //     setThumbnail(res.image);
  //   } catch (err) {
  //     toast.error(err?.data?.message || err.error);
  //   }
  // };

  return (
    <Container className="mt-5">
      <Link to="/admin/productlist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Product</h2>
      </Row>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
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
            <ImageForm value={thumbnail} setValue={setThumbnail} />
            {thumbnail && (
              <Image
                src={thumbnail}
                alt={name}
                rounded
                style={{ width: '150px', height: 'auto' }}
              />
            )}
            {/* <Form.Group controlId="thumbnail">
              <Form.Label>Thumbnail</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter thumbnail url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
              ></Form.Control>
              <Form.Control
                label="Choose File"
                onChange={uploadFileHandler}
                type="file"
              ></Form.Control>
              {loadingUpload && <Loader />}
            </Form.Group> */}

            {/* THUMBNAIL HOVER INPUT PLACEHOLDER */}
            <ImageForm value={thumbnailHover} setValue={setThumbnailHover} />
            {thumbnailHover && (
              <Image
                src={thumbnailHover}
                alt={name}
                rounded
                style={{ width: '150px', height: 'auto' }}
              />
            )}

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
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

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

            {/* THUMBNAILS INPUT PLACEHOLDER */}

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  );
};

export default ProductEditScreen;
