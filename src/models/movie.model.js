const {Schema, model} = require('mongoose');
const logger = require('../log/winston');

class Movie{
    constructor() {
        const schemma = new Schema({
            title: String,
            tipo: String,
            duration: String,
            urlImg: String,
            timestamp: { type: Date, default: Date.now },
        });

        this.model = model('movies', schemma);
    }

    // Function to create a movie or serie in DB

    async create(obj) {
        let data = await this.model.find({});
        if (data.length == 0) {
            obj.id = 1;
        } else {
            obj.id = await this.idProduct() + 1;
        }
        const movie = await this.model.create({title: obj.titulo, tipo: obj.tipo, duration: obj.duracion, urlImg: obj.img, id: obj.id});
        logger.info(`Se ha agregado con exito ${obj.titulo} con el id N${obj.id}`);
        return movie;
    }

    // Function to get all movies and series

    async getAll() {
        return await this.model.find({});
    } 

    // Function to get movie or serie by id

    async getById(id) {
        return await this.model.findById({ _id: id });
    }

    // Function to get product by type

    async getAllByTipo(tipo) {
        const tipoEnMayus = tipo.charAt(0).toUpperCase() + tipo.slice(1);
        logger.info(`${tipoEnMayus} obtenidas correctamente`);
        let data = await this.model.find({ tipo: tipo });
        return data;
    }

    // Function to update serie or movie by id

    async updateById(id, obj) {
        logger.info(`Se ha editado con exito ${obj.title} con el id N${id}`);
        await this.model.updateOne({ _id: id }, { $set: { title: obj.title, tipo: obj.tipo, duration: obj.duration, urlImg: obj.urlImg } });
        return;
    }

    // Function to delete product by id

    async deleteById(id) {
        logger.info(`Se ha eliminado con exito`);
        await this.model.deleteOne({ _id: id });
        return;
    }

    /// Function to get the last id of the movie or serie

    async idProduct() {
        const data = await this.model.find({}).sort({ id: -1 }).limit(1);
        let id = data[0].id;
        return id;
    }

    // Function to get the length of the movies or series 

    async getAllLenght() {
        let data = await this.model.find({});
        return data.length;
    }
}

module.exports = new Movie();