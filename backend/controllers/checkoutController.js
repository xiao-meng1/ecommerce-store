require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res, next) => {
  const { items } = req.body;

  const session = await stripe.checkout.sessions.create({
    line_items: items,
    mode: 'payment',
    success_url: `${process.env.FRONTEND_ORIGIN}`,
    cancel_url: `${process.env.FRONTEND_ORIGIN}`,
  });

  res.json({ url: session.url });
};
