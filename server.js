const express = require('express');
const { create } = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const viewsRouter = require('./routes/views.router');
const productRoutes = require('./routes/products');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Middleware para compartir el objeto `io` con las rutas
app.use((req, res, next) => {
    req.io = io;
    next();
});

// Configuración de Handlebars
const hbs = create({ extname: '.handlebars' });
app.engine('.handlebars', hbs.engine);
app.set('view engine', '.handlebars');
app.set('views', './views');

// Middleware
app.use(bodyParser.json());
app.use('/assets', express.static('assets'));

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productRoutes);

// WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado a WebSocket');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar servidor
server.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
});
