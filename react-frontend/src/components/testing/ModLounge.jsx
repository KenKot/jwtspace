import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function ModLounge() {
  const [messages, setMessages] = useState("");

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/test/modlounge", {
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

  return <div>mod longue: {messages}</div>;
}

// export default function UserLounge() {
//   return <div>UserLounge</div>;
// }
