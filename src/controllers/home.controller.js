const logger = require('../log/winston');
const mainServices = require('../services/main.services');

module.exports = {
    // Main page of the website
    getHome: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina principal');
        const data = await mainServices.getAllMovies();
        console.log("🚀 ~ file: home.controller.js:9 ~ getHome: ~ data:", data)
        if (data.length == 0) {
            res.status(200).render('index');
        } else {
            res.status(200).render('index', { data, user: req.user});
        }
    },
    // Search by category
    getSearch: async (req, res) => {
        const category = req.query.categoria;
        logger.info(`Un usuario ha accedido a la pagina de ${category}`);
        const data = await mainServices.getByTipo(category);
        res.status(200).render('category', { data, category, user: req.user });
    },
    // Chat page
    getChat: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de add');
        res.status(200).render('form', { user: req.user });
    },
    // Cart page
    getCart: async (req, res) => {
        const { cartId } = req.user;
        const dataCompleta = await mainServices.getCartById(cartId);
        const data = dataCompleta.products;
        logger.info('Un usuario ha accedido a la pagina de Favoritos');
        res.status(200).render('favorite', { data, user: req.user });
    },
    // Search msg by email
    getChatEmail: async (req, res) => {
        const { email } = req.params;
        const data = await mainServices.chatByEmail(email);
        logger.info('Un usuario ha accedido a la pagina de Chat By Email');
        console.log(data);
        res.status(200).render('chatByEmail', { data, user: req.user });
    }
}