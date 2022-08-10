const async = require('async');
const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  // Expected query string format: category=param&subcategory=param&id=1&id=2&id=3
  const { id, category, subcategory } = req.query;

  if (id) {
    const findProductById = function (productId, callback) {
      Product.findById(productId).exec(function (err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, { queryId: productId, product: result });
        }
      });
    };

    async.map(id, findProductById, function (err, results) {
      if (err) {
        return next(err);
      }
      res.json(results);
    });
  } else if (subcategory && category) {
    Product.find({ category, subcategory }).exec(function (err, result) {
      if (err) {
        return next(err);
      }
      if (result == null) {
        const err = new Error('No products found');
        err.status = 404;
        return next(err);
      }
      res.json(result);
    });
  } else if (category) {
    Product.find({ category }).exec(function (err, result) {
      if (err) {
        return next(err);
      }
      if (result == null) {
        const err = new Error('No products found');
        err.status = 404;
        return next(err);
      }
      res.json(result);
    });
  } else {
    Product.find().exec(function (err, result) {
      if (err) {
        return next(err);
      }
      if (result == null) {
        const err = new Error('No products found');
        err.status = 404;
        return next(err);
      }
      res.json(result);
    });
  }
};

exports.getProductById = (req, res, next) => {
  const { id } = req.params;

  Product.findById(id).exec(function (err, result) {
    if (err) {
      return next(err);
    }
    if (result == null) {
      const err = new Error('Product not found');
      err.status = 404;
      return next(err);
    }
    res.json(result);
  });
};

exports.getProductImageById = (req, res, next) => {
  const { id } = req.params;
  const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection, {
    bucketName: 'product_images',
  });

  bucket.find({ _id: mongoose.Types.ObjectId(id) }).toArray((err, files) => {
    if (err) {
      return next(err);
    }
    if (!files[0] || files.length === 0) {
      const err = new Error('No file found');
      err.status = 404;
      return next(err);
    }
    bucket.openDownloadStream(mongoose.Types.ObjectId(id)).pipe(res);
  });
};
