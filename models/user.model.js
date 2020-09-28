/********
* user.js file - models
********/

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema({
    first_name: {
        type: String,
        required : [ true, 'first name is required'],
        lowercase : false
    },
    last_name: {
        type: String,
        required : [true, 'last name is required'],
        lowercase : false
    },
    email: {
        type: String,
        required : [ true, 'email is required'],
        unique : true,
        lowercase : true
    },
    phone: {
        type: String,
        required : [ true, 'phone is required'],
        lowercase : false
    },
    address: {
        type: String,
        required : [ true, 'address is required'],
        lowercase : false
    },
    address_2: {
        type: String,
        required : [ false, ''],
        lowercase : false
    },
    zip: {
        type: String,
        required : [ true, 'zip is required'],
        lowercase : false
    },
    state: {
        type: String,
        required : [ true, 'state is required'],
        lowercase : false
    },
    city: {
        type: String,
        required : [ true, 'city is required'],
        lowercase : false
    },
    country: {
        type: String,
        required : [ true, 'country is required'],
        lowercase : false
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);