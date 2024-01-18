// OLD
// import React, {useState, useContext} from "react";
// import AuthContext from "../../contexts/AuthContext";

// NEW
import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import { jwtDecode } from "jwt-decode";

import axios from "../../api/axios";
// const LOGIN_URL = "/auth";

import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // OLD
  // const {setAuth} = useContext(AuthContext);

  // NEW
  const { setAuth, persist, setPersist } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const {login} = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const {accessToken} = await login({email, password})
      // const response = await login({email, password});

      const response = await axios.post(
        "/auth",
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        const decoded = jwtDecode(accessToken);

        const { userId, roles } = decoded.UserInfo;
        setAuth({ userId, roles, accessToken });
        // setAuth({ email, userId, roles, accessToken });
        //change above not not use email (which is from state)
      }

      setEmail("");
      setPassword("");
      //from = where the user WANTED to go
      navigate(from, { replace: true });
    } catch (err) {
      // if (!err.status) {
      //   setErrMsg("No Server Response");
      // } else if (err.status === 400) {
      //   setErrMsg("Missing Username or Password");
      // } else if (err.status === 401) {
      //   setErrMsg("Unauthorized");
      // } else {
      //   setErrMsg(err.data?.message);
      // }
    }
  };

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>Login</button>
      <input
        type="checkbox"
        id="persist"
        onChange={togglePersist}
        checked={persist}
      />
      <label htmlFor="persist">Trust this device</label>
    </form>
  );
}
