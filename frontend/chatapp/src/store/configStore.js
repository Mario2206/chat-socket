import {createStore} from "redux"
import keepUserData from "../store/reducers/keepUserData"

const store = createStore(keepUserData)

export default store