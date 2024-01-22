import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function AdminLounge() {
  const [messages, setMessages] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/test/adminlounge", {
          // const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data.message);
        isMounted && setMessages(response.data.message);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return <div>userlounge: {messages}</div>;
}

// export default function UserLounge() {
//   return <div>UserLounge</div>;
// }
