import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";

import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

import useAuthedUserId from "../../hooks/useAuthedUserId";

export default function Navbar() {
  const navigate = useNavigate();
  const logout = useLogout();

  // const { auth } = useAuth();
  // const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  // const userId = decoded?.UserInfo?.userId;

  const userId = useAuthedUserId();

  const signout = async () => {
    await logout();
    // navigate("/"); //isn't refreshing page
    window.location.reload();
  };

  return (
    <div className="nav-cont">
      <div className="nav-top">
        <h1>
          <Link to="/">MySpace</Link>
        </h1>
        <ul>
          {userId ? (
            <li>
              <button onClick={signout}>Logout</button>
            </li>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>|</li>
              <li>
                <Link to="/login">Log In</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="nav-bot">
        <ul>
          {userId && (
            <>
              <li>
                <Link to={`/friendrequests`}>Friend Invites</Link>
              </li>
              <li>
                <Link to={`/users/${userId}`}>View My page</Link>
              </li>
              <li>
                <Link to={`/users/${userId}`}>Edit My Page</Link>
              </li>
            </>
          )}

          <li>
            <Link to="/users">All Users</Link>
          </li>
          <li>
            <Link to="/users/2">User 2</Link>
          </li>
          <li>
            <Link to="/adminlounge">adminlounge</Link>
          </li>
          <li>
            <Link to="/modlounge">modlounge</Link>
          </li>
          <Link to="/userlounge">userlounge</Link>
          <li></li>
        </ul>
      </div>
    </div>
  );
}
