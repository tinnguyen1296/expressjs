const express = require('express');
const controller = require('../controllers/authController');
const router = express.Router();

router.get('/login', controller.login);
router.post('/login', controller.post);
// router.post('/login', controller.);

module.exports = router;
