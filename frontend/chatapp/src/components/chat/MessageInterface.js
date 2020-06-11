import React, { useEffect, useState } from 'react'
import Input from '../form/Input'
import ConnectStatus from './ConnectStatus'


import "../../style/MessageInterface.css"


 function MessageInterface({messages, user, connectionState, usersConnected, onSendMessage}) {

    const ref = React.createRef()

    const [ message, setMessage ] = useState("")
    
    useEffect(()=> {
        const node = ref.current
        node.scrollTop = node.scrollHeight
        
    })

    function showMsg() {
       
        return messages.map((item, index)=> (
            <div className={item.username === user.username ? "c-msg-details-own" : "c-msg-details-other"} key={index}>
                <span className="user-msg">
                    <img src={item.avatar} />
                </span>
                
                <span className={item.username === user.username ? "msg ownMessage" : "msg otherMessage"} key={index}>
                    {item.message}
                </span>
            </div>
            
        ))
    }

    function showOtherUser() {
        const usersToShow  = usersConnected.filter(item=>item.username!=user.username)
        return usersToShow.map((item, index)=>(
            <span className="icon-users" key={index} title={item.username}>
                <img src={item.avatar}/>
            </span>
        ))
    }

    function sendMessage(e) {
        e.preventDefault()
        if(message) {
            onSendMessage(message)
            setMessage("")
        }
        
    }

    return(
        <div id="c-ui-msg">
            <div id="msg-screen" ref={ref}> 
                {showMsg()}   
            </div>
            <div id="notif">
                {showOtherUser()}
            </div>
            <form id="cont-i-msg" onSubmit={sendMessage}>
                <ConnectStatus connectionState={connectionState} image={user.imageUrl} username={user.username}/>
                <input 
                className="i-msg"
                name="message"
                type="text"
                placeholder="your message"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                />
                <button type="submit" className="b-msg" form="cont-i-msg">
                    <img src="image/sending-icon.png" />
                </button>
            </form>
        </div>
    )
}

export default MessageInterface