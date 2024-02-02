import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

export default function RemoveFriend({ authedUserId, id, getStatus }) {
  const axiosPrivate = useAxiosPrivate();

  const removeFriend = async () => {
    try {
      const response = await axiosPrivate.get(`/friendships/${id}/remove`, {
        // signal: controller.signal,
      });

      if (response.status === 200) {
        getStatus();
        console.log("!!", response.data);
        console.log("!!");
      }
    } catch (err) {
      console.error(err);
    }
  };
  return <button onClick={removeFriend}>Remove Friend</button>;
}
