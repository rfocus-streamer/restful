/********
* orders.js file - services
********/

const Order = require('../models/order.model');
const { getUserById } = require("../services/users.service");

const createOrder = async (body) => {
	try {        
        const order_data = {
            products: body.products,
            total: body.total,
            user_id: body.user_id,
            price: body.price,
            note: body.note,
            status : "ordered"
        }
        let newOrder = await Order.create(order_data);

        if (newOrder) {
            return newOrder;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const isIDExists = async (id) => {
    let promise_answer = new Promise((resolve, reject) => {
       resolve(getUserById(id));
    }).catch(function(error) {
        return null;
    });
    return promise_answer;
}

const updateOrder = async (id, orderData) => {
    try {        
        const order_data = {
            products: orderData.products,
            total: orderData.total,
            user_id: orderData.user_id,
            price: orderData.price,
            note: orderData.note,
            status: orderData.status
        }
        let updateOrder = await Order.findByIdAndUpdate(id, order_data, {});

        if (updateOrder) {
            return updateOrder;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const deleteOrder = async (id) => {
    try {
        let order = await Order.findByIdAndRemove(id);
        if (order) {
            return true;
        }else{
           return null
        }
    } catch (error) {
        return null
    }
}

const getOrders = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Order.find());
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getOrderById = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Order.findById(id));
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

module.exports = {
    getOrders: getOrders,
    getOrderById: getOrderById,
    createOrder: createOrder,
    isIDExists: isIDExists,
    updateOrder: updateOrder,
    deleteOrder: deleteOrder
}