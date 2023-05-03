const { Router } = require("express");
const router = new Router();
const auth = require('../../middlewares/auth');
const { getHome, getSearch, getChat, getChatEmail , getCart } = require('../../controllers/home.controller');

// Main page of the website

router.get('/', auth, getHome);

// Search by category 

router.get(`/buscar`, auth, getSearch)

// Chat page

router.get('/chat', auth, getChat)

// Search msg by email

router.get('/chat/:email', auth, getChatEmail)

// Cart page

router.get('/favorites', auth, getCart)

module.exports = router;