import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import useRefreshToken from "../../hooks/useRefreshToken";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "../../api/axios";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken;

  const axiosPrivate = useAxiosPrivate();

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUsers = async () => {
  //     try {
  //       const response = await axiosPrivate.get("/users", {
  //         // signal: controller.signal,
  //       });
  //       console.log(response.data);
  //       isMounted && setUsers(response.data.users);
  //     } catch (err) {
  //       console.error(err);
  //       navigate("/login", { state: { from: location }, replace: true });
  //     }
  //   };

  //   getUsers();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  useEffect(() => {
    const getUsers = async () => {
      try {
        // const response = await axiosPrivate.get("/users", {
        const response = await axios.get("/users", {
          // signal: controller.signal,
        });
        console.log(response.data);
        // isMounted && setUsers(response.data);
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    fetch(`http://localhost:3000/users`)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData.users);
        setUsers(jsonData.users);
      });
  }, []);

  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>UserList</h1>
      <button onClick={() => refresh()}>refresh()</button>

      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </div>
      ))}
    </>
  );
}
