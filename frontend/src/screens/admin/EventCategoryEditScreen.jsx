import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, Row } from 'react-bootstrap';
import Loader from '../../components/Loader.jsx';
import Message from '../../components/Message.jsx';
import FormContainer from '../../components/FormContainer.jsx';
import LangSelectInput from '../../components/LangSelectInput';
import { toast } from 'react-toastify';
import {
  useGetEventCategoryDetailsQuery,
  useUpdateEventCategoryMutation,
} from '../../slices/eventCategoriesApiSlice.js';

const EventCategoryEditScreen = () => {
  const { id: eventCategoryId } = useParams();

  const [title, setTitle] = useState('');
  const [transTitleHu, setTransTitleHu] = useState('');
  const [description, setDescription] = useState('');
  const [transDescriptionHu, setTransDescriptionHu] = useState('');

  const navigate = useNavigate();

  const {
    data: eventCategory,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetEventCategoryDetailsQuery(eventCategoryId);

  const [
    updateEventCategory,
    { isLoading: isLoadingUpdate, isError: isErrorUpdate, error: errorUpdate },
  ] = useUpdateEventCategoryMutation();

  useEffect(() => {
    if (isSuccess) {
      setTitle(eventCategory.title);
      setTransTitleHu(eventCategory.translations?.hu?.title);
      setDescription(eventCategory.description);
      setTransDescriptionHu(eventCategory.translations?.hu?.description);
    }
  }, [isSuccess, eventCategory]);

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(eventCategoryId);
    try {
      await updateEventCategory({
        eventCategoryId,
        title,
        description,
        translations: {
          hu: {
            title: transTitleHu,
            desription: transDescriptionHu,
          },
        },
      });
      refetch();
      navigate('/admin/eventcategorylist');
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  if (isSuccess) {
    console.log(eventCategory);
  }

  return (
    <>
      {isLoadingUpdate ? (
        <Loader />
      ) : (
        isErrorUpdate &&
        toast.error(errorUpdate.data?.message || errorUpdate.error)
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <Container className="mt-5">
          <Link to="/admin/eventcategorylist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Edit event category</h2>
          </Row>
          <FormContainer>
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
                setDefLang={setDescription}
                secLang={transDescriptionHu}
                setSecLang={setTransDescriptionHu}
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

export default EventCategoryEditScreen;
