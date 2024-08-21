import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-toastify';
import LangSelectInput from '../../components/LangSelectInput';
import LangSelectInputArray from '../../components/LangSelectInputArray';
import {
  useGetPlanDetailsQuery,
  useUpdatePlanMutation,
} from '../../slices/plansApiSlice';

const MembershipPlanEditScreen = () => {
  const { id: planId } = useParams();

  const [name, setName] = useState('');
  const [features, setFeatures] = useState([]);
  const [price, setPrice] = useState(0);
  const [recommended, setRecommended] = useState(false);
  const [transNameHu, setTransNameHu] = useState('');
  const [transFeaturesHu, setTransFeaturesHu] = useState([]);
  const [transPriceHu, setTransPriceHu] = useState(0);

  const {
    data: plan,
    isLoading,
    refetch,
    error,
  } = useGetPlanDetailsQuery(planId);

  const [updatePlan, { isLoading: loadingUpdate }] = useUpdatePlanMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (plan) {
      setName(plan.name);
      setFeatures(plan.features);
      setPrice(plan.price);
      setRecommended(plan.recommended);
      setTransNameHu(plan.translations?.hu?.name || plan.name);
      setTransFeaturesHu(plan.translations?.hu?.features || plan.features);
      setTransPriceHu(plan.translations?.hu?.price || plan.price);
    }
  }, [plan]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePlan({
        planId,
        name,
        features,
        price,
        recommended,
        translations: {
          hu: {
            name: transNameHu,
            features: transFeaturesHu,
            price: transPriceHu,
          },
        },
      }).unwrap();
      toast.success('Plan updated');
      refetch();
      navigate('/admin/membershipplan');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Link to="/admin/membershipplan" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <h2 className="text-center fs-1 fw-bold">Edit Plan</h2>
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
              label="Name"
              defLang={name}
              setDefLang={setName}
              secLang={transNameHu}
              setSecLang={setTransNameHu}
            />
            <LangSelectInputArray
              label="Features"
              defLang={features}
              setDefLang={setFeatures}
              secLang={transFeaturesHu}
              setSecLang={setTransFeaturesHu}
            />
            <LangSelectInput
              label="Price"
              type="number"
              defLang={price}
              setDefLang={setPrice}
              secLang={transPriceHu}
              setSecLang={setTransPriceHu}
            />

            <Form.Group controlId="recommended" className="my-4">
              <Form.Check
                type="checkbox"
                label="Recommended"
                checked={recommended}
                onChange={(e) => setRecommended(e.target.checked)}
              ></Form.Check>
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

export default MembershipPlanEditScreen;
