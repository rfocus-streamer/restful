/*******
* orders.controller.js file - controllers
********/ 

const Joi = require('joi');
const { 
	    createReview,
	    updateReview,
	    getReviews, 
	    getReviewById,
        isReviewExists,
        isIDExists,
	    deleteReview   
      } = require("../services/reviews.service");

const addReview = async (req, res, next) => {
    // create schema object
    const schema = Joi.object({
        name: Joi.string().required(),
        rating: Joi.number().required(),
        comment: Joi.string().required(),
        product_id: Joi.string().required(),
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
        let id_exists = await isIDExists(req.body.product_id);
        if(id_exists){
        	let add = await createReview(req.body);
        	if(add){
		        res.status(200).json({
		        	"success": true,
					"message": "review successfully added",
					"data" : add
			    });
		    }else{
                let name_exists = await isReviewExists(req.body.name);
                if(name_exists){
                    res.status(400).json({
                        "success": false,
                        "message": "review name "+ req.body.name + " it already exists",
                        "data": {}
                     });
                }else{
    		        res.status(400).json({
    		        	"success": false,
    					"message": "something went wrong11",
    					"data": {}
    			    });
                }
		    }
        }else{
        	res.status(400).json({
		        	"success": false,
					"message": "product id "+ req.body.product_id + " not exists",
					"data": {}
			});
        }        
    }
}

const updateReviewData = async (req, res, next) => { 
// create schema object
    const schema = Joi.object({
        name: Joi.string().required(),
        rating: Joi.number().required(),
        comment: Joi.string().required(),
        product_id: Joi.string().required(),
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
    	let product_id =  await isIDExists(req.body.product_id);
		if(product_id === null){
            return res.status(400).json({
            	"success": false,
				'message': "product with id "+req.body.product_id+" does not exist",
		        'data': {}
		    });
		}
        let review_exists = await getReviewById(req.params.id);
        if(review_exists){
        	let edit = await updateReview(req.params.id, req.body);
        	if(edit){
		        res.status(200).json({
		        	"success": true,
					"message": "review successfully updated",
					"data" : await getReviewById(req.params.id)
			    });
		    }else{
                let name_exists = await isReviewExists(req.body.name);
                if(name_exists){
                    res.status(400).json({
                        "success": false,
                        "message": "review name "+ req.body.name + " it already exists",
                        "data": {}
                     });
                }else{
                    res.status(400).json({
                        "success": false,
                        "message": "something went wrong11",
                        "data": {}
                    });
                }
		    }
        }else{
        	res.status(400).json({
		        	"success": false,
					"message": "review id "+ req.params.id + " not exists",
					"data": {}
			});
        }        
    }
}

const getAllReviews = async (req, res, next) => {
	try {
		return res.status(200).json({
			"success": true,
			'message': 'reviews fetched successfully',
	        'data': await getReviews()
	    });
     } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const getReviewId = async (req, res, next) => {
	try {
		let review =  await getReviewById(req.params.id);
		if(review === null){
            return res.status(400).json({
            	"success": false,
				'message': "review with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'review fetched successfully',
		        'data': review
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

const deleteReviewById = async (req, res, next) => {
	try {
		let review = await deleteReview(req.params.id);
		if(review === null){
            return res.status(400).json({
            	"success": false,
				'message': "review with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'review successfully deletedy',
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
  addReview,
  updateReviewData,
  getAllReviews,
  getReviewId,
  deleteReviewById
};
