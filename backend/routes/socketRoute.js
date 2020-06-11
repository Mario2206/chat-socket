const socketController = require("../controller/socket")



socketRoute = (socket)=> {
    
    socketController.connection(socket)

    socket.on("message", ({user, message})=> {
       socketController.message(socket, {user, message})
    })

    socket.on("disconnect", ()=> {
       socketController.disconnect(socket)
    })

}
module.exports = socketRoute;