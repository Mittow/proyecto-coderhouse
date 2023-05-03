const senderServices = require('../services/sender.services');
const mainServices = require('../services/main.services');
const logger = require('../log/winston');

module.exports = {
    // Function to send a message and Email
    sendEmailAndWsp: async (req, res) => {
        const { name, lastname, email, cartId } = req.user
        const fullName = `${name} ${lastname}`;
        const cart = await mainServices.getCartById(cartId);
        const products = cart.products;
        const mapeoDeProductos = products.map(p => `<li>${p.tipo}: ${p.title}</li>`)
        const template = `
            <h1>Hola ${fullName}</h1>
            <p>Estos son los productos que ha agregado a la lista de favoritos:</p>
            <ul>
                ${mapeoDeProductos.join(' ')}
            </ul>
        `
        const asunto = `nuevo pedido de ${fullName}, su email es ${email}`;
        try {
            logger.info('Mensaje y Email enviados correctamente!');
            await senderServices.sendEmailAndWsp(asunto, template, email);
            await mainServices.emptyCart(cartId);
            res.status(200).json({
                message: 'Email and Whatsapp sent successfully'
            });
        } catch (error) {
            logger.error('Error al enviar mensaje y email' + error);
            res.status(500).json({
                message: 'Something went wrong'
            });
        }
    }
}