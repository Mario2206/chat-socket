import React from 'react'
import Loading from "../common/Loading"
import {testStatus, createFormData} from '../../helpers/form'

import "../../style/form.css"

function Form ({onSubmit,loadState, error, children, }) {


    return(
        <div className="form">
            {error && (<div className="alert red">{error}</div>) }
           <form onSubmit={onSubmit}>
                {children}
            </form> 
            <div className="container-loading">
                {loadState && <Loading/>}
            </div>
        </div>
        
    )
}

export default Form