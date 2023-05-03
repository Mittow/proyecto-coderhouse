const messageModel = require('../models/message.model');

module.exports = {

    // Save MSG to DB

    async save(data) {
        await messageModel.saveMsg(data);
    },

    // Get all MSG from DB

    async getAll() {
        let arrayGuardado = await messageModel.readMsg();
        return arrayGuardado;
    },

    // Get the lengt of the MSG array

    async allLenght() {
        let arrayGuardado = await messageModel.readMsg();
        return arrayGuardado.length;
    }
}