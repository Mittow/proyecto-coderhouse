const { Router } = require("express");
const router = new Router();
const { getCartById, addToCart, deleteProduct } = require("../../controllers/cart.controller");

// Get all products from cart

router.get('/getAll', getCartById);

// Add a product to cart

router.post('/:cartId/:productId', addToCart);

// Delete a product from cart

router.delete('/:cartId/:productId', deleteProduct);

module.exports = router;