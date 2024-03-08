const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {isAuthenticated} = require('../middlewares/authMiddleware');
const upload = require('../config/upload');

router.get('/products', productController.showProductsAPI);
router.get('/products/:productId', productController.showProductByIdAPI);
router.get('/category/:category', productController.showProductsByCategoryAPI);
router.get('/dashboard/:productId', isAuthenticated, productController.showProductByIdAPI);
router.post('/dashboard/new', isAuthenticated, upload.single('image'), productController.createProductAPI);
router.post('/dashboard/:productId/edit', isAuthenticated, upload.single('image'), productController.editProductAPI);
router.post('/dashboard/:productId/delete',isAuthenticated, productController.deleteProductAPI);

module.exports = router;

