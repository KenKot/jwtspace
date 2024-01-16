import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const login = async (userData) => {
    const { email, password } = userData;

    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Needed for cookies to be sent and received
      });

      if (!response.ok) {
        throw new Error("Login failed"); // Provide a more specific error message based on response
      }

      const { accessToken } = await response.json();

      if (accessToken) {
        setAccessToken(accessToken);
        const decoded = jwtDecode(accessToken);

        const { userId, roles } = decoded.UserInfo;
        console.log("userId", userId);
        console.log("roles", roles);

        setUser({ userId, roles }); // Adjust according to your token structure
      }
    } catch (err) {
      console.error(err); // Log the error
      throw err; // Re-throw the error to be handled where login is called
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("/auth/logout", {
        method: "GET",
        credentials: "include", // Important for cookies to be sent and received
      });

      if (response.ok) {
        // Clear user data on client-side
        setUser(null);
        setAccessToken(null);

        // history.push('/login'); // Redirect to login page
      } else {
        // Handle errors (e.g., show a message)
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // const logout = () => {
  // setUser(null);
  // setAccessToken(null);

  // };

  return (
    <UserContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
