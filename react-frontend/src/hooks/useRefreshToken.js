// OLD
import axios from "../api/axios";
import useAuth from "./useAuth";

// NEW
import useAxiosPrivate from "./useAxiosPrivate";

import { jwtDecode } from "jwt-decode";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  // const axiosPrivate = useAxiosPrivate();

  const refresh = async () => {
    // const response = await axiosPrivate.get("/auth/refresh", {
    const response = await axios.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log("useRefreshToken.js hook fired ");
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);

      const accessToken = response?.data?.accessToken;
      const decoded = jwtDecode(accessToken);
      const { userId, roles } = decoded.UserInfo;

      return {
        ...prev,
        // accessToken: response.data.accessToken,
        userId,
        roles,
        // email,
      };
    });

    return response.data.accessToken;
  };
  return refresh;
}
