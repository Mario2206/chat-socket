const initialState = {
    token : sessionStorage.getItem("chat-token") || "",
    username : "",
    imageUrl : ""
}

function keepUserData(previousState = initialState, action) {
    
    let nextState
    switch(action.type) {
        case "KEEP_AUTH_TOKEN" : 
            nextState = {
                ...previousState,
                token : action.value
            }
            
            return nextState || previousState

        case "KEEP_USER_DATA" : 
            nextState = {
                ...previousState,
                username : action.value.username, 
                imageUrl : action.value.imageUrl
            }
            
            return nextState || previousState  

        default : 
            return previousState
    }
    
}
export default keepUserData