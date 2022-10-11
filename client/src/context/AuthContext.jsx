import React from "react";
import { createContext, useEffect, useState } from "react";
export const authContext = createContext();

const AuthContextProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  useEffect(() => {
    const data = localStorage.getItem("isAuthenticated");
    if ( data !== null ) { 
        setIsAuthenticated(data);
    }
  }, [])


  return (
    <authContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {props.children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
