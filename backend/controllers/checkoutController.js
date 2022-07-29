require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res, next) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1LPZcjHusaq8iKayOMW2gUoQ',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.FRONTEND_ORIGIN}?success=true`,
    cancel_url: `${process.env.FRONTEND_ORIGIN}?canceled=true`,
  });

  res.redirect(303, session.url);
};
