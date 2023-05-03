const { model, Schema } = require('mongoose');

class Message {
    constructor() {
        const schema = new Schema({
            email: String,
            name: String,
            lastname: String,
            message: String,
            date: String
        });

        this.model = model('mensajes', schema);
    }

    // Function to save a message in DB

    async saveMsg(data) {
        await this.model.create(data);
    }

    // Function get all messages from DB

    async readMsg() {
        const data = await this.model.find();
        return data;
    }

    // Function to get a message by email

    async getMsgByEmail(email) {
        return await this.model.find({ email });
    }

}
module.exports = new Message();