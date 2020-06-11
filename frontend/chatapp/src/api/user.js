
export const login = (data)=>{
    const url = 'http://localhost:3001/user/login'
    const header = new Headers({'Accept': 'application/json','Content-Type': 'application/json'})
    return fetch(url, {
        method : "POST",
        headers : {'Accept': 'application/json','Content-Type': 'application/json'},
        body : JSON.stringify(Object.fromEntries(data)), 
    })
    .then(res=>res.json())
    .catch(error=>{throw error})
}

export const subscribe = (data)=> {
    const url = 'http://localhost:3001/user/register'
    return fetch(url, {
        method : "POST",
        body : data, 
    })
    .then(res=>res.json())
    .catch(error=>{throw error})
}

