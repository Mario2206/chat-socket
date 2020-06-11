import React, {useEffect} from 'react';
import Router from './router/Router'
import { Provider } from "react-redux"
import jwt from "jsonwebtoken"
import store from "./store/configStore"
import {actionKeepUserData, actionKeepToken} from './store/actions'
import "./style/app.css"

function App() {
  
  const defaultRoute = document.location.pathname == "/" ? "/login"  : document.location.pathname
  
  useEffect(()=>{
    const token = store.getState().token
    if(token) {
      const decoded = jwt.decode(token)
      store.dispatch(actionKeepUserData({username : decoded.username, imageUrl : decoded.avatar}))
    }
    
  })
  
  return (
    <Provider store={store}>
        <div className="App">
           <Router defaultRoute={defaultRoute}/>
        </div>
    </Provider>
  );
}


export default App;
