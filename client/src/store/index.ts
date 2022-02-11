import { combineReducers, createStore } from "redux";
import apiReducer from './auth/reducers'


const rootReducer = combineReducers({
    api:apiReducer
})


const store = createStore(rootReducer)



export default store