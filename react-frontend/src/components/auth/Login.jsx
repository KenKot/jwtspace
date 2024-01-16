import React, { useState } from "react";
import { useUserContext } from "../../contexts/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState(""); // State to hold error message
  const [successMsg, setSuccessMsg] = useState(""); // State to hold success message
  const { login } = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrMsg(""); // Reset error message
    setSuccessMsg(""); // Reset success message

    try {
      await login({ email, password });
      setSuccessMsg("Login successful!"); // Set success message
      // Redirect or perform additional actions on successful login
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message || "An error occurred");
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {/* Display error message */}
      {errMsg && <div style={{ color: 'red' }}>{errMsg}</div>}
      {/* Display success message */}
      {successMsg && <div style={{ color: 'green' }}>{successMsg}</div>}

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
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}
