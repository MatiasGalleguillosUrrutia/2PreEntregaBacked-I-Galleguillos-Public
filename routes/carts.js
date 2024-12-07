const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

const CARTS_FILE = './data/carrito.json';
const PRODUCTS_FILE = './data/productos.json';

const readCarts = () => JSON.parse(fs.readFileSync(CARTS_FILE, 'utf-8') || '[]');
const writeCarts = (data) => fs.writeFileSync(CARTS_FILE, JSON.stringify(data, null, 2));
const readProducts = () => JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8') || '[]');

// ================================================  CREAMOS UN NUEVO CARRITO ================================================ 
router.post('/', (req, res) => {
    const carts = readCarts();
    const newCart = {
        id: uuidv4(),
        products: [],
    };
    carts.push(newCart);
    writeCarts(carts);
    res.status(201).json(newCart);
});

// ================================================ OBTENEMOS PRODUCTOS DEL CARRITO POR ID DEL PRODUCTO ================================================ 
router.get('/:cid', (req, res) => {
    const carts = readCarts();
    const cart = carts.find(c => c.id === req.params.cid);

    if (!cart) return res.status(404).json({ error: 'Cart not found' });

    res.json(cart.products);
});

// ================================================  AGREGAMOS UN PRODUCTO AL CARRITO ================================================  
router.post('/:cid/products/:pid', (req, res) => {
    const carts = readCarts();
    const products = readProducts();
    const cart = carts.find(c => c.id === req.params.cid);
    const product = products.find(p => p.id === req.params.pid);

    if (!cart) return res.status(404).json({ error: 'Cart not found' });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const existingProduct = cart.products.find(p => p.id === req.params.pid);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.products.push({ id: req.params.pid, quantity: 1 });
    }

    writeCarts(carts);
    res.json(cart);
});

module.exports = router;
