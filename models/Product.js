// models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: String,
  category: {
    type: String,
    enum: ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios'],
    required: true
  },
  size: {
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL'],
    required: true
  },
  price: {
    type: String,
    required: true
  }
});

productSchema.virtual('url').get(function () {
	return `/products/${this._id}`;
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
