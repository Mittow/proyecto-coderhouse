const { Router } = require("express");
const router = new Router();
const { sendEmailAndWsp } = require("../../controllers/sendMsg.controller");

// Send email and whatsapp to user when he buys a product

router.post('/:cartId', sendEmailAndWsp)

module.exports = router;