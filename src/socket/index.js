const MsgServices = require('../services/chatPlataform.services');
const moment = require('moment');

module.exports = async (socket, req)  => {

    // Socket.io work with the chatPlataform

socket.on("mensajes", async (data) => {
    data.date = moment().format('DD/MM/YY HH:mm');
    await MsgServices.save(data);
    let arrayMsg = await MsgServices.getAll();
    socket.emit("mensajesCompleto", arrayMsg);
    socket.broadcast.emit("mensajesCompleto", arrayMsg);
});

if (await MsgServices.allLenght() != 0) {
    socket.emit("mensajesCompleto", await MsgServices.getAll());
}

}