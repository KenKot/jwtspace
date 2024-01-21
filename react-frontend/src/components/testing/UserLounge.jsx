import {useEffect, useState} from "react";
import axios from "../../api/axios";

export default function AdminLounge() {
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const getLoungeMessages = async () => {
      console.log("adminlounge.jsx fired");
      // setAuth({});
      try {
        const res = await axios.get("/test/userlounge", {
          withCredentials: true,
        });
        setMessages(JSON.stringify(res));
      } catch (err) {
        console.error(err);
      }
    };

    getLoungeMessages();
  }, []);

  return <div>userlounge: {messages}</div>;
}

// export default function UserLounge() {
//   return <div>UserLounge</div>;
// }
