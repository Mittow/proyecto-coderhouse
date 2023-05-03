const cartBadge = document.getElementById('cart-badge')

const updateCartBadge = async (parametro) => {
    const cartLengthResponse = await fetch(`https://proyecto-coderhouse.onrender.com/api/cart/getAll`)
    const cart = await cartLengthResponse.json()
    if (parametro != 1) {
        cartBadge.innerHTML = cart.products.length
        return
    }
    cartBadge.innerText = cart.products.length + 1
}

const addToCart = async (cartId, productId) => {
    await updateCartBadge(1)
    await fetch(`https://proyecto-coderhouse.onrender.com/api/cart/${cartId}/${productId}`, { method: 'POST' })
}

const removeFromCart = async (cartId, productId) => {
    const el = document.getElementById(productId)
    el.parentElement.removeChild(el)
    cartBadge.innerHTML--
    await fetch(`https://proyecto-coderhouse.onrender.com/api/cart/${cartId}/${productId}`, { method: 'DELETE' })
}

const sendOrder = async (cartId) => {
    Swal.fire({
        title: 'Quieres confirmar el pedido?',
        showDenyButton: true,
        confirmButtonText: 'Confirmar!',
        denyButtonText: `Cancelar`,
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`https://proyecto-coderhouse.onrender.com/api/sms/${cartId}`, { method: 'POST' })
            Swal.fire('Compra realizada con exito!', '', 'success')
            setTimeout(() => window.location.href = '/',1000)
        } else if (result.isDenied) {
            Swal.fire('Compre rechazada', '', 'info')
            setTimeout(() => window.location.href = '/',1000)
        }
    })
}