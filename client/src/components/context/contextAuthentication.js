// client/context/contextAuthentication

import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  userData: (() => {
    const data = localStorage.getItem("userData");
    if (data) {
      try {
        return JSON.parse(data);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  })(),
  loading: false,
  error: null,
};

export const UserContext = createContext(INITIAL_STATE);

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        userData: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        userData: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        userData: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        userData: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(state.userData));
  }, [state.userData]);

  return (
    <UserContext.Provider
      value={{
        userData: state.userData,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
