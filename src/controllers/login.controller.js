const mainServices = require('../services/main.services');
const logger = require('../log/winston');

module.exports = {
    // Login page of the website
    getLogin: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de login');
        res.status(200).render('login');
    },
    // Logout page of the website
    getLogout: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de logout');
        const { name, lastname } = req.user;
        req.logOut();
        res.status(200).render('bye', { username: `${name} ${lastname}` });
    },
    // Register page of the website
    getSignUp: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de signup');
        let error = req.query.error;
        if (error == 1) {
            logger.error('El usuario ya existe');
            res.status(200).render('signup', { error: 'Usuario ya registrado' });
            return
        }
        res.render('signup');
    },
    // Erorr login page 
    getErrorLogin: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de error login');
        res.status(404).render('error');
    },
    // Error signup page
    getErrorSignUp: (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de error signup');
        res.status(404).render('errorR');
    },
    // Profile page of the website
    getProfile: async (req, res) => {
        logger.info('Un usuario ha accedido a la pagina de profile');
        const userId = req.user._id;
        const user = await mainServices.getUserById(userId)
        res.status(200).render('profile', { user });
    }
}