const moviesModel = require('../models/movie.model');
const ModelFactory = require('../models/model.factory');
const modelCart = ModelFactory.getModel('cart');
const modelUser = ModelFactory.getModel('user');
const modelChat = require('../models/message.model');

module.exports = {

    // Get all product

    async getAllMovies() {
        const data = await moviesModel.getAll()
        return data;
    },

    // Get product by category

    async getByTipo(category) {
        return await moviesModel.getAllByTipo(category);
    },

    // Save product in DB

    async saveProducts(title, tipo, duration, urlImg) {
        const obj = {
            titulo: title,
            tipo: tipo,
            duracion: duration,
            img: urlImg
        }
        console.log(obj)
        return await moviesModel.create(obj)
    },

    // Update product in DB by id

    async updateProduct(id, title, tipo, duration, urlImg) {
        let obj = {title, tipo, duration, urlImg};
        return await moviesModel.updateById(id, obj)
    },

    // Get MSG by email

    async chatByEmail(email) {
        const data = await modelChat.getMsgByEmail(email);
        return data;
    },

    // Delete product by id

    async deleteById(id) {
        return await moviesModel.deleteById(id)
    },

    // Create user

    async createUser(obj) {
        return await modelUser.save(obj)
    },

    // Get user by id

    async getUserById(id) {
        return await modelUser.getById(id);
    },

    // Verify if email is registered 

    async existsByEmail(email) {
        return await modelUser.existsByEmail(email);
    },

    // Get user by email

    async getByEmail(email) {
        return await modelUser.getByEmail(email);
    },

    // Verifiy if the password is correct

    async isPasswordValid(email, password) {
        return await modelUser.isPasswordValid(email, password);
    },

    // Create cart
    
    async createCart() {
        return await modelCart.createCart();
    },

    // Get cart by id

    async getCartById(cartId) {
        return await modelCart.getCartById(cartId);
    },

    // Empty cart

    async emptyCart(cartId) {
        return await modelCart.emptyCart(cartId);
    }
}