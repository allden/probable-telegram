const Category = require('../models/categoryInstance');
const Product = require('../models/productInstance');

exports.getMain = (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return console.error(err);
        Product.find({})
        .populate('category')
        .exec((err, products) => {
            if (err) return console.error(err);
            res.render('pages/home', {title: "Home", categories, products})
        });
    });
};

exports.getNotFound = (req, res) => {
    Category.find({}, (err, categories) => {
        if(err) return console.error(err)
        res.render('pages/404', {title: 'Not Found', categories});
    });
};