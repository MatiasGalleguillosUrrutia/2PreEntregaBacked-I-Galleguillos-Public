const socket = io(); // Conecta al servidor WebSocket

// Escuchar mensajes del servidor
socket.on('message', (msg) => {
    const messages = document.getElementById('messages');
    const newMessage = document.createElement('li');
    newMessage.textContent = msg;
    messages.appendChild(newMessage);
});

// Función para enviar mensajes al servidor
const sendMessage = () => {
    const input = document.getElementById('messageInput');
    const message = input.value;
    socket.emit('message', message); // Envía el mensaje al servidor
    input.value = ''; // Limpia el campo de entrada
};
