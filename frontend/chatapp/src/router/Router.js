import React, {useState, useEffect} from 'react'
import Login from '../views/Login'
import Register from '../views/Register'
import Notif from "../views/Notif"
import Chat from "../views/Chat"

function Router({defaultRoute, data}) {
    
    const [ route, setRoute ] = useState(defaultRoute)
    const [ transData, setTransData ] = useState(null)

    function changeRoute(newRoute, data = null) {
        setTransData(data)
        setRoute(newRoute)
        window.history.pushState(newRoute, newRoute, newRoute)
    }
    
    window.onpopstate = ()=> {
        changeRoute(document.location.pathname)     
    }
    
    switch(route) {
        case "/login" : 
            return(
                <Login router={changeRoute} />
            )
           

        case "/register"  :
            return(
                <Register router={changeRoute}/>
            )
            
        
        case "/notif" : 
            return(
                <Notif data = {transData} router={changeRoute}/>
            )
            
        case "/chat" : 
            return(
                <Chat router={changeRoute}/>
            )
            
        default :
            return (
                <Login router={changeRoute}/>
            )
    }
}

export default Router