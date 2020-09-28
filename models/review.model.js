/********
* review.js file - models
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Review = new Schema({
    name: {
        type: String,
        required : [ true, 'name is required'],
        lowercase : false,
        unique : true
    },
    rating: {
        type: Number,
        required : [true, 'rating is required'],
    },
    comment: {
        type: String,
        required : [ true, 'email is required'],
        lowercase : true
    },
    product_id: {
        type: String,
        required : [ true, 'product id is required'],
        lowercase : false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Review', Review);