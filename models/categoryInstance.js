const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: String,
    description: String
});

categorySchema
.virtual('url')
.get(function() {
    return '/category/' + this._id;
})

categorySchema
.virtual('updateUrl')
.get(function() {
    return '/category/' + this._id + '/update';
});

categorySchema
.virtual('deleteUrl')
.get(function() {
    return '/category/' + this._id + '/delete';
})

module.exports = mongoose.model('Category', categorySchema);