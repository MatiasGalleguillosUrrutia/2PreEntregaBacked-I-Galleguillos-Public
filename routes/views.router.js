const express = require('express');
const fs = require('fs');
const router = express.Router();

// Función para leer productos
const readProducts = () => JSON.parse(fs.readFileSync('./data/productos.json', 'utf-8') || '[]');

// Ruta para la vista Home
router.get('/', (req, res) => {
    const products = readProducts();
    res.render('home', { title: 'Página Principal', products });
});

// Ruta para la vista de productos en tiempo real
router.get('/realtimeproducts', (req, res) => {
    const products = readProducts();
    res.render('realTimeProducts', { title: 'Productos en Tiempo Real', products });
});

module.exports = router;
