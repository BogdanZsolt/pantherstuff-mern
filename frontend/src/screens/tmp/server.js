import express from 'express';
const app = express();
// This is your test secret API key.
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51IIw2VJ5jIC6YVu6rwfY84vjAdM7lfCeFUibJYKmgutyIS1yvV8WC3UbewMFAPAfEBXQQvjswb2F4yVmEPcCN7fZ00BhtM9kzB'
);

app.use(express.static('public'));
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'huf',
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    // [DEV]: For demo purposes only, you should avoid exposing the PaymentIntent ID in the client-side code.
    dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
  });
});

app.listen(4242, () => console.log('Node server listening on port 4242!'));
