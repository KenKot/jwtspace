import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      console.log("UserList.jsx getUsers() fired");
      try {
        const response = await axiosPrivate.get("/users", {
          // const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data.users);
      } catch (err) {
        console.error("Catch fired: ", err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // fetch(`http://localhost:3000/users`)
  //   .then((res) => res.json())
  //   .then((jsonData) => {
  //     console.log(jsonData.users);
  //     setUsers(jsonData.users);
  //   });
  // }, []);

  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>UserList</h1>

      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </div>
      ))}
    </>
  );
}
