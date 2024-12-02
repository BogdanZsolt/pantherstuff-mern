import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import Banner from '../components/Banner';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveBillingAddress } from '../slices/cartSlice.js';

const BillingScreen = () => {
  const { t } = useTranslation();

  const cart = useSelector((state) => state.cart);
  const { billingAddress } = cart;

  const [address, setAddress] = useState(billingAddress?.address || '');
  const [city, setCity] = useState(billingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(
    billingAddress?.postalCode || ''
  );
  const [country, setCountry] = useState(billingAddress?.country || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveBillingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };

  return (
    <>
      <Banner title={t('billing')} />
      <Container>
        <FormContainer>
          <CheckoutSteps step1 step2 step3 />
          <h1>{t('billing')}</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="address" className="my-2">
              <Form.Label>{t('address')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterAddress')}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city" className="my-2">
              <Form.Label>{t('city')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterCity')}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode" className="my-2">
              <Form.Label>{t('postalCode')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterPostalCode')}
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="country" className="my-2">
              <Form.Label>{t('country')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('enterCountry')}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              {t('continue')}
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
};

export default BillingScreen;
