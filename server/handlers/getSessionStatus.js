const stripe = require('stripe')('sk_test_51PuHHbGP8twVSmcRc3IjvLT3wIKm4DI6qYVo5YKzWPUZxw0dLDciuY04Sujq2tJk7gxtTdjqBJ37N6Js1uTAzGDw00oORMHU95');

const getSessionStatus = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    res.send({
      status: session.status,
      customer_email: session.customer_details.email,
      orderNumber: session.metadata.order_number
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = getSessionStatus;