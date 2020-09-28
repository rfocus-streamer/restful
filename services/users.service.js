/********
* user.js file - services/users
********/

const User = require('../models/user.model');

const createUser = async (body) => {
	try {        
        const user_data = {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            phone: body.phone,
            address: body.address,
            address_2: body.address_2,
            zip: body.zip,
            state: body.state,
            city: body.city,
            country: body.country
        }
        let newUser = await User.create(user_data);

        if (newUser) {
            return newUser;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const isEmailExists = async (email) => {
    return User.findOne({email: email}).then(function(result){
        return result !== null;
   });
}


const updateUser = async (id, userData) => {
    try {        
        const user_data = {
            first_name: userData.first_name,
            last_name: userData.last_name,
            email: userData.email,
            phone: userData.phone,
            address: userData.address,
            address_2: userData.address_2,
            zip: userData.zip,
            state: userData.state,
            city: userData.city,
            country: userData.country
        }
        let updateUser = await User.findByIdAndUpdate(id, user_data, {});

        if (updateUser) {
            return updateUser;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const deleteUser = async (id) => {
    try {
        let user = await User.findByIdAndRemove(id);
        if (user) {
            return true;
        }else{
           return null
        }
    } catch (error) {
        return null
    }
}

const getUsers = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(User.find());
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getUserById = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(User.findById(id));
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

module.exports = {
    getUsers: getUsers,
    isEmailExists: isEmailExists,
    getUserById: getUserById,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}