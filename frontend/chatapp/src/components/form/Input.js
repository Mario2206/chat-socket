import React, { useState} from 'react'
import PropTypes from 'prop-types'
import "../../style/input.css"

const Input = ({name, type, val, placeholder, label, collecting, condition})=> {

    const [ value, setValue ] = useState(val ||"")
    const [ classname, setClassName ] = useState("")

    const GOOD_INPUT = "goodInput"
    const BAD_INPUT = "badInput"

    let localStatus = false
    let test = 0

    function onInput(e) { 
        const val = e.target.value
        
        setValue(val)  
        manageLocalStatus(val)

        if(collecting) {
            collecting(val, localStatus)
         }

    }

    function manageLocalStatus(val) {
        if(condition) {
            localStatus = condition(val)
            setClassName(localStatus ? GOOD_INPUT : BAD_INPUT)
        } else {
            localStatus = true
        }
    }

    return(
        <div className="c-input">
            <label>{label}</label>
            <input 
            className={classname}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={onInput}
            />
        </div> 
    )
}
Input.propTypes = {
    name : PropTypes.string.isRequired,
    type : PropTypes.string.isRequired,
    val : PropTypes.string,
    placeholder: PropTypes.string, 
    label : PropTypes.string, 
    collecting : PropTypes.func,//FUNCTION FOR PULLING LOCAL VALUE AND LOCAL STATUS
    condition : PropTypes.func,//TO CHANGE LOCAL STATUS ACCORDING TO SOME CONDITIONS
}
export default Input