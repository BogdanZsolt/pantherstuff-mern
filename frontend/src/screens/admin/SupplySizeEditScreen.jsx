import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import LangSelectInput from '../../components/LangSelectInput';
import {
  useGetSupplySizeDetailsQuery,
  useUpdateSupplySizeMutation,
} from '../../slices/supplySizesApiSlice';
import { toast } from 'react-toastify';

const SupplySizeEditScreen = () => {
  const { id: supplySizeId } = useParams();

  const [title, setTitle] = useState('');
  const [transTitleHu, setTransTitleHu] = useState('');
  const [description, setDescription] = useState('');
  const [transDescHu, setTransDescHu] = useState('');

  const {
    data: size,
    isLoading,
    refetch,
    error,
  } = useGetSupplySizeDetailsQuery(supplySizeId);

  const [updateSupplySize, { isLoading: loadingUpdate }] =
    useUpdateSupplySizeMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (size) {
      setTitle(size.title);
      setDescription(size.description);
      setTransTitleHu(size.translations?.hu?.title || size.title);
      setTransDescHu(size.translations?.hu?.description || size.description);
    }
  }, [size]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSupplySize({
        supplySizeId,
        title,
        description,
        translations: { hu: { title: transTitleHu, description: transDescHu } },
      }).unwrap();
      toast.success('Category updated');
      refetch();
      navigate('/admin/supplysizelist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/supplysizelist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Supply Size</h2>
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
              <LangSelectInput
                label="Title"
                defLang={title}
                setDefLang={setTitle}
                secLang={transTitleHu}
                setSecLang={setTransTitleHu}
              />
            </Form.Group>
            <Form.Group controlId="description" className="my-2">
              <LangSelectInput
                label="Description"
                defLang={description}
                setDefLang={setDescription}
                secLang={transDescHu}
                setSecLang={setTransDescHu}
              />
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

export default SupplySizeEditScreen;
