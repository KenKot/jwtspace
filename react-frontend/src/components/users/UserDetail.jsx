import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

export default function UserDetail() {
  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUserProfile = async () => {
      // const response = await axios.get(`http://localhost:3000/users/${id}`);
      const response = await axios.get(`/users/${id}`);
      setUser(response.data);
    };
    getUserProfile();
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
