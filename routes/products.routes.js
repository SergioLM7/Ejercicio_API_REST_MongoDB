const productsController = require('../controllers/products.controllers');
const router = require('express').Router();

// GET http://localhost:3000/api/products
// GET http://localhost:3000/api/products/6
router.get("/products/:id?", productsController.getProduct);

// POST http://localhost:3000/api/products
router.post("/products", productsController.createProduct);

// PUT http://localhost:3000/api/products/id
router.put("/products/:id?", productsController.editProduct);

// DELETE http://localhost:3000/api/products/id
router.delete("/products/:id?", productsController.deleteProduct);

module.exports = router;