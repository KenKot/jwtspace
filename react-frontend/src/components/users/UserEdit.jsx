import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export default function UserEdit() {
  const { auth } = useAuth();
  const location = useLocation();

  const decoded = auth?.accessToken ? jwtDecode(auth.accessToken) : undefined;
  const userId = decoded?.UserInfo?.userId;

  return (
    <>
      <p>UserEdit.jsx - userId inside here is {userId}</p>
    </>
  );
}
