const express = require('express');
const multer = require('multer');
const upload = multer({dest: 'public/uploads/'});
const router = express.Router();

const catCon = require('../controllers/categoryController');
const prodCon = require('../controllers/productController');
const mainCon = require('../controllers/mainController');

// deletion
router.post('/product/:id/delete', prodCon.deleteProduct);
router.post('/category/:id/delete', catCon.deleteCategory);
// updating
router.get('/product/:id/update', prodCon.updateProductForm);
router.post('/product/:id/update',upload.single('image'), prodCon.updateProduct);
router.get('/category/:id/update', catCon.updateCategoryForm);
router.post('/category/:id/update', catCon.updateCategory);
// creation
router.get('/create/product', prodCon.createProductForm);
router.post('/create/product', upload.single('image'), prodCon.createProduct);
router.get('/create/category', catCon.createCategoryForm);
router.post('/create/category', catCon.createCategory);
// get pages
router.get('/product/:id', prodCon.getProduct);
router.get('/category/:id', catCon.getCategory);
// main
router.get('/', mainCon.getMain);
router.get('*', mainCon.getNotFound);

// router.post('/file', upload.single('avatar'), (req, res) => {
//     res.send(req.file);
// });

module.exports = router;