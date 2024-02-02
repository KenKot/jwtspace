import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import useAuthedUserId from "../../hooks/useAuthedUserId";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function FriendRequests() {
  const [friendRequests, setFriendRequests] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  //   const authedUserId = useAuthedUserId();

  useEffect(() => {
    let isMounted = true;

    const controller = new AbortController();
    const getRequests = async () => {
      try {
        const response = await axiosPrivate.get(`/friendships/requests`, {
          signal: controller.signal,
        });

        if (response.status === 200) {
          console.log(response.data);
          setFriendRequests(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getRequests();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {friendRequests.length ? (
        <ul>
          {friendRequests.map((fr) => (
            <li key={fr.id}>
              <p Link></p>
              <Link to={`/users/${fr.requestorId}`}>
                {fr.requestor.username}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friend requests</p>
      )}
    </>
  );
}
