/*******
* products.controller.js file - controllers
********/ 

const Joi = require('joi');
const { isProductExists, 
	    createProduct,
	    updateProduct,
	    getProducts, 
	    getProductById,
        getProductByCategory,
	    deleteProduct      
      } = require("../services/products.service");


const addProduct = async (req, res, next) => {
    // create schema object
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        average_rating: Joi.number().required(),
        in_stock: Joi.boolean().required(),
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
        let product_exists = await isProductExists(req.body.name);
        if(!product_exists){
        	let add = await createProduct(req.body);
        	if(add){
		        res.status(200).json({
		        	"success": true,
					"message": "product successfully added",
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
					"message": "product "+ req.body.name + " already exists",
					"data": {}
			});
        }        
    }
}

const updateProductData = async (req, res, next) => { 
// create schema object
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        price: Joi.number().required(),
        average_rating: Joi.number().required(),
        in_stock: Joi.boolean().required(),
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
    	let product =  await getProductById(req.params.id);
		if(product === null){
            return res.status(400).json({
            	"success": false,
				'message': "product with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}
        let product_exists = (await isProductExists(req.body.name) && product.name == req.body.name) ? false : await isProductExists(req.body.name);
        if(!product_exists){
        	let edit = await updateProduct(req.params.id, req.body);
        	if(edit){
		        res.status(200).json({
		        	"success": true,
					"message": "product successfully updated",
					"data" : await getProductById(req.params.id)
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
					"message": "product name "+ req.body.name + " already exists",
					"data": {}
			});
        }        
    }
}

const getAllProducts = async (req, res, next) => {
	try {
		return res.status(200).json({
			"success": true,
			'message': 'products fetched successfully',
	        'data': await getProducts()
	    });
     } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const getProductId = async (req, res, next) => {
	try {
		let product =  await getProductById(req.params.id);
		if(product === null){
            return res.status(400).json({
            	"success": false,
				'message': "product with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'product fetched successfully',
		        'data': product
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

const getProductCategory = async (req, res, next) => {
    try {
        let product =  await getProductByCategory(req.params.category);
        if(product === null){
            return res.status(400).json({
                "success": false,
                'message': "product with id "+req.params.category+" does not exist",
                'data': {}
            });
        }else{
            return res.status(200).json({
                "success": true,
                'message': 'product fetched successfully',
                'data': product
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

const deleteProductById = async (req, res, next) => {
	try {
		let product = await deleteProduct(req.params.id);
		if(product === null){
            return res.status(400).json({
            	"success": false,
				'message': "product with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'product successfully deletedy',
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
  addProduct,
  updateProductData,
  getAllProducts,
  getProductId,
  getProductCategory,
  deleteProductById
};
