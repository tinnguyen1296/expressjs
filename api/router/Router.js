const express = require('express');
const productController = require('../controller/productsController');
const authController = require('../controller/authController');

const router = express.Router();

router.get('/products', productController.index);
router.get('/login', authController.loginAPI);

module.exports = router;
