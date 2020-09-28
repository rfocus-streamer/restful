/********
* reviews.js file - services
********/

const Review = require('../models/review.model');
const { getProductById } = require("../services/products.service");

const createReview = async (body) => {
	try {        
        const review_data = {
            name: body.name,
            rating: body.rating,
            comment: body.comment,
            product_id: body.product_id,
        }
        let newReview = await Review.create(review_data);

        if (newReview) {
            return newReview;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const isReviewExists = async (name) => {
    return Review.findOne({name: name}).then(function(result){
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

const updateReview = async (id, reviewData) => {
    try {        
        const review_data = {
            name: reviewData.name,
            rating: reviewData.rating,
            comment: reviewData.comment,
            product_id: reviewData.product_id,
        }
        let updateReview = await Review.findByIdAndUpdate(id, review_data, {});

        if (updateReview) {
            return updateReview;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const deleteReview = async (id) => {
    try {
        let review = await Review.findByIdAndRemove(id);
        if (review) {
            return true;
        }else{
           return null
        }
    } catch (error) {
        return null
    }
}

const getReviews = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Review.find());
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getReviewById = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Review.findById(id));
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

module.exports = {
    getReviews: getReviews,
    getReviewById: getReviewById,
    createReview: createReview,
    isReviewExists: isReviewExists,
    isIDExists: isIDExists,
    updateReview: updateReview,
    deleteReview: deleteReview
}