// import {useEffect, useState} from "react";
// import axios from "../../api/axios";

// export default function AdminLounge() {
//   const [messages, setMessages] = useState("");

//   useEffect(() => {
//     const getLoungeMessages = async () => {
//       console.log("adminlounge.jsx fired");
//       // setAuth({});
//       try {
//         const res = await axios.get("/test/adminlounge", {
//           withCredentials: true,
//         });
//         setMessages(JSON.stringify(res));
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     getLoungeMessages();
//   }, []);

//   return <div>{messages}</div>;
// }

export default function AdminLounge() {
  return <div>admin lounge</div>;
}
