import axios from "axios";
import { Dispatch } from "redux";
import { REQUEST_API_FAILED, REQUEST_API_LOADING } from "./types";

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    try {
      const res =await axios.post(
        "localhost:5000/login",
        { email, password },
        {
          onUploadProgress: (e: ProgressEvent) => {
            if (
              Math.round((e.loaded * 100) / e.total) === 100 ||
              e.loaded === 0
            ) {
                dispatch({ type: REQUEST_API_LOADING, payload: false });
            } else {
                dispatch({ type: REQUEST_API_LOADING, payload: true });
            }
          },
        }
      );
    } catch (error) {
      dispatch({ type: REQUEST_API_FAILED, payload: error });
    }
  };
export const registerUser = (email:string,password:string,rePassword:string,fname:string,lname:string) =>async(dispatch:Dispatch<ActionType>)=>{
    try {
        const res =await axios.post(
          "localhost:5000/register",
          { email, password,fname,lname,rePassword },
          {
            onUploadProgress: (e: ProgressEvent) => {
              if (
                Math.round((e.loaded * 100) / e.total) === 100 ||
                e.loaded === 0
              ) {
                dispatch({ type: REQUEST_API_LOADING, payload: false });
              } else {
                dispatch({ type: REQUEST_API_LOADING, payload: true });
              }
            },
          }
        );
      } catch (error) {
        dispatch({ type: REQUEST_API_FAILED, payload: error });
      }
}
export const forgotPassword = (email:string) =>async(dispatch:Dispatch<ActionType>)=>{
    try {
          const res = await axios.post(
          "localhost:5000/forgotpassword",
          { email},
          {
            onUploadProgress: (e: ProgressEvent) => {
              if (
                Math.round((e.loaded * 100) / e.total) === 100 ||
                e.loaded === 0
              ) {
                dispatch({ type: REQUEST_API_LOADING, payload: false });
              } else {
                dispatch({ type: REQUEST_API_LOADING, payload: true });
              }
            },
          }
        );
      } catch (error) {
        dispatch({ type: REQUEST_API_FAILED, payload: error });
      }
}
export const uploadFile = (data:FormData) =>async(dispatch:Dispatch<ActionType>)=>{
    
    try {
        const res = await axios
        .post("http://localhost:5000/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e: ProgressEvent) => {
            if (
              Math.round((e.loaded * 100) / e.total) === 100 ||
              e.loaded === 0
            ) {
              dispatch({ type: REQUEST_API_LOADING, payload: false });
            } else {
              dispatch({ type: REQUEST_API_LOADING, payload: true });
            }
          },
        })
    } catch (error) {
        dispatch({type:REQUEST_API_FAILED,payload:error})
    }
   
}
export type ActionType =
  | { type: typeof REQUEST_API_FAILED; payload: any }
  | { type: typeof REQUEST_API_LOADING; payload: boolean };
