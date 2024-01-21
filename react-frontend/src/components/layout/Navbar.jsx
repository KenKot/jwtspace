import {Link, useNavigate} from "react-router-dom";
import {useContext} from "react";

import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

export default function Navbar() {
  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const logout = async () => {
    console.log("logout from /navbar fired");
    setAuth({});
    try {
      await axios.get("/auth/logout", {withCredentials: true});
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>
        <Link to="/">MySpace</Link>
      </h1>
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <button onClick={logout}>Logout</button>
        </li>
        <li>
          <Link to="/users/1">User 1</Link>
        </li>
      </ul>
      <hr />
      <Link to="/adminlounge">adminlounge</Link>
      <br />
      <Link to="/modlounge">modlounge</Link>
      <br />

      <Link to="/userlounge">userlounge</Link>
      <br />
      <hr />
      <hr />
      <hr />
    </div>
  );
}
