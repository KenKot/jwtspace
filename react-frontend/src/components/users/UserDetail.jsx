import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../api/axios";

import FriendshipButtons from "../friends/FriendshipButtons";

import useAuthedUserId from "../../hooks/useAuthedUserId";

export default function UserDetail() {
  let { id } = useParams(); //will be a string
  id = parseInt(id);

  const [user, setUser] = useState(null);

  const authedUserId = useAuthedUserId(); //will be a string

  useEffect(() => {
    const getUserProfile = async () => {
      // const response = await axios.get(`http://localhost:3000/users/${id}`);
      const response = await axios.get(`/users/${id}`);
      setUser(response.data.userProfile);
    };
    getUserProfile();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }
  //       "about": "About user 1!",
  //       "desiredMeets": "Desired meets for user 1",
  //       "mood": "Mood of user 1",
  //       "quote": "Favorite quote of user 1"
  return (
    <div>
      <h2>{user.username}</h2>
      <img
        src="/default_profile_pic.png"
        alt="default avatar"
        style={{ width: "200px", height: "200px" }}
      />

      <FriendshipButtons authedUserId={authedUserId} id={id} />

      <p>
        ID:{id} and authedUserId:{authedUserId}
        <br />
        {typeof id} and {typeof authedUserId}
      </p>
      <h3>
        Friends: <Link to={`/users/${id}/friends`}>(click to view all)</Link>
      </h3>
      <hr />
      <p>About: {user.Profile.about}</p>
      <p>Who I'd Like to meet: {user.Profile.about}</p>
      <p>Mood: {user.Profile.about}</p>
      <p>Favorite Quote: {user.Profile.about}</p>
      <table>
        <th>{`${user.username}'s`} Interests</th>
        <tr>
          <td>General</td>
          <td>{user.Profile.generalInterests}</td>
        </tr>
        <tr>
          <td>Music</td>
          <td>{user.Profile.musicInterests}</td>
        </tr>
        <tr>
          <td>Movies</td>
          <td>{user.Profile.movieInterests}</td>
        </tr>
        <tr>
          <td>Television</td>
          <td>{user.Profile.televisionInterests}</td>
        </tr>
        <tr>
          <td>Books</td>
          <td>{user.Profile.bookInterests}</td>
        </tr>
        <tr>
          <td>Heroes</td>
          <td>{user.Profile.heroesInterests}</td>
        </tr>
      </table>
      <table>
        <th>{`${user.username}'s`} Links</th>
        <tr>
          <td>Instagram</td>
          <td>{user.Profile.instagramLink}</td>
        </tr>
        <tr>
          <td>Twitter</td>
          <td>{user.Profile.twitterLink}</td>
        </tr>
        <tr>
          <td>Twitch</td>
          <td>{user.Profile.twitchLink}</td>
        </tr>
        <tr>
          <td>Github</td>
          <td>{user.Profile.githubLink}</td>
        </tr>
        <tr>
          <td>Mastodon</td>
          <td>{user.Profile.mastodonLink}</td>
        </tr>
        <tr>
          <td>Website</td>
          <td>{user.Profile.websiteLink}</td>
        </tr>
      </table>
    </div>
  );
}

// {
//   "userProfile": {
//     "username": "userbob1",
//     "firstName": "bob1",
//     "lastName": "smith1",
//     "birthday": "2004-01-16T00:00:00.000Z",
//     "Profile": {
//       "id": 1,
//       "about": "About user 1!",
//       "desiredMeets": "Desired meets for user 1",
//       "mood": "Mood of user 1",
//       "quote": "Favorite quote of user 1",
//       "generalInterests": "General interests of user 1",
//       "musicInterests": "Music interests of user 1",
//       "movieInterests": "Movie interests of user 1",
//       "televisionInterests": "Television interests of user 1",
//       "bookInterests": "Book interests of user 1",
//       "heroesInterests": "Heroes interests of user 1",
//       "instagramLink": "https://instagram.com/user1",
//       "twitterLink": "https://twitter.com/user1",
//       "twitchLink": "https://twitch.tv/user1",
//       "githubLink": "https://github.com/user1",
//       "mastodonLink": "https://mastodon.social/@user1",
//       "websiteLink": "https://user1.com",
//       "userId": 1,
//       "createdAt": "2024-01-17T03:45:33.303Z",
//       "updatedAt": "2024-01-17T03:45:33.303Z"
//     }
//   }
// }
