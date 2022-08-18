# Shoptendo

Shoptendo is an ecommerce web app for Nintendo products. Users can browse a catalogue, add products to their cart, and pay using Stripe. Check it out [here](https://shoptendo.netlify.app)!

The backend was built using Express, MongoDB, and Stripe API. The frontend was built using React and Redux and features a fully responsive mobile first design.

## Requirements

* node (18.4.0)
* npm (8.12.1)

## Installation and Usage

1. Install dependencies in root, frontend, and backend directories.

```bash
npm install
```

2.  Setup the following environment variables in .env files for frontend and backend directories.

```bash
# /frontend
# REACT_APP_BACKEND_ORIGIN=FOO

# /backend
# PORT=BAR
# FRONTEND_ORIGIN=BAZ
# STRIPE_SECRET_KEY=QUX
# MONGODB_URI=QUUX
```

3. Populate MongoDB database and Stripe Products.

```bash
# cd backend/scripts
# node populateStripeAndDB
```

4. Serve client and server from root directory.

```bash
npm run dev
```
