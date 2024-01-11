import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      Navbar
      <ul>
        <Link to="/register">Register</Link>
        <Link to="/login">Log In</Link>
        <Link to="/users/1">User 1</Link>
      </ul>
      <hr />
    </div>
  );
}
