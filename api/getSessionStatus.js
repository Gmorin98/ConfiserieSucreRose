const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Use environment variable for the secret key

export default async function handler(req, res) {
  try {
    // Retrieve the session ID from the query string
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

    // Send back the session details
    res.status(200).json({
      status: session.status,
      customer_email: session.customer_details.email,
      orderNumber: session.metadata.order_number,
    });
  } catch (error) {
    console.error('Error retrieving session status:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}