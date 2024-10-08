const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(process.env.STRIPE_KEY);
const YOUR_DOMAIN = 'http://www.confiseriesucrerose.ca';

const postCreateCheckoutSession = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.confiseriesucrerose.ca');  // Adjust to your front-end domain
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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
    metadata: { 
      order_number: orderNumber,
    },
    locale: 'fr',
    phone_number_collection: {
      enabled: true,
    },
  });

  const response = { clientSecret: session.client_secret, orderNumber };
  res.send(response);
};

module.exports = postCreateCheckoutSession;