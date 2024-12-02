import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Form, Button, Col } from 'react-bootstrap';
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
  const [measure, setMeasure] = useState('');
  const [qty, setQty] = useState(0);
  const [features, setFeatures] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [recommended, setRecommended] = useState(false);
  const [toBeDelivered, setToBeDelivered] = useState(false);
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
      setMeasure(plan.timeLimitMeasure);
      setQty(plan.timeLimitQty);
      setFeatures(plan.features);
      setCurrentPrice(plan.currentPrice);
      setRecommended(plan.recommended);
      setToBeDelivered(plan.toBeDelivered);
      setTransNameHu(plan.translations?.hu?.name || plan.name);
      setTransFeaturesHu(plan.translations?.hu?.features || plan.features);
      setTransPriceHu(plan.translations?.hu?.currentPrice || plan.currentPrice);
    }
  }, [plan]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updatePlan({
        planId,
        name,
        timeLimitMeasure: measure === '' ? null : measure,
        timeLimitQty: qty <= 0 ? 0 : qty,
        features,
        currentPrice,
        recommended,
        toBeDelivered,
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
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Time limit measure</Form.Label>
                  <Form.Select
                    value={measure}
                    onChange={(e) => setMeasure(e.target.value)}
                  >
                    <option value="">unlimited</option>
                    <option value="year">Year</option>
                    <option value="month">Month</option>
                    <option value="week">Week</option>
                    <option value="day">Day</option>
                    <option value="hour">Hour</option>
                    <option value="min">Minute</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Time limit quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
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
              defLang={currentPrice}
              setDefLang={setCurrentPrice}
              secLang={transPriceHu}
              setSecLang={setTransPriceHu}
            />

            <div className="row">
              <div className="col-md-4">
                <Form.Group controlId="recommended" className="my-4">
                  <Form.Check
                    type="checkbox"
                    label="Recommended"
                    checked={recommended}
                    onChange={(e) => setRecommended(e.target.checked)}
                  ></Form.Check>
                </Form.Group>
              </div>
              <div className="col-md-4">
                <Form.Group controlId="tobedelivered" className="my-4">
                  <Form.Check
                    type="checkbox"
                    label="To Be Delivered"
                    checked={toBeDelivered}
                    onChange={(e) => setToBeDelivered(e.target.checked)}
                  />
                </Form.Group>
              </div>
            </div>

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
