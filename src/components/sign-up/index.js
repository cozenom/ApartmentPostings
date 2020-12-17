import React, { useState } from "react";
import { signUpUser } from "../../api/user";
import sha256 from "crypto-js/sha256";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  const handleClick = () => {
    if (username === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    var payload = {
      username: username,
      password: password,
    };

    signUpUser(payload)
      .then((response) => {
        if (response.status === 200) {
          props.success(response.data);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePassword = (pass) => setPassword(sha256(pass).toString());

  return (
    <div className="container">
      <div onClick={props.changeMode} className="top-right-corner">
        Sign-in
      </div>
      <h1>Sign-up</h1>

      <div>
        <label htmlFor="name">Username: </label>
        <input
          id="username"
          alt="username"
          autoFocus
          name="username"
          placeholder="Enter your username"
          type="text"
          onChange={(event) => setUsername(event.target.value)}
        ></input>
      </div>

      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          alt="password"
          name="password"
          placeholder="Enter your Password"
          type="password"
          onChange={(event) => handlePassword(event.target.value)}
        ></input>
      </div>

      <button aria-label="Sign up to forum" onClick={handleClick}>
        Sign-up
      </button>

      <div className="error">{error ? error : ""}</div>
    </div>
  );
};

export default Register;
