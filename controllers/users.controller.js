/*******
* users.controller.js file - controllers
********/ 

const Joi = require('joi');
const { isEmailExists, 
	    createUser,
	    updateUser,
	    getUsers, 
	    getUserById,
	    deleteUser      
      } = require("../services/users.service");


const addUser = async (req, res, next) => {
    // create schema object
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(14).regex(/^\d+$/),
        address: Joi.string().required(),
        zip: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
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
        let email_exists = await isEmailExists(req.body.email);
        if(!email_exists){
        	let add = await createUser(req.body);
        	if(add){
		        res.status(200).json({
		        	"success": true,
					"message": "user successfully added",
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
					"message": "email address "+ req.body.email + " already exists",
					"data": {}
			});
        }        
    }
}

const updateUserData = async (req, res, next) => { 
// create schema object
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().length(14).regex(/^\d+$/),
        address: Joi.string().required(),
        zip: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        country: Joi.string().required(),
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
    	let user =  await getUserById(req.params.id);
		if(user === null){
            return res.status(400).json({
            	"success": false,
				'message': "User with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}
        let email_exists = (await isEmailExists(req.body.email) && user.email == req.body.email) ? false : await isEmailExists(req.body.email);
        if(!email_exists){
        	let edit = await updateUser(req.params.id, req.body);
        	if(edit){
		        res.status(200).json({
		        	"success": true,
					"message": "user successfully updated",
					"data" : await getUserById(req.params.id)
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
					"message": "email address "+ req.body.email + " already exists",
					"data": {}
			});
        }        
    }
}

const getAllUsers = async (req, res, next) => {
	try {
		return res.status(200).json({
			"success": true,
			'message': 'users fetched successfully',
	        'data': await getUsers()
	    });
     } catch (error) {
        return res.status(500).json({
        	"success": false,
            'message': 'something went wrong, Please try again',
            'data': {}
        });
    }
}

const getUserId = async (req, res, next) => {
	try {
		let user =  await getUserById(req.params.id);
		if(user === null){
            return res.status(400).json({
            	"success": false,
				'message': "User with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'user fetched successfully',
		        'data': user
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

const deleteUserById = async (req, res, next) => {
	try {
		let user = await deleteUser(req.params.id);
		if(user === null){
            return res.status(401).json({
            	"success": false,
				'message': "User with id "+req.params.id+" does not exist",
		        'data': {}
		    });
		}else{
			return res.status(200).json({
				"success": true,
				'message': 'user successfully deletedy',
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
  addUser,
  updateUserData,
  getAllUsers,
  getUserId,
  deleteUserById
};
