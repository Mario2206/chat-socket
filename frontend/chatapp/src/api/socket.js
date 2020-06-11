import socketClient from 'socket.io-client'


let socket;

export const createSocket = (token)=> {
  const urlSocket = "http://localhost:3001/chat"
  socket = socketClient(urlSocket,{
    transportOptions: {
      polling: {
        extraHeaders: {
          'Authorization': 'Bearer '+ token
        }
      }
    }
  })
}
export const socketListener = ({onConnection, onOtherConnection, onMessage, onDisconnection})=> {
    
    socket.on("connection", onConnection)
    socket.on("otherConnection", onOtherConnection)
    socket.on('message', onMessage)
    socket.on("disconnection", onDisconnection)
}

export const sendMessage = (message) => {

    socket.emit("message", {message})
}


