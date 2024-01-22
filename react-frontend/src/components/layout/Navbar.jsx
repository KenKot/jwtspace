import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useLogout();

  const signout = async () => {
    await logout();
    // navigate("/"); //isn't refreshing page
    window.location.reload();
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
          <button onClick={signout}>Logout</button>
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
