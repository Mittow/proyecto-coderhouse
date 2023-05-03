const { Router } = require("express");
const router = new Router();
const products = require("../../services/main.services.js");

// Get all products 

router.get('/', async (req, res) => {
    const productos = await products.getAllMovies()
    res.send(productos).status(200)
})

// Save a product in the DB

router.post('/post', async (req, res) => {
    const {title, tipo, duration, urlImg} = req.body
    await products.saveProducts(title, tipo, duration, urlImg)
    res.sendStatus(200)
})

// Modify a product in the DB

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { title, tipo, duration, urlImg } = req.body
    const producto = await products.updateProduct(id, title, tipo, duration, urlImg)
    res.sendStatus(200)
})

// Delete a product from the DB

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    await products.deleteById(id)
    res.sendStatus(200)
})

module.exports = router;