import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { jwtDecode } from "jwt-decode";

const useAuthedUserId = () => {
  const [userId, setUserId] = useState(null);
  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.accessToken) {
      const decoded = jwtDecode(auth.accessToken);
      const userId = decoded?.UserInfo?.userId;
      setUserId(userId);
    }
  }, [auth]);

  return userId;
};

export default useAuthedUserId;
