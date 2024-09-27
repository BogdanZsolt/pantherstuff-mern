import { useState } from 'react';
import { Button, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

const CheckoutPay = () => {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    if (elements === null) {
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${import.meta.env.VITE_URL}/order/complete`,
        // import.meta.env.VITE_ENV === 'developer'
        //   ? 'http://localhost:3000/order/complete'
        //   : 'https://pantherstuff.com/order/complete',
      },
    });
    console.log(error);

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setErrorMessage(error.message);
    } else {
      setErrorMessage('An unexpected error occurred.');
    }
  };

  console.log(elements);

  return (
    <>
      <Row>
        <form id="payment-form" onSubmit={handleSubmit}>
          <PaymentElement id="payment-element" />
          <Button
            type="submit"
            disabled={!stripe || !elements}
            className="my-2"
          >
            {t('payNow')}
          </Button>
          {errorMessage && <div id="payment-message">{errorMessage}</div>}
        </form>
      </Row>
    </>
  );
};

export default CheckoutPay;
