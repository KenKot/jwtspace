import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>{user.username}</Link>
        </div>
      ))}
    </>
  );
}
