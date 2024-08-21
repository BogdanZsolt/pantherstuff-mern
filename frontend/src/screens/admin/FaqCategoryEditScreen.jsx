import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import LangSelectInput from '../../components/LangSelectInput';
import {
  useGetFaqCategoryDetailsQuery,
  useUpdateFaqCategoryMutation,
} from '../../slices/faqCategoriesApiSlice';

const FaqCategoryEditScreen = () => {
  const { id: faqCatId } = useParams();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [transTitleHu, setTransTitleHu] = useState('');
  const [transDescHu, setTransDescHu] = useState('');

  const {
    data: faqCat,
    isLoading,
    refetch,
    error,
  } = useGetFaqCategoryDetailsQuery(faqCatId);

  const [updateFaqCategory, { isLoading: loadingUpdate }] =
    useUpdateFaqCategoryMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (faqCat) {
      setTitle(faqCat.title);
      setDescription(faqCat.description);
      setTransTitleHu(faqCat.translations?.hu?.title || faqCat.title);
      setTransDescHu(
        faqCat.translations?.hu?.description || faqCat.description
      );
    }
  }, [faqCat]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateFaqCategory({
        faqCatId,
        title,
        description,
        translations: { hu: { title: transTitleHu, description: transDescHu } },
      }).unwrap();
      toast.success('Category updated');
      refetch();
      navigate('/admin/faqcategorylist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/faqcategorylist" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit FAQ Category</h2>
      </Row>
      <FormContainer>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.Message || error.error}
          </Message>
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

export default FaqCategoryEditScreen;
