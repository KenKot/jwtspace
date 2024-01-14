import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((jsonData) => {
        setUser(jsonData);
      });
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>UserDetail Component</h2>
      <p>This is for user with id: {id}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>{" "}
    </div>
  );
}
