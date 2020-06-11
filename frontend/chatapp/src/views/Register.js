import React from "react"
import RegForm from "../components/form/RegForm"

export default function Register({router}) {

    return(
        <div className="container-form">
            <div id="container-login">
                <div>
                    <h1>Register</h1>
                </div>
                <div>
                    <RegForm goToNotif={()=>router("notif", "L'inscription s'est passé avec succès")}/>
                </div>
            </div>
        </div>
        
    )
}