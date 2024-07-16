import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import LangSelectInput from '../../components/LangSelectInput';
import {
  useGetSupplyCategoryDetailsQuery,
  useUpdateSupplyCategoryMutation,
  useGetSupplyCategoriesQuery,
} from '../../slices/supplyCategoriesApiSlice';

const SupplyCatEditScreen = () => {
  const { id: supplyCatId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [parent, setParent] = useState('');
  const [transTitleHu, setTransTitleHu] = useState('');
  const [transDescHu, setTransDescHu] = useState('');

  const {
    data: supplyCats,
    isLoading: GetLoading,
    error: getError,
  } = useGetSupplyCategoriesQuery({ sort: 'title' });

  const {
    data: category,
    isLoading,
    refetch,
    error,
  } = useGetSupplyCategoryDetailsQuery(supplyCatId);

  const [updateSupplyCategory, { isLoading: loadingUpdate }] =
    useUpdateSupplyCategoryMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (category) {
      setTitle(category.title);
      setDescription(category.description);
      setParent(category?.parent?._id);
      setTransTitleHu(category.translations?.hu?.title || category.title);
      setTransDescHu(
        category.translations?.hu?.description || category.description
      );
    }
  }, [category]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSupplyCategory({
        supplyCatId,
        title,
        description,
        translations: { hu: { title: transTitleHu, description: transDescHu } },
        parent: parent === '' ? null : parent,
      }).unwrap();
      toast.success('Category updated');
      refetch();
      navigate('/admin/supplycategorylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/supplycategorylist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Supply Category</h2>
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
            {GetLoading ? (
              <Loader />
            ) : getError ? (
              <Message variant="danger">{getError.data.message}</Message>
            ) : (
              supplyCats.data &&
              supplyCats.data.length > 1 && (
                <Form.Group controlId="parent" className="my-2">
                  <Form.Label>Parent</Form.Label>
                  <Form.Select
                    value={parent}
                    onChange={(e) => setParent(e.target.value)}
                  >
                    <option value="">No parent</option>
                    {supplyCats.data.map((cat) => (
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

export default SupplyCatEditScreen;
