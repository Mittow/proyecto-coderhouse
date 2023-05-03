const twilio = require('twilio');
const config = require('../config');

class SmsSender {
    constructor() {
        this.client = new twilio(config.TWILIO_SID, config.TWILIO_TOKEN);
    }

    // Function to send Whatsapp to user when he buys a product

    async sendWhatsapp(phone, message) {
        await this.client.messages.create({
            body: message,
            from:"whatsapp:+51940837467",
            to: "whatsapp:" + phone
        })
    }
}

module.exports = new SmsSender();