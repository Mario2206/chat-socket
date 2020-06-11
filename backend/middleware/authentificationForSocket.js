const jwtt = require("jsonwebtoken")

const authentificationForSocket = (req, next)=> {
    try {
        
        const token = req.handshake.headers.authorization.split(" ")[1]
        
        const decodedToken = jwtt.verify(token, "THIS_IS_MY_CHAT")
        // console.log(decodedToken);
        
        if(decodedToken) {
            req.handshake.dataUser = {username : decodedToken.username, avatar : decodedToken.avatar}
            next()
        }

    } catch(error) { 
        
        next(new Error('Bad token')) 
    }
    
}

module.exports = authentificationForSocket