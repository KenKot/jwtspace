import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

export default function Navbar() {
  const { logout } = useUserContext();

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
    </div>
  );
}
