import React, { useState } from 'react'
import Input from './Input'
import Form from '../form/Form'
import ImageInput from '../common/ImageInput'
import {subscribe} from '../../api/user'
import {testStatus, createFormData} from '../../helpers/form'
import Loading from "../common/Loading"

function RegForm ({goToNotif}) {

    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState("")
    const [ formData, setFormData ]  = useState({
        mail : {
            value : "",
            status : null
        },
        username : {
            value : "",
            status : null
        },
        password : {
            value : "",
            status : null
        },
        image : {
            value : "",
            status : null
        }
    })
    
    //EVENT
    const onSubmit = (e)=> {
        e.preventDefault()
        const status = testStatus(formData)
    
        if(status) {
            setLoading(true)
            const data = createFormData(formData)
            
            subscribe(data)
            .then(res=> {
                console.log(res);
                
                if(res.message) 
                {
                    goToNotif()
                }
                else 
                {   
                    setError("Le pseudo ou le mail est déjà pris")      
                }
                setLoading(false)
            })
            .catch(error=>console.error(error))
            return
        }
        alert("Tous les champs ne sont pas remplis")
        return
    }

    const onChange = (value, status, item)=> {
        formData[item].status = status
        formData[item].value = value
    } 

    //Condition
    const conditionLength = (min, max, value)=> value.length >= min && value.length <= max

    const conditionMail = (value)=> {
        const regExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        return regExp.test(value)
    }
    


    return (
            <Form loadState={loading} error={error} onSubmit={onSubmit}>
                <div className="c-reg-image">
                    <ImageInput onChange={(file, status)=>onChange(file, status, "image")}/>
                </div>
                <Input
                name="username"
                type="text"
                placeholder="username"
                condition={(val)=>conditionLength(5, 15, val)}
                collecting={(val, status)=> onChange(val, status, "username")}
                label="Username"
                />
                <Input
                name="mail"
                type="mail"
                placeholder="Mail"
                condition={(value)=>conditionMail(value)}
                collecting={(value, status)=>onChange(value, status, "mail")}
                label="E-mail"
                />
                <Input
                name="password"
                type="password"
                placeholder="*****"
                condition={(value)=>conditionLength(5, Infinity,value)}
                collecting={(value, status)=>onChange(value, status, "password")}
                label="Password"
                />
                <Input
                name="submit"
                type="submit"
                val="S'inscrire"
                />
            </Form>
    )

}

export default RegForm