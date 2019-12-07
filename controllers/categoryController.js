const Category = require('../models/categoryInstance');
const Product = require('../models/productInstance');
const mongoose = require('mongoose');

exports.getCategory = (req, res) => {
    let categoryId = req.params.id;
    Category.find({}, (err, categories) => {
        if(err) return console.error(err);
        if(categoryId.match(/^[0-9a-fA-F]{24}$/)) {
            Category.exists({_id: categoryId}, (err, count) => {
                if(err) return console.error(err);
                if(count > 0 && mongoose.Types.ObjectId.isValid(categoryId)) {
                    Category.findById({_id: categoryId}, (err, category) => {
                        if(err) return console.error(err);
                        Product.find({category: categoryId})
                        .populate('category')
                        .exec((err, products) => {
                            if(err) return console.error(err);
                            res.render('pages/categoryPage', {title: "Categories", category, categories, products});
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

exports.createCategoryForm = (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return console.error(err);
        res.render('pages/createCategoryForm', {title: 'Create Category Form', categories});
    });
};

exports.createCategory = (req, res) => {
    let name = req.body.name;
    let description = req.body.description;

    if(name.trim() === '' || description.trim() === '') {
        let newCat = new Category({name, description});
        newCat.save(err => {
            if (err) return console.error(err);
        });
    
        res.redirect('/');
    } else {
        res.status(400).json({'msg': 'Bad request. Please fill in every field.'});
    };
};

exports.updateCategoryForm = (req, res) => {
    let categoryId = req.params.id;
    Category.exists({_id: categoryId}, (err, count) => {
        if(err) return console.error(err);
        Category.find({}, (err, categories) => {
            if (err) return console.error(err);
            if(count > 0 && mongoose.Types.ObjectId.isValid(categoryId)) {
                Category.findById({_id: categoryId}, (err, category) => {
                    if (err) return console.error(err);
                    res.render('pages/updateCategoryForm', {title: 'Update Category', category, categories});
                });
            } else {
                res.render('pages/404', {title: 'Not found', categories});
            };
        });
    });
};

exports.updateCategory = (req, res) => {
    let categoryId = req.params.id;
    let name = req.body.name;
    let description = req.body.description;

    if(name.trim() !== '' || description.trim() !== '') {
        Category.findOneAndUpdate({_id: categoryId}, {name, description}, err => {
            if (err) return console.error(err);
        });
        res.redirect('/');
    } else {
        res.status(400).json({'msg': 'Bad request. Please fill in every field.'});
    };
};

exports.deleteCategory = (req, res) => {
    let categoryId = req.params.id;
    Category.exists({_id: categoryId}, (err, count) => {
        if(err) return console.error(err);
        if(count > 0 && mongoose.Types.ObjectId.isValid(categoryId)) {
            Category.findOneAndDelete({_id: categoryId}, (err, category) => {
                if (err) return console.error(err);
                if(category.length !== 0)
                res.redirect('/');
            });
        } else {
            res.status(400).json({'msg': 'Bad request. This does not exist.'});
        };
    });
};