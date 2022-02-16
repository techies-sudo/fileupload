import { ActionType } from "./actions";
import { SET_ERROR } from "./types";

interface INITIAL_STATE_TYPE {
    authenticated: boolean;
  errorObject: {
    errorStatus: boolean;
    errorMessage: string;
    errorType: "error" | "info" | "warning" | "success" | undefined;
  };
}

const INITIAL_STATE: INITIAL_STATE_TYPE = {
    authenticated: false,
  errorObject: {
    errorMessage: "",
    errorStatus: false,
    errorType: undefined,
  },
};

const reducer = (
  state: INITIAL_STATE_TYPE = INITIAL_STATE,
  action: ActionType
) => {
  switch (action.type) {
    case SET_ERROR: {
      return {
        ...state,
        errorObject: {
            ...state.errorObject,
          errorStatus: action.payload.status,
          errorMessage: action.payload.msg,
          errorType: action.payload.type,
        },
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
