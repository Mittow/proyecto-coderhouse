class UserDTO {
    constructor(id, email, fname, lastname, edad, img, country, number, cartId){
        this.id = id;
        this.email = email;
        this.fullName = `${fname} ${lastname}`;
        this.edad = edad;
        this.img = img;
        this.country = country;
        this.number = number;
        this.cartId = cartId;
    }
}

module.exports = UserDTO;