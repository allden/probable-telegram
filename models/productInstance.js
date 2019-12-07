const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    price: Number,
    stock: Number,
    image: String
});

productSchema
.virtual('url')
.get(function() {
    return '/product/' + this._id;
});

productSchema
.virtual('updateUrl')
.get(function() {
    return '/product/' + this._id + '/update';
});

productSchema
.virtual('deleteUrl')
.get(function() {
    return '/product/' + this._id + '/delete';
});

module.exports = mongoose.model('Product', productSchema);