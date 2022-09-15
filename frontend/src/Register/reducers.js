import {
    REGISTER_USER,
    REGISTER_USER_FULFILLED,
    REGISTER_USER_REJECTED,
  } from "./actions";
  import assignLabels from "../utilities/assignLabels";
  
  const initialState = {
    registrationResponse: null,
    registration: null,
    registrationError: null,
  };
  
  export const registerReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER:
        return {
          ...state,
          registrationResponse: null,
          registration: null,
          registrationError: null,
        };
      case REGISTER_USER_FULFILLED:
        localStorage.setItem('user', action?.payload?.response?.data.id);
        return {
          ...state,
          registrationResponse: action?.payload?.response,
          registration: action?.payload?.response?.data,
          registrationError: null,
        };
      case REGISTER_USER_REJECTED:
        return {
          ...state,
          registrationResponse: null,
          registration: null,
          registrationError: action?.payload?.error,
        };
      default:
        return state;
    }
  };