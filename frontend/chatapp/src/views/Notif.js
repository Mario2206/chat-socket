import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'

const Notif = ({router, data })=> {

    const [ sec, setSec ] = useState(5)
    const ldata = data || {text : "", direction : "/login"}

    useEffect(() => {
        const currentSec = sec - 1
        if(sec == 0) {
            router(ldata.direction)
            return
        }
        setTimeout(()=>{
            setSec(currentSec)
        }, 1000)
    });

    return(
        <div>
            <h2>{ldata.text}</h2>
            <h4>Cette page est temportaire. Vous allez être redirigé dans {sec} </h4>
        </div>
    )
}

Notif.propTypes = {
    router : PropTypes.func.isRequired,
    data : PropTypes.object
}

export default Notif