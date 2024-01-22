import React, { useEffect, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";
import useInput from "../../hooks/useInput";
import useToggle from "../../hooks/useToggle";

import axios from "../../api/axios";

import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  // NEW
  const { setAuth } = useAuth();

  const [email, resetEmail, userAttribs] = useInput("email", "");
  const [password, setPassword] = useState("");
  const [check, toggleCheck] = useToggle("persist", false);
  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
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
      setAuth({ accessToken });

      resetEmail("");
      setPassword("");

      navigate(from, { replace: true }); //from = where the user WANTED to go
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      <div>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            {...userAttribs}
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
          onChange={toggleCheck}
          checked={check}
        />
        <label htmlFor="persist">Trust this device</label>
      </form>
    </>
  );
}
