import { applyMiddleware, combineReducers, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import apiReducer from './auth/reducers'

const middleware = [thunk,logger]

const rootReducer = combineReducers({
    api:apiReducer
})


const store = createStore(rootReducer,applyMiddleware(...middleware))

export type RootState = ReturnType<typeof store.getState> 

export default store