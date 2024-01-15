import React, {useState} from "react";
import {useUserContext} from "../../contexts/UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useUserContext();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const {accessToken} = await login({email, password})
      const response = await login({email, password});

      setEmail("");
      setPassword("");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

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
    </form>
  );
}
