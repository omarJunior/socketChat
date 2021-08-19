const { Socket } = require("socket.io");
const { comprobarJWT } = require("../helpers");

async function socketController(socket = new Socket()){
    //console.log("Cliente conectado", socket.id);
    const token  = socket.handshake.headers['x-token'];
    const usuario = await comprobarJWT(token);
    if(!usuario){
        return socket.disconnect();
    }

    console.log("Se conecto", usuario.nombre);

}

module.exports = {
    socketController
}