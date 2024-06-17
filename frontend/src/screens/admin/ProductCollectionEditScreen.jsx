import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import LangSelectInput from '../../components/LangSelectInput';
import {
  useGetProductCollectionDetailsQuery,
  useUpdateProductCollectionMutation,
} from '../../slices/productCollectionsApiSlice';
import { toast } from 'react-toastify';

const ProductCollectionEditScreen = () => {
  const { id: productCollId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [transTitleHu, setTransTitleHu] = useState('');
  const [transDescHu, setTransDescHu] = useState('');

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
      setTransTitleHu(collection.translations?.hu?.title || collection.title);
      setTransDescHu(
        collection.translations?.hu?.description || collection.description
      );
    }
  }, [collection]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProductCollection({
        productCollId,
        title,
        description,
        translations: { hu: { title: transTitleHu, description: transDescHu } },
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
            <LangSelectInput
              label="Title"
              defLang={title}
              setDefLang={setTitle}
              secLang={transTitleHu}
              setSecLang={setTransTitleHu}
            />
            <LangSelectInput
              label="Description"
              defLang={description}
              placeholder="Enter description"
              placeholder_hu="Adja meg a leírást"
              setDefLang={setDescription}
              secLang={transDescHu}
              setSecLang={setTransDescHu}
            />
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
