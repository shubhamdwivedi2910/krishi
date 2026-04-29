const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const productController = require('../controllers/productController');
const purchaseController = require('../controllers/purchaseController'); // ✅ ADD THIS
const auth = require('../middleware/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/dashboard', auth, dashboardController.getDashboard);

router.post('/add-product', auth, productController.addProduct);

router.post('/add-stock', auth, purchaseController.addStock);

module.exports = router;