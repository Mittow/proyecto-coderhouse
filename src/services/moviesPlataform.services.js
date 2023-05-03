const moviesModel = require('../models/movie.model');

module.exports = {

    // Save product in DB

    async save(data) {
        await moviesModel.create(data);
    },

    // Get all product

    async getAll() {
        let arrayGuardado = await moviesModel.getAll();
        return arrayGuardado;
    },

    // Get the length of the array

    async allLenght() {
        let arrayGuardado = await moviesModel.getAll();
        return arrayGuardado.length;
    }
}