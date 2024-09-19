import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';
import CompletePage from './CompletePage';
import './App.css';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  'pk_test_51IIw2VJ5jIC6YVu6WBMEmLBznwOn8wKSFIPA7kmN5oCoNKf24qrMB8g8uTYG3psM9uy9aXOGG6BFIl4MeqSjX6pQ004F0MOEcp'
);

export default function App() {
  const [clientSecret, setClientSecret] = useState('');
  const [dpmCheckerLink, setDpmCheckerLink] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt', amount: 1000 }] }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        // [DEV] For demo purposes only
        setDpmCheckerLink(data.dpmCheckerLink);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Router>
      <div className="App">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <Routes>
              <Route
                path="/checkout"
                element={<CheckoutForm dpmCheckerLink={dpmCheckerLink} />}
              />
              <Route path="/complete" element={<CompletePage />} />
            </Routes>
          </Elements>
        )}
      </div>
    </Router>
  );
}
