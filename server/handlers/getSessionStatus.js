const stripe = require('stripe')('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');

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