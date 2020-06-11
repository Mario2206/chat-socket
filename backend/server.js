const http = require('http')
const app =  require('./app')
const socket = require('socket.io') 
const socketRoute = require('./routes/socketRoute')
const auth = require("./middleware/authentificationForSocket")
const conservUser = require("./middleware/conservUserConnectedToSocket")

const port = 3001

const server = http.createServer(app)
app.set('test', "le test du turfu")
server.on("error", (error)=>{

    console.log(error);
    
})
server.on("listening", ()=> {
    console.log("listen port : " + port);
    
})

server.listen(port)

// SOCKET
const io = socket(server , {

    handlePreflightRequest: (req, res) => {
        const headers = {
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
            "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
            "Access-Control-Allow-Credentials": true
        };

        res.writeHead(200, headers);
        res.end();
    }
})



io.of("/chat").use(auth).use(conservUser).on("connection", socketRoute)



