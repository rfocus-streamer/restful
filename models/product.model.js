/********
* product.js file - models
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Product = new Schema({
    name: {
        type: String,
        required : [ true, 'name is required'],
        lowercase : false,
        unique : true
    },
    description: {
        type: String,
        required : [true, 'description is required'],
        lowercase : false
    },
    category: {
        type: String,
        required : [ true, 'category is required'],
    },
    price: {
        type: Number,
        required : [ true, 'price is required'],
    },
    images: {
        type: [],
        required : [ false, ''],
    },
    reviews: {
        type: [],
        required : [ false, ''],
    },
    average_rating: {
        type: Number,
        required : [ true, 'average rating is required'],
    },
    in_stock: {
        type: Boolean,
        required : [ true, 'instock is required'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', Product);