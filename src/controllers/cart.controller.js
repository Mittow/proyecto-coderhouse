const cartServices = require('../services/cart.services');
const logger = require('../log/winston');

module.exports = {
    // Get cart by id
    getCartById: async (req, res) => {
        if (!req.session) {
            logger.warn('No hay sesion');
            return res.sendStatus(404)
        }
        logger.info('Se obtuvo el carrito correctamente');
        const id = req.user.cartId
        const cart = await cartServices.getCartById(id)
        res.send(cart).status(200)
    },
    // Add product to cart
    addToCart: async (req, res) => {
        logger.info('Se agrega un producto al carrito');
        const { cartId, productId } = req.params;
        await cartServices.addToCart(cartId, productId);
        res.sendStatus(200)
    },
    // Remove product from cart
    deleteProduct: async (req, res) => {
        logger.info('Se elimina un producto del carrito');
        const { cartId, productId } = req.params;
        const cart = await cartServices.deleteProduct(cartId, productId);
        res.status(200)
        return cart
    }
}
