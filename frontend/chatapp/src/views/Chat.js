import React, {useEffect} from 'react'
import {connect} from "react-redux"
import ChatSocket from "../components/chat/ChatSocket"
import socketClient from 'socket.io-client'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'

function Chat({router, token}) {
    
    useEffect(()=> {
        if(!token) {
            router("/login")
        }
    })
    return(
        <div>
            <Header/>
           <ChatSocket/>
           <Footer />
        </div>
        

    )
}

const mapStateToProps = state=> ({
    token : state.token
})
export default connect(mapStateToProps)(Chat)