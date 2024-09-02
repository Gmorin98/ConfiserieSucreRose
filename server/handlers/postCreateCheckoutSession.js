const stripe = require('stripe')('sk_test_51PuHHbGP8twVSmcRc3IjvLT3wIKm4DI6qYVo5YKzWPUZxw0dLDciuY04Sujq2tJk7gxtTdjqBJ37N6Js1uTAzGDw00oORMHU95');
const YOUR_DOMAIN = 'http://localhost:3000';

const postCreateCheckoutSession = async (req, res) => {
  const { items } = req.body || []; // Assuming you're sending the items from the client in the request body
  
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
    custom_fields: [
        {
          key: 'engraving',
          label: {
            type: 'custom',
            custom: 'Numero de telephone',
          },
          type: 'numeric',
        },
      ],
      locale: 'fr'
  });

  res.send({clientSecret: session.client_secret});
};

module.exports = postCreateCheckoutSession;
