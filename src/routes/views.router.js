const express = require("express");
const ProductManager = require("../managers/ProductManager")
const productManager = new ProductManager();
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('home', { products });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
  } catch (error) {
    console.error("Error al renderizar la vista en tiempo real:", error);
    res.status(500).send("Error interno del servidor");
  }
});

module.exports = router;
