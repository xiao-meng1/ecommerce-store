const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: { type: String },
  category: { type: String },
  subcategory: { type: String },
  description: { type: String },
  'MSRP (CAD in cents)': { type: Number },
  stock: { type: Number },
  'image file': { type: mongoose.ObjectId },
  'Stripe Product ID': { type: String },
  'Stripe Price ID': { type: String },
});

module.exports = mongoose.model('Product', ProductSchema);
