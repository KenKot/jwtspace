import { useState, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import AddFriend from "./buttons/AddFriend";
import CancelRequest from "./buttons/CancelRequest";
import DenyFriend from "./buttons/DenyFriend";
import RemoveFriend from "./buttons/RemoveFriend";
import AcceptFriend from "./buttons/AcceptFriend";

export default function AddFriendButton({ authedUserId, id }) {
  const axiosPrivate = useAxiosPrivate();

  const [friendStatus, setFriendStatus] = useState("");
  const [requestorId, setRequestorId] = useState(""); // make null?
  const [requesteeId, setRequesteeId] = useState("");

  const controller = new AbortController();

  const getStatus = async () => {
    try {
      const response = await axiosPrivate.get(`/friendships/${id}`, {
        signal: controller.signal,
      });

      if (response.status === 200) {
        console.log(response.data);
        setFriendStatus(response?.data?.status);
        setRequestorId(response.data.requestorId);
        setRequesteeId(response.data.requesteeId);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let isMounted = true;

    // const controller = new AbortController();
    // const getStatus = async () => {
    //   try {
    //     const response = await axiosPrivate.get(`/friendships/${id}`, {
    //       signal: controller.signal,
    //     });

    //     if (response.status === 200) {
    //       console.log(response.data);
    //       setFriendStatus(response?.data?.status);
    //       setRequestorId(response.data.requestorId);
    //       setRequesteeId(response.data.requesteeId);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    if (authedUserId && authedUserId !== id) {
      getStatus();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  if (
    !authedUserId || //you're not logged in
    authedUserId === id || //you're viewing your own page
    (friendStatus === "rejected" && requestorId === authedUserId) //your friend request was rejected
  ) {
    return <></>;
  }

  if (friendStatus === "accepted") {
    return (
      <RemoveFriend authedUserId={authedUserId} id={id} getStatus={getStatus} />
    );
  }

  if (friendStatus === "pending" && authedUserId === requesteeId) {
    return (
      <>
        <AcceptFriend />
        <CancelRequest />;
        {/* <div>
          <button>Reject Request</button>
        </div> */}
      </>
    );
  }

  if (friendStatus === "pending" && authedUserId === requestorId) {
    return <CancelRequest />;
  }

  return <AddFriend />;
}
