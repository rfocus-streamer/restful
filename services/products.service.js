/********
* products.js file - services
********/

const Product = require('../models/product.model');

const createProduct = async (body) => {
	try {        
        const product_data = {
            name: body.name,
            description: body.description,
            category: body.category,
            price: body.price,
            images: body.images,
            reviews: body.reviews,
            average_rating: body.average_rating,
            in_stock: body.in_stock,
        }
        let newProduct = await Product.create(product_data);

        if (newProduct) {
            return newProduct;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const isProductExists = async (name) => {
    return Product.findOne({name: name}).then(function(result){
        return result !== null;
   });
}

const updateProduct = async (id, productData) => {
    try {        
        const product_data = {
            name: productData.name,
            description: productData.description,
            category: productData.category,
            price: productData.price,
            images: productData.images,
            reviews: productData.reviews,
            average_rating: productData.average_rating,
            in_stock: productData.in_stock,
        }
        let updateProduct = await Product.findByIdAndUpdate(id, product_data, {});

        if (updateProduct) {
            return updateProduct;
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return false
    }
}

const deleteProduct = async (id) => {
    try {
        let product = await Product.findByIdAndRemove(id);
        if (product) {
            return true;
        }else{
           return null
        }
    } catch (error) {
        return null
    }
}

const getProducts = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Product.find());
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getProductById = async (id) => {
	let promise_answer = new Promise((resolve, reject) => {
	   resolve(Product.findById(id));
	}).catch(function(error) {
	    return null;
	});
    return promise_answer;
}

const getProductByCategory = async (category) => {
    let promise_answer = new Promise((resolve, reject) => {
       resolve(Product.findOne({category: category}));
    }).catch(function(error) {
        return null;
    });
    return promise_answer;
}

module.exports = {
    getProducts: getProducts,
    getProductById: getProductById,
    getProductByCategory: getProductByCategory,
    createProduct: createProduct,
    isProductExists: isProductExists,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct
}