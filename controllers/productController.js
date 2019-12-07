const Product = require('../models/productInstance');
const Category = require('../models/categoryInstance');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.getProduct = (req, res) => {
    let productId = req.params.id;
    Category.find({}, (err, categories) => {
        if (err) return console.error(err);
        if(productId.match(/^[0-9a-fA-F]{24}$/)) {
        Product.exists({_id: productId}, (err, count) => {
            if(err) return console.error(err);
                if(count > 0) {
                    Product.findOne({_id: productId})
                    .populate('category')
                    .exec((err, product) => {
                        if (err) return console.error(err);
                        Product.find({category: product.category})
                        .populate('category')
                        .exec((err, products) => {
                            if (err) return console.error(err);
                            res.render('pages/productPage', {title: "Products", product, products, categories});
                        });
                    });
                } else {
                    res.render('pages/404', {title: 'Not found', categories});
                };
            });
        } else {
            res.render('pages/404', {title: 'Not found', categories});
        };
    });
};

exports.createProductForm = (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return console.error(err);
        res.render('pages/createProductForm', {title: "Create Product Form", categories});
    });
};

exports.createProduct = (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = Number(req.body.price);
    let stock = req.body.stock;
    let image = req.file.path.split('/').slice(1).join('/');

    if(name.trim() !== '' || description.trim() !== '' || price.trim() !== '' || stock.trim() !== '' || req.file) {
        let newProd = new Product({name, description, category, price, stock, image});
        newProd.save(err => {
            if (err) return console.error(err);
        });
        res.redirect('/');
    } else {
        res.status(400).json({'msg': 'Bad request. Please make sure that you\'ve filled in all data'});
    };
};

exports.updateProductForm = (req, res) => {
    let productId = req.params.id;
    Category.find({}, (err, categories) => {
        if (err) return console.error(err);
        Product.exists({_id: productId}, (err, count) => {
            if(err) console.error(err);
            if(count > 0 && mongoose.Types.ObjectId.isValid(productId)) {
                Product.findById({_id: productId}, (err, product) => {
                    if (err) return console.error(err);
                    res.render('pages/updateProductForm', {title: 'Update Product', product, categories});
                });
            } else {
                res.render('pages/404', {title: 'Not found', categories});
            };
        });
    });
};

exports.updateProduct = (req, res) => {
    let productId = req.params.id;
    let name = req.body.name;
    let description = req.body.description;
    let category = req.body.category;
    let price = Number(req.body.price);
    let stock = req.body.stock;

    if(name.trim() !== '' || description.trim() !== '' || price.trim() !== '' || stock.trim() !== '' || req.file) {
        Product.findOneAndUpdate({_id: productId}, { $set: {name, description, category, price, stock}}, err => {
            if (err) return console.error(err);
        });

        res.redirect('/');
    } else {
        res.status(400).json({'msg': 'Bad request. Please make sure that you\'ve filled in all data'});
    };
};

exports.deleteProduct = (req, res) => {
    let productId = req.params.id;
    Product.exists({_id: productId}, (err, count) => {
        if(err) return console.error(err);
        if(count > 0 && mongoose.Types.ObjectId.isValid(productId)) {
            Product.findOneAndDelete({_id: productId}, (err, product) => {
                fs.unlink(path.join(__dirname, '..', 'public', product.image), err => {
                    if (err) return console.error(err);
                });
                if (err) return console.error(err);
                res.redirect('/');
            });
        } else {
            res.status(400).json({'msg': 'Bad request. This file does not exist.'});
        };
    });
};