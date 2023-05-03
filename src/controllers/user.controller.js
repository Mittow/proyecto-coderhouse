const logger = require('../log/winston');

module.exports = {
    // Function to get user 
    current: async (req, res) => {
        if (!req.session) {
            logger.warn('No hay sesion');
            return res.sendStatus(404)
        }
        const user = req.user
        logger.info('Se obtuvo el usuario correctamente');
        res.send(user).status(200)
    }
}