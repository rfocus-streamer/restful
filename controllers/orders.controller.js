/*******
* orders.controller.js file - controllers
********/ 

const Joi = require('joi');
const { isProductExists, 
	    createOrder,
	    updateOrder,
	    getOrders, 
	    getOrderById,
        isIDExists,
	    deleteOrder    
      } = require("../services/orders.service");

const addOrder = async (req, res, next) => {
    // create schema object
    const schema = Joi.object({
        products: Joi.array().required(),
        total: Joi.number().required(),
        user_id: Joi.string().required(),
        price: Joi.number().required(),
        note: Joi.string().required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
    
    if (error) {
        const result = Object.keys(error.details).map(i => error.details[i].message.replace(/[\"]/g, ''));
        res.status(200).json({
        	"success": false,
			'message': 'please fill in the required fields',
	        'data': result
	    });
    } else {
        let id_exists = await isIDExists(req.body.user_id);
        if(id_exists){
        	let add = await createOrder(req.body);
        	if(add){
		        res.status(200).json({
		        	"success": true,
					"message": "order successfully added",
					"data" : add
			    });
		    }else{
		        res.status(400).json({
		        	"success": false,
					"message": "something went worng",
					"data": {}
			    });
		    }
        }else{
        	res.status(400).json({
		        	"success": false,
					"message": "user id "+ req.body.user_id + " not exists",
					"data": {}
			});
        }        
    }
}

const updateOrderData = async (req, res, next) => { 
// create schema object
    const schema = Joi.object({
        products: Joi.array().required(),
        total: Joi.number().required(),
        user_id: Joi.string().required(),
        price: Joi.number().required(),
        note: Joi.string().required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: false // remove unknown props
    };

    // validate request body against schema
    const { error, value } = schema.validate(req.body, options);
    
    if (error) {
        const result = Object.keys(error.details).map(i => error.details[i].message.replace(/[\"]/g, ''));
        res.status(200).json({
        	"success": false,
			'message': 'please fill in the required fields',
	        'data': result
	    });
    } else {
    	let user_id =  await isIDExists(req.body.user_id);
		if(user_id === null){
            return res.status(401).json({
            	"success": false,
				'message': "User with id "+req.body.user_id+" does not exist",
		        'data': {}
		    });
		}
        let order_exists = await getOrderById(req.params.id);
        if(order_exists){
        	let edit = await updateOrder(req.params.id, req.body);
        	if(edit){
		        res.status(200).json({
		        	"success": true,
					"message": "order successfully updated",
					"data" : await getOrderById(req.params.id)
			    });
		    }else{
		        res.status(400).json({
		        	"success": false,
					"message": "something went worng",
					"data": {}
			    });
		    }
        }else{
        	res.status(400).json({
		        	"success": false,
					"message": "order with id "+ req.params.id + " not exists",
					"data": {}
			});
        }        
    }
}

const getAllOrders = async (req, res, next) => {
	try {
		return res.status(200).json({
			"success": true,
			'message': 'orders fetched successfully',
	        'data': await getOrders()
	    });
     } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const getOrderId = async (req, res, next) => {
	try {
		let order =  await getOrderById(req.params.id);
		if(order === null){
            return res.status(401).json({
            	"success": false,
				'message': "Order with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'order fetched successfully',
		        'data': order
		    });
	    }
    } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const deleteOrderById = async (req, res, next) => {
	try {
		let order = await deleteOrder(req.params.id);
		if(order === null){
            return res.status(401).json({
            	"success": false,
				'message': "order with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'order successfully deletedy',
		        'data': {}
		    });
	    }
    } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

module.exports = {
  addOrder,
  updateOrderData,
  getAllOrders,
  getOrderId,
  deleteOrderById
};
