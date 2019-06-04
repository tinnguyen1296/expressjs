const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.add);
router.get('/edit/:id', controller.edit);
router.get('/:id', controller.detail);

module.exports = router;
