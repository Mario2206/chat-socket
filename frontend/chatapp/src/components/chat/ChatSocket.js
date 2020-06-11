import React, {useState, useEffect} from "react"
import {connect} from 'react-redux'
import {socketListener, sendMessage, createSocket} from "../../api/socket"
import MessageInterface from './MessageInterface'
import {textEncoder, messageEncoder} from "../../helpers/encoder"



function ChatSocket({username, imageUrl, token}) {

    const [ messages, setMessage ] = useState([])
    const [ users, setUsers ] = useState([])
    const [ connectionState, setConnectionState ] = useState(false)
    
    useEffect(()=> {
        createSocket(token)
        socketListener({onConnection, onOtherConnection, onMessage, onDisconnection})
    }, [])

    const onConnection = (res)=> {
        
        setConnectionState(res.connection || false)
        setUsers(res.usersConnected)
         
    }
    
    const onOtherConnection = (res)=> {  
        setUsers(res.usersConnected)
        
    }
    const onDisconnection = (res)=> {        
        setUsers(res.usersConnected)
    }

    const onMessage = (res)=> {
        const MAX_LENGTH_BY_WORD = 25
        res.message = messageEncoder(res.message,MAX_LENGTH_BY_WORD)
        setMessage(prevMess => [...prevMess, res])
    }


    
    return(
        <MessageInterface messages={messages} user={{username, imageUrl}} connectionState = {connectionState} usersConnected={users} onSendMessage={sendMessage} />
    )
}

const mapStateToProps = state=> ({
    username : state.username,
    imageUrl : state.imageUrl,
    token : state.token
})

export default connect(mapStateToProps)(ChatSocket)   