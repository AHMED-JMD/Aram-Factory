import React from "react";
import { createContext, useEffect, useState } from "react";
import { authenticate } from "../api/auth";
export const authContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: {},
  });
  console.log(auth);

  useEffect(() => {
    authenticate().then((user) => {
      setAuth({ isAuthenticated: true, user });
    });
  }, []);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
