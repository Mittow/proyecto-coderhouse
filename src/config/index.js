const mongoStore = require('connect-mongo');
require('dotenv').config();

module.exports = {
    TWILIO_SID: process.env.TWILIO_SID,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    MONGOURI: process.env.MONGOURI,
    MONGOSTORE: { secret: 'secret', resave: true, saveUninitialized: true, store: new mongoStore({ mongoUrl: process.env.MONGOURI, ttl: 10 * 60, expires: 1000 * 60 * 10, autoRemove: "native" })}
}