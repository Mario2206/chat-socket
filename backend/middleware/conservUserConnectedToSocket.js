const conservUserConnectedToSocket = (socket, next)=> {
    const dataUser = socket.handshake.dataUser
    
    if(!socket.server.eio.clients.userConnected) {
        
        socket.server.eio.clients.userConnected =[]
    }
    const socketData = socket.server.eio.clients.userConnected
    const alreadyConnect = socketData.filter(item=>item.username === dataUser.username)
    
    if(alreadyConnect.length == 0) {
        
         socket.server.eio.clients.userConnected = [...socket.server.eio.clients.userConnected, dataUser]
    }
    
    next()

}

module.exports = conservUserConnectedToSocket