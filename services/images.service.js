/********
* images.js file - services
********/

const Image = require('../models/image.model');
const { getProductById, getProductByCategory } = require("../services/products.service");

const createImage = async (body) => {
	try {        
        const image_data = {
        	product_id : body.product_id,
            path : body.path
        }
        let newImage = await Image.create(image_data);
        if (newImage) {
            return newImage;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const isImageExists = async (name) => {
    return Image.findOne({name: name}).then(function(result){
        return result !== null;
   });
}

const isIDExists = async (id) => {
    let promise_answer = new Promise((resolve, reject) => {
       resolve(getProductById(id));
    }).catch(function(error) {
        return null;
    });
    return promise_answer;
}

const updateImageDB = async (id, imageData) => {
    try {        
        const image_data = {
        	product_id : imageData.product_id,
            path : imageData.path
        }
        let updateImage = await Image.findByIdAndUpdate(id, image_data, {});

        if (updateImage) {
            return updateImage;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const deleteImage = async (id) => {
    try {
        let image = await Image.findByIdAndRemove(id);
        if (image) {
            return true;
        }else{
           return null
        }
    } catch (error) {
        return null
    }
}

const getImages = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Image.find());
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getImageById = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Image.findById(id));
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getImageByCategory = async (category) => {
    let promise_answer = new Promise((resolve, reject) => {
       resolve(getProductByCategory(category));
    }).catch(function(error) {
        return null;
    });
    return promise_answer;
}

module.exports = {
    getImages: getImages,
    getImageById: getImageById,
    getImageByCategory: getImageByCategory,
    createImage: createImage,
    isImageExists: isImageExists,
    isIDExists: isIDExists,
    updateImageDB: updateImageDB,
    deleteImage: deleteImage
}