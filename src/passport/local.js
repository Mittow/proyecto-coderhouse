const LocalStrategy = require("passport-local").Strategy
const logger = require("../log/winston");
const senderServices = require('../services/sender.services');
const mainServices = require('../services/main.services');

module.exports = (passport) => {
    const authenticateUser = async (email, password, done) => {
        try {

            // Search the user by his email

            if (!await mainServices.existsByEmail(email)) {
                logger.error(`El email ${email} no esta registrado!`);
                return done(null, false, { message: 'Usuario no registrado' });
            }

            // Search the user by his email and compare it with the password
        
            if (!await mainServices.isPasswordValid(email, password)) {
                logger.warn(`El password no es validad!`);
                return done(null, false, { message: 'Contraseña incorrecta' });
            }

            // If the user is registered and the password is valid, get the user

            const user = await mainServices.getByEmail(email);
            done(null, user);
        } catch (e) {
            logger.error(`Error al autenticar el usuario: ${e}`);
            return res.status(500).send({ message: `Error en el servidor: ${e}` });
        }
    }

    const registerUser = async (req, email, password, done) => {
        const { name, lastname, pais, prefix, number, edad } = req.body
        try {

            // Check if the user is already registered

            if (await mainServices.existsByEmail(email)) {
                logger.error(`El email ${email} ya esta registrado!`);
                return done(null, false, { message: 'Usuario ya registrado' })
            }

            // Create the cart for the user

            const cart = await mainServices.createCart()

            // Create the user and save it in the DB with the cart id   
            
            const user = await mainServices.createUser({
                email,
                cartId: cart._id,
                password,
                edad,
                name,
                img: "https://cardiologiaroca.com/wp-content/uploads/2015/11/sin-foto.png",
                lastname,
                country: pais,
                number: `${prefix}${number}`
            })

            // Build the template for the email

            const template = `
                <h1>Se ha registrado un nuevo usuario!</h1>
                <ul>
                    <li>Nombre: ${name}</li>
                    <li>Apellido: ${lastname}</li>
                    <li>Email: ${email}</li>
                    <li>Edad: ${edad}</li>
                    <li>Pais: ${pais}</li>
                    <li>Telefono: ${prefix}${number}</li>
                </ul>
            `

            // Send the email

            await senderServices.sendEmail(template, "nuevo registro", process.env.emailSender)
            done(null, user)
        } catch (err) {
            logger.error(`Error al registrar el usuario: ${err}`);
            done(err)
        }
    }

    passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, authenticateUser))
    passport.use('register', new LocalStrategy({ usernameField: 'email', passwordField: 'password', passReqToCallback: true }, registerUser))

    passport.serializeUser((user, done) => done(null, user))
    passport.deserializeUser((user, done) => done(null, user))
}

