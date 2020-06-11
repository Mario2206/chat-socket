import React from "react"
import "../../style/connectButton.css"

const ConnectStatus = ({connectionState, image, username})=> {

    const connectStyle = {
        backgroundImage : "url(" + image + ')'
    }

    return(
        <div className="c-connect-button" style={connectStyle} title={username}>
            <div className= { connectionState ? "button connectButton" : "button disconnectButton"}></div>
        </div>
        
    )
}   


export default ConnectStatus