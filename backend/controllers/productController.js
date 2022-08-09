const async = require('async');
const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  // Expected query string format: hostname/products?category=param&subcategory=param&id=1&id=2&id=3
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
