import { ActionType } from "./actions"

interface INITIAL_STATE_TYPE{
    authenticated:boolean
}


const INITIAL_STATE:INITIAL_STATE_TYPE={
    authenticated:false
}

const reducer=(state:INITIAL_STATE_TYPE=INITIAL_STATE,action:ActionType)=>{
    switch(action.type){
        default:{
           return state
        }
    }
}

export default reducer
