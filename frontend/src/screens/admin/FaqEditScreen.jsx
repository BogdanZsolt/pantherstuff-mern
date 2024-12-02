import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import { toast } from 'react-toastify';
import LangSelectInput from '../../components/LangSelectInput';
import LangSelectEditor from '../../components/LangSelectEditor.jsx';
import {
  useGetFaqDetailsQuery,
  useUpdateFaqMutation,
} from '../../slices/faqsApiSlice';
import { useGetFaqCategoriesQuery } from '../../slices/faqCategoriesApiSlice.js';

const FaqEditScreen = () => {
  const { id: faqId } = useParams();

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('');
  const [transQuestionHu, setTransQuestionHu] = useState('');
  const [transAnswerHu, setTransAnswerHu] = useState('');

  const { data: faq, isLoading, refetch, error } = useGetFaqDetailsQuery(faqId);

  const {
    data: faqCats,
    isLoading: isCatLoading,
    error: catError,
  } = useGetFaqCategoriesQuery();

  const [updateFaq, { isLoading: loadingUpdate }] = useUpdateFaqMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
      setCategory(faq.category?._id);
      setTransQuestionHu(faq.translations?.hu?.question || faq.question);
      setTransAnswerHu(faq.translations?.hu?.answer || faq.answer);
    }
  }, [faq]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateFaq({
        faqId,
        question,
        answer,
        category: category === '' ? undefined : category,
        translations: {
          hu: {
            question: transQuestionHu,
            answer: transAnswerHu,
          },
        },
      }).unwrap(); // NOTE: here we need to unwrap the Promise to catch any rejection in our catch block
      toast.success('FAQ updated');
      refetch();
      navigate('/admin/faqlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const catSelectHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      {loadingUpdate && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.Message || error.error}
        </Message>
      ) : (
        <Container className="mt-5">
          <Link to="/admin/faqlist" className="btn btn-primary my-3">
            Go Back
          </Link>
          <Row>
            <h2 className="text-center fs-1 fw-bold">Edit FAQ</h2>
          </Row>
          <FormContainer>
            <Form onSubmit={submitHandler}>
              <LangSelectInput
                label="Question"
                defLang={question}
                setDefLang={setQuestion}
                secLang={transQuestionHu}
                setSecLang={setTransQuestionHu}
              />

              <LangSelectEditor
                label="Answer"
                placeholder="Enter answer"
                placeholder_hu="Add meg a választ"
                defLang={answer}
                setDefLang={setAnswer}
                secLang={transAnswerHu}
                setSecLang={setTransAnswerHu}
                className="mt-3"
              />

              {isCatLoading ? (
                <Loader />
              ) : catError ? (
                <Message variant="danger">
                  {error?.data?.Message || error.error}
                </Message>
              ) : (
                <div className="row">
                  <Form.Group controlId="category" className="my-2">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      aria-label="select faqCategory"
                      value={category}
                      onChange={catSelectHandler}
                    >
                      <option value="">Select a FAQ Category...</option>
                      {faqCats.data.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </div>
              )}

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

export default FaqEditScreen;
