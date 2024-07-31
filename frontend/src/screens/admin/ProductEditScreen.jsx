import { useState, useEffect } from 'react';
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
import LangSelectInput from '../../components/LangSelectInput';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from '../../slices/productsApiSlice';
import InputColors from '../../components/InputColors.jsx';
import LangSelectEditor from '../../components/LangSelectEditor.jsx';
import { useGetProductCategoriesQuery } from '../../slices/productCategoriesApiSlice';
import { useGetProductCollectionsQuery } from '../../slices/productCollectionsApiSlice';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [collection, setCollection] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [colors, setColors] = useState(['']);
  const [sizes, setSizes] = useState([]);
  const [active, setActive] = useState('');
  const [transNameHu, setTransNameHu] = useState('');
  const [transDescHu, setTransDescHu] = useState('');
  const [transBeforePriceHu, setTransBeforePriceHu] = useState(0);
  const [transCurrentPriceHu, setTransCurrentPriceHu] = useState(0);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  const {
    data: categories,
    isLoading: isCatLoading,
    error: catError,
  } = useGetProductCategoriesQuery({ sort: 'title' });

  const {
    data: collections,
    isLoading: isCollLoading,
    error: collError,
  } = useGetProductCollectionsQuery({ sort: 'title' });

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setThumbnails(product.thumbnails);
      setDescription(product.description);
      setCategory(product?.category?._id || '');
      setCollection(product?.collections || []);
      setBeforePrice(product.beforePrice || 0);
      setCurrentPrice(product.currentPrice || 0);
      setCountInStock(product.countInStock);
      setColors(product.colors);
      setSizes(product.sizes);
      setTransNameHu(product.translations?.hu?.name || product.name);
      setTransDescHu(
        product.translations?.hu?.description || product.description
      );
      setTransBeforePriceHu(
        product.translations?.hu?.beforePrice || product.beforePrice
      );
      setTransCurrentPriceHu(
        product.translations?.hu?.currentPrice || product.currentPrice
      );
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
        collections: collection,
        beforePrice,
        currentPrice,
        countInStock,
        colors,
        sizes,
        translations: {
          hu: {
            name: transNameHu,
            description: transDescHu,
            beforePrice: transBeforePriceHu,
            currentPrice: transCurrentPriceHu,
          },
        },
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
      {isCatLoading ? (
        <Loader />
      ) : (
        catError && (
          <Message variant="danger">
            {catError?.data?.message || catError.error}
          </Message>
        )
      )}
      {isCollLoading ? (
        <Loader />
      ) : (
        collError && (
          <Message variant="danger">
            {collError?.data?.message || collError.error}
          </Message>
        )
      )}
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
              <LangSelectInput
                label="Name"
                defLang={name}
                setDefLang={setName}
                secLang={transNameHu}
                setSecLang={setTransNameHu}
              />

              {/* THUMBNAIL INPUT PLACEHOLDER */}
              <ImageList
                images={thumbnails}
                setImages={setThumbnails}
                activeImage={active}
                setActiveImage={setActive}
              />

              <div className="row">
                <div className="col-md-6">
                  <Form.Group controlId="category" className="my-2">
                    <Form.Label>Category</Form.Label>
                    <SelectCategory
                      categories={categories}
                      category={category}
                      setCategory={setCategory}
                    />
                  </Form.Group>
                </div>

                <div className="col-md-6">
                  <Form.Group controlId="collection" className="my-2">
                    <Form.Label>Collection</Form.Label>
                    <SelectCollection
                      collections={collections}
                      collection={collection}
                      setCollection={setCollection}
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
                  <LangSelectInput
                    label="Before Price"
                    type="number"
                    placeholder="Before Price"
                    placeholder_hu="Előző ár"
                    defLang={beforePrice}
                    setDefLang={setBeforePrice}
                    secLang={transBeforePriceHu}
                    setSecLang={setTransBeforePriceHu}
                  />
                </div>

                <div className="col-md-6">
                  <LangSelectInput
                    label="Current Price"
                    type="number"
                    placeholder="Current Price"
                    placeholder_hu="Aktuális ár"
                    defLang={currentPrice}
                    setDefLang={setCurrentPrice}
                    secLang={transCurrentPriceHu}
                    setSecLang={setTransCurrentPriceHu}
                  />
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

              {/* <Form.Group controlId="body" className="my-2">
                <Form.Label>Description</Form.Label>
                <Editor
                  content={description}
                  onDataChange={(data) => setDescription(data)}
                  editable
                />
              </Form.Group> */}

              <LangSelectEditor
                label="Description"
                placeholder="Enter description"
                placeholder_hu="Add meg a leírást"
                defLang={description}
                setDefLang={setDescription}
                secLang={transDescHu}
                setSecLang={setTransDescHu}
              />

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
