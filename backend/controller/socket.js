
exports.connection = (socket)=> {
    const dataUser = socket.handshake.dataUser
    const users = socket.server.eio.clients.userConnected
    console.log("user connected");
    
    socket.emit("connection", {connection : true, usersConnected : users})  
    socket.broadcast.emit("otherConnection",{usersConnected : users})
   
}


exports.message = (socket, {message})=> {
        const dataUser = socket.handshake.dataUser
        const username = dataUser.username
        const avatar = dataUser.avatar
        
        socket.emit("message", {username,avatar, message})
        socket.broadcast.emit("message", {username,avatar, message})
}   

exports.disconnect = (socket)=> {
    const dataUser = socket.handshake.dataUser
    const users = socket.server.eio.clients.userConnected

    socket.server.eio.clients.userConnected = users.filter(item=>item.username != dataUser.username)

    socket.broadcast.emit("disconnection",{usersConnected : socket.server.eio.clients.userConnected})
    console.log("one user disconnected");
    
}


