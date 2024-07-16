import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import ImageList from '../../components/ImageList';
import { toast } from 'react-toastify';
import LangSelectInput from '../../components/LangSelectInput';
import LangSelectEditor from '../../components/LangSelectEditor.jsx';
import {
  useGetSupplyDetailsQuery,
  useUpdateSupplyMutation,
} from '../../slices/suppliesApiSlice.js';

const SupplyEditScreen = () => {
  const { id: supplyId } = useParams();

  const [name, setName] = useState('');
  const [thumbnails, setThumbnails] = useState([]);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [beforePrice, setBeforePrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [sizes, setSizes] = useState([]);
  const [active, setActive] = useState('');
  const [transNameHu, setTransNameHu] = useState('');
  const [transDescHu, setTransDescHu] = useState('');
  const [transBeforePriceHu, setTransBeforePriceHu] = useState(0);
  const [transCurrentPriceHu, setTransCurrentPriceHu] = useState(0);

  const {
    data: supply,
    isLoading,
    refetch,
    error,
  } = useGetSupplyDetailsQuery(supplyId);

  const [updateSupply, { isLoading: loadingUpdate }] =
    useUpdateSupplyMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (supply) {
      setName(supply.name);
      setThumbnails(supply.thumbnails);
      setDescription(supply.description);
      setCategory(supply?.category?._id || '');
      setBeforePrice(supply.beforePrice || 0);
      setCurrentPrice(supply.currentPrice || 0);
      setCountInStock(supply.countInStock);
      setSizes(supply.sizes);
      setTransNameHu(supply.translations?.hu?.name || supply.name);
      setTransDescHu(
        supply.translations?.hu?.description || supply.description
      );
      setTransBeforePriceHu(
        supply.translations?.hu?.beforePrice || supply.beforePrice
      );
      setTransCurrentPriceHu(
        supply.translations?.hu?.currentPrice || supply.currentPrice
      );
    }
  }, [supply]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSupply({
        supplyId,
        name,
        thumbnails,
        description,
        category,
        beforePrice,
        currentPrice,
        countInStock,
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
      toast.success('Supply updated');
      refetch();
      navigate('/admin/supplylist');
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
          <Link to="/admin/supplylist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Edit Supply</h2>
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

              <div className="col-md-6">
                <Form.Group controlId="category" className="my-2">
                  <Form.Label>Category</Form.Label>
                </Form.Group>
              </div>

              <Form.Group controlId="sizes" className="my-2">
                <Form.Label>Sizes</Form.Label>
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

export default SupplyEditScreen;
