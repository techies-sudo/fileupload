import { AxiosResponse } from "axios";
import { Dispatch } from "react";
import { ActionType } from "./actions";
import { SET_ERROR } from "./types";

const resUtils = (response:AxiosResponse)=>(dispatch:Dispatch<ActionType>)=>{

    switch(response.status){
        case 500:{
         return  dispatch({type:SET_ERROR,payload:{type:"warning",msg:response.data.msg,status:true}})
        }
        case 400:{
          return  dispatch({type:SET_ERROR,payload:{type:"error",msg:response.data.msg,status:true}})
         }
         case 200:{
            return  dispatch({type:SET_ERROR,payload:{type:"success",msg:response.data.msg,status:false}})
        }
         default:{
          return  dispatch({type:SET_ERROR,payload:{type:"error",msg:"Request not found",status:true}})
         }
    }
     
}

export default resUtils;