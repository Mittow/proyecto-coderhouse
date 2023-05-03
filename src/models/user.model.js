const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const UserDTO = require('./user/userDTO');

class UserModel {
    constructor() {
        const schema = new Schema({
            email: String,
            name: String,
            lastname: String,
            password: String,
            edad: Number,
            img: String,
            country: String,
            number: Number,
            cartId: Object
        })
        this.model = model('users', schema);
    }

    async getAll() {
        const user = await this.model.find({}).lean();
        return user.map(u => new UserDTO(u._id, u.email, u.name, u.lastname, u.edad, u.img, u.country, u.number, u.cartId));
    }

    // Save user in the database

    async save(user) {
        user.password = await bcrypt.hash(user.password, 10);
        const usuario = await this.model.create(user);
        return {
            _id: usuario._id,
            email: usuario.email,
            name: usuario.name,
            lastname: usuario.lastname,
            img: usuario.img,
            username: `${usuario.name} ${usuario.lastname}`,
            country: usuario.country,
            number: usuario.number,
            cartId: usuario.cartId,
        };
    }

    //  Return a boolean indicating if the email exists in the database

    existsByEmail(email) {
        return this.model.exists({ email });
    }

    // Return user by ID

    async getById(id) {
        return await this.model.findById(id);
    }

    // Return user by email

    async getByEmail(email) {
        return await this.model.findOne({ email });
    }

    // Return a boolean indicating if password is valid

    async isPasswordValid(email, password) {
        const user = await this.model.findOne({ email });
        return await bcrypt.compare(password, user.password);
    }

    // Upload the img of the user

    async uploadImg(id, img) {
        const imgCompleta = '/static/img/users/' + img;
        return await this.model.findByIdAndUpdate(id, { img: imgCompleta });
    }
}

module.exports = new UserModel();