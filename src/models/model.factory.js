const userModel = require('../models/user.model');
const cartModel = require('../models/cart.model');
const productModel = require('../models/movie.model');

// Declare a class to manage the models
class ModelFactory  { 
    static getModel(modelName) {
        switch (modelName) {
            case  'user' :
                return userModel;
            case 'cart':
                return cartModel;
            case 'movie':
                return productModel;
            default:
                throw new Error('Model not found');

        }
    }
}

module.exports = ModelFactory;