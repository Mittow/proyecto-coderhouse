const ModelFactory = require('../models/model.factory');
const cartModel = ModelFactory.getModel('cart');

module.exports = {

    // Get cart by id

    async getCartById(id) {
        const cart = await cartModel.getCartById(id)
        return cart;
    },

    // Add a product to cart

    async addToCart(cartId, productId) {
        await cartModel.addProduct(cartId, productId);
    },

    // Delete a product from cart

    async deleteProduct(cartId, productId) {
        await cartModel.deleteProduct(cartId, productId);
    }
}