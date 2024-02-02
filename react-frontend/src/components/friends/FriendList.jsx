import { useState, useEffect } from "react";
import axios from "../../api/axios";

import { useParams, Link } from "react-router-dom";

export default function FriendList() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const response = await axios.get(`/users/${id}/friends`);
      setFriends(response.data.friends);
      setIsLoading(false);
    };

    getFriends();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <h2>FriendList</h2>
      {friends.length ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <Link to={`/users/${friend.id}`}>{friend.username}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Friends</p>
      )}
    </>
  );
}
