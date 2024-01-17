// OLD
// import axios from "../api/axios";

// NEW
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const refresh = async () => {
    const response = await axiosPrivate.get("/auth/refresh", {
      withCredentials: true,
    });

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });

    return response.data.accessToken;
  };
  return refresh;
}
