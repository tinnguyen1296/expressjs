const express = require('express');
const controller = require('../controller/productsController');

const router = express.Router();

router.get('/products', controller.index);

module.exports = router;
