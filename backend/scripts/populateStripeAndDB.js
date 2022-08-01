#! /usr/bin/env node

require('dotenv').config({ path: '../.env' });
const fs = require('fs');
const mongoose = require('mongoose');
const async = require('async');

const Product = require('../models/product');
const productData = require('../data/products');
// Stripe connection
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// MongoDB connection
mongoose.connect(`${process.env.MONGODB_URI}/store_data_test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection.useDb('store_data_test');
db.on('error', () => {
  console.error('MongoDB connection error:');
});

// GridFS
const bucket = new mongoose.mongo.GridFSBucket(db, {
  bucketName: 'product_images',
});

function uploadProduct(productDataItem, cb) {
  async.waterfall(
    [
      async function createProduct() {
        return await stripe.products.create({
          name: productDataItem.name,
        });
      },
      async function createPrice(stripeProduct) {
        return stripe.prices.create({
          unit_amount: productDataItem['MSRP (CAD in cents)'],
          currency: 'cad',
          product: stripeProduct.id,
        });
      },
      function uploadToGridFS(stripePrice, cb) {
        try {
          const readStream = fs.createReadStream(
            `../data/images/${productDataItem['image file']}`
          );
          const uploadStream = bucket.openUploadStream(
            productDataItem['image file'],
            {
              chunkSizeBytes: 1048576,
              metadata: { game: productDataItem.name },
            }
          );
          readStream.pipe(uploadStream).on('finish', () => {
            return cb(null, stripePrice, uploadStream.id);
          });
        } catch (err) {
          cb(err, null);
        }
      },
      function uploadDocument(stripePrice, imageId, cb) {
        try {
          const product = new Product({
            name: productDataItem.name,
            category: productDataItem.category,
            subcategory: productDataItem.subcategory,
            description: productDataItem.description,
            'MSRP (CAD in cents)': productDataItem['MSRP (CAD in cents)'],
            stock: productDataItem.stock,
            'image file': imageId,
            'Stripe Product ID': stripePrice.product,
            'Stripe Price ID': stripePrice.id,
          });

          product.save().then((prod) => cb(null, prod));
        } catch (err) {
          cb(err, null);
        }
      },
    ],
    function (err, prod) {
      if (err) {
        console.log(err);
      } else {
        console.log(`Populated product ${prod.name} with no errors`);
        cb();
      }
    }
  );
}

async.each(productData, uploadProduct, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('All products have been populated successfully');
  }
});
