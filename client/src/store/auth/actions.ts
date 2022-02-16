import axios from "axios";
import { Dispatch } from "redux";
import resUtils from "./statusUtils";
import {
  REQUEST_API_FAILED,
  REQUEST_API_LOADING,
  REQUEST_SUCCESS,
  SET_ERROR,
} from "./types";

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch<ActionType>) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/login",
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
      dispatch({type:SET_ERROR,payload:{msg:res.data.msg,status:true,type:"error"}})
    } catch (error) {
      dispatch({ type: REQUEST_API_FAILED, payload: error });
    }
  };
export const registerUser =
  (
    email: string,
    password: string,
    rePassword: string,
    fname: string,
    lname: string
  ) =>
  async (dispatch: Dispatch<ActionType>) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/register",
        { email, password, fname, lname, rePassword },
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
export const forgotPassword =
  (email: string) => async (dispatch: Dispatch<ActionType>) => {
    try {
      const res = await axios.post(
        "http://localhost:3002/forgotpassword",
        { email },
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
export const uploadFile =
  (data: FormData) => async (dispatch: Dispatch<ActionType>) => {
    try {
      const res = await axios.post("http://localhost:3002/upload", data, {
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
      });
    } catch (error) {
      dispatch({ type: REQUEST_API_FAILED, payload: error });
    }
  };
export type ActionType =
  | { type: typeof REQUEST_API_FAILED; payload: any }
  | { type: typeof REQUEST_API_LOADING; payload: boolean }
  | { type: typeof REQUEST_SUCCESS; payload: any } |{type:typeof SET_ERROR;payload:{type:"error" | "info" | "warning" | "success" | undefined,msg:string,status:boolean}}
