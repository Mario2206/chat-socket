export const actionKeepUserData = ({username, imageUrl}) => ({

    type : "KEEP_USER_DATA",
    value : {username, imageUrl}
      
})

export const actionKeepToken = token => ({
    
    type : "KEEP_AUTH_TOKEN",
    value : token
      
})