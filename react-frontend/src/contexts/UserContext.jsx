import React, {createContext, useState, useContext} from "react";
import {jwtDecode} from "jwt-decode"; // Make sure to import jwt-decode

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (userData) => {
    const {email, password} = userData;

    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      if (!response.ok) {
        throw new Error("Login failed"); // Provide a more specific error message based on response
      }

      const {accessToken} = await response.json();

      if (accessToken) {
        setAccessToken(accessToken);
        const decoded = jwtDecode(accessToken);

        setUser({email: decoded.email, roles: decoded.roles}); // Adjust according to your token structure
      }
    } catch (err) {
      console.error(err); // Log the error
      throw err; // Re-throw the error to be handled where login is called
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  return (
    <UserContext.Provider value={{user, accessToken, login, logout}}>
      {children}
    </UserContext.Provider>
  );
};
