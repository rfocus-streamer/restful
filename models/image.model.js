/********
* image.js file - models
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Image = new Schema({
    path: {
        type: String,
        required : [ true, 'path is required'],
        lowercase : false,
        unique : true
    },
    product_id: {
        type: String,
        required : [ true, 'product id is required'],
        lowercase : false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', Image);