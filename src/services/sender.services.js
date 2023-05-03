const emailSender = require('../notifications/email');
const wspSender = require('../notifications/twilio');

module.exports = {

    // Send email and whatsapp to user when he buys a product

    async sendEmailAndWsp(asunto, template, email) {
        await wspSender.sendWhatsapp("+51940837467", asunto);
        await emailSender.send(template, asunto, email);
    },

    // Send email to user when he registers

    async sendEmail(template, asunto, email) {
        await emailSender.send(template, asunto, email);
    }
}