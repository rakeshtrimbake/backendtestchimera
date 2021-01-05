const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.post('/', controller.addStorage);
router.get('/checkout',controller.checkoutStorage);
router.get('/', controller.getAllStorage);
router.get('/:id', controller.getById);
router.put('/:id', controller.updateStorage);
router.delete('/:id',controller.deleteStorage);

module.exports = router;