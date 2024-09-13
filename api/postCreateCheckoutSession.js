const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const YOUR_DOMAIN = 'http://confiseriesucrerose.ca';

export default async function handler(req, res) {
  const { items } = req.body || []; // Assuming you're sending the items from the client in the request body
  
  const orderNumber = uuidv4(); // Generate a unique order ID
  
  const line_items = items.map(item => ({
    price_data: {
      currency: 'cad', // Or the currency you're using
      product_data: {
        name: item.name, // Name of the product
      },
      unit_amount: item.price * 100, // Stripe expects the price in cents (e.g., $10.00 -> 1000)
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    ui_mode: 'embedded',
    line_items: line_items,
    mode: 'payment',
    return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
    automatic_tax: {enabled: true},
    metadata: { order_number: orderNumber},
    custom_fields: [
        {
          key: 'phone_number',
          label: {
            type: 'custom',
            custom: 'Numéro de téléphone',
          },
          type: 'numeric',
        },
      ],
      locale: 'fr'
  });

  const response = { clientSecret: session.client_secret, orderNumber };
  res.send(response);
};