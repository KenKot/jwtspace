import { Link } from "react-router-dom";

export default function Navbar() {
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
          <Link to="/users/1">User 1</Link>
        </li>
      </ul>
      <hr />
    </div>
  );
}
