import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [birthday, setBirthday] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUserParams = {
      firstName,
      lastName,
      username,
      email,
      password1,
      password2,
      birthday,
    };

    console.log("fffffff");
    console.log("newUserParams: ", newUserParams);
    console.log("fffffff");

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserParams),
      });

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.error || "Server responded with an error");
      }

      const responseData = await response.json();
      const { userId } = responseData;
      navigate(`/users/${userId}`);
    } catch (error) {
      alert(`Failed to create user: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="fname">First Name</label>
      <input
        type="text"
        id="fname"
        name="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <br />

      <label htmlFor="lname">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <br />

      <label htmlFor="uname">Username</label>
      <input
        type="text"
        id="uname"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <br />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />

      <label htmlFor="password1">Password</label>
      <input
        type="password"
        id="password1"
        name="password1"
        value={password1}
        onChange={(e) => setPassword1(e.target.value)}
        required
      />
      <br />

      <label htmlFor="password2">Confirm Password</label>
      <input
        type="password"
        id="password2"
        name="password2"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
      />
      <br />

      <label htmlFor="dob">Date of Birth</label>
      <input
        type="date"
        id="dob"
        name="birthday"
        value={birthday}
        onChange={(e) => setBirthday(e.target.value)}
        required
      />
      <br />

      <button type="submit">Register User!</button>
    </form>
  );
}
