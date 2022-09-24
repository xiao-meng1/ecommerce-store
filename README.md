# Shoptendo

Shoptendo is an ecommerce web app for Nintendo products. Users can browse a catalogue, add products to their cart, and pay using Stripe. Check it out [here](https://shoptendo.netlify.app)!

Technologies:
* Frontend: React, Redux, React Router, Netlify
* Backend: Express, NodeJS, MongoDB (Mongoose, GridFS), Stripe, Heroku

## Features

Frontend:
* Custom reusable quantity selector component
* Custom react hooks
* Responsive design using media queries
* Semantic HTML

Backend:
* REST API supporting GET requests
* Stripe integration for handling payments
* NodeJS script to populate MongoDB and Stripe from JSON and image data
* NodeJS stream for delivering images from GridFS to the client
* Asynchronous flow control using the Async library

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
# FRONTEND_ORIGIN=BAZ
# PORT=BAR
# STRIPE_SECRET_KEY=QUX
# MONGODB_URI=QUUX
```

3. Populate MongoDB database and Stripe Products.

```bash
cd backend/scripts
node populateStripeAndDB
```

4. Serve client and server from root directory.

```bash
npm run dev
```
