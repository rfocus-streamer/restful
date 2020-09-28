/********
* order.js file - models
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Order = new Schema({
    products: {
        type: [],
        required : [ true, 'products is required'],
    },
    total: {
        type: Number,
        required : [true, 'total is required'],
    },
    user_id: {
        type: String,
        required : [ true, 'user id is required'],
    },
    note: {
        type: String,
        required : [ true, 'note is required'],
        lowercase : false
    },
    status: {
        type: String,
        required : [ true, 'status is required'],
        lowercase : false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', Order);