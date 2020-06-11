import React, {useState} from "react"
import {connect} from "react-redux"
import {actionKeepUserData, actionKeepToken} from '../../store/actions'
import {login} from "../../api/user"
import Input from './Input'
import Form from "../form/Form"
import PropTypes from 'prop-types'
import {testStatus, createFormData} from '../../helpers/form'
import jsonwebtoken from 'jsonwebtoken'



function LogForm({goToRegister, goToChat, keepToken, keepData, token}){

    const [ error, setError ] = useState("")
    const [ loadState, setLoadState ] = useState(false)
    const [ formData, setFormData ] = useState({
      username : {
        value : "",
        status : false
      },
      password : {
        value : "",
        status : ""
      }
    })
    
     const onSubmit =  (e)=> {
        e.preventDefault()
        const data = createFormData(formData)
        setLoadState(true)
        login(data)
        .then(res=> {
           
          if(res.error) {
            setError("Les identifiants ne sont pas corrects")
          } else {
            const newToken = res.token            
            const decodedToken = jsonwebtoken.decode(newToken)
            keepToken(newToken)
            keepData(decodedToken.username, decodedToken.avatar)
            sessionStorage.setItem("chat-token", newToken)
          
            goToChat()
            
          }
          setLoadState(false)
        })
        .catch(error=>console.error(error))
    }

     const onInput = (value, status, name) => {
      
       formData[name].value = value
       formData[name].status = status
      }
    
      return(
        <div id="c_form">

          <Form onSubmit={onSubmit} error={error} loadState={loadState}>

             <Input 
                name="username" 
                type="text" 
                placeholder="Your username" 
                 val={formData.username.value}
                 collecting={(val, status)=>onInput(val, status, "username")}
                label="Pseudo"
              />

              <Input 
                name="password" 
                type="password" 
                placeholder="Your password" 
                val={formData.password.value}
                collecting={(val, status)=>onInput(val, status, "password")}
                label="Mot de passe"
              />

              <a href="" 
              onClick={(e)=>{
                e.preventDefault()
                goToRegister()
                }}>
                Pas de compte ? S'inscrire
              </a>

              <Input 
              name="submit" 
              type="submit"  
              val="login"
              />

           </Form>

        </div>
        
      )
}

const mapStateToProps = state => {
  
  return {
    token : state.token
  }
}
const mapDispatchToProps = dispatch => {
  return {
    keepToken : (token) => dispatch(actionKeepToken(token)),
    keepData : (username, imageUrl)=> dispatch(actionKeepUserData({username, imageUrl}))
  }
}

LogForm.propTypes = {
    goToRegister : PropTypes.func.isRequired,
    goToChat : PropTypes.func.isRequired,
    keepToken : PropTypes.func,
    keepData : PropTypes.func

}

export default connect(mapStateToProps, mapDispatchToProps)(LogForm)
