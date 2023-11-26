const express = require("express");
const ProductManager = require("../managers/ProductManager")
const productManager = new ProductManager();

const router = express.Router();

router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

module.exports = router;
