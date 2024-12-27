const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/products', productController.addProduct);
router.post('/products/bulk', productController.addMultipleProducts);

router.post('/register', productController.registerUser);
router.post('/login', productController.loginUser);

module.exports = router;
