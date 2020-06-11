import React from "react"
import PropTypes from 'prop-types'
import LogForm from '../components/form/LogForm';

import "../style/login.css"
function Login({router}) {
    
    const AVERT_TEXT = "Be careful ! The respect is primordial to stay in this general chat"

    return (
        <div className="container-form">
            <div id="container-login">
                <div>
                    <h1>LOGIN</h1>
                </div>
                <div>
                    <LogForm goToRegister={()=>router("/register")} goToChat={()=>router("/notif", {text : AVERT_TEXT, direction : "/chat"})}/>
                </div>
            </div> 
        </div>

    )
}

Login.propTypes = {
    router : PropTypes.func
}

export default Login