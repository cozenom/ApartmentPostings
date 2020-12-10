import React, { useState, useEffect } from "react";
import { addPost } from "../../api/thread";
import { currentUser } from "../../service/user.service";
import { Link, withRouter } from "react-router-dom";

import "./new-post.css";

const NewPost = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [threadId, setThreadId] = useState(undefined);
  const [location, setLocation] = useState(undefined);
  const [needToLogin, setNeedToLogin] = useState(false);

  const initialSetup = () => {
    setThreadId(props.threadId);
    if (!currentUser.id) {
      setNeedToLogin(true);
    }
  };

  useEffect(initialSetup, []);

  const handleClick = () => {
    var payload = {
      threadId: threadId,
      message: message,
      location: JSON.stringify(location),
    };

    addPost(payload)
      .then((response) => {
        if (response.status === 200) {
          // link to thread page
          const data = response.data;
          // convert to post object
          const post = {
            active: data.active,
            content: data.content,
            created: data.created,
            user: [
              {
                name: currentUser.name,
                id: currentUser.id,
              },
            ],
          };
          props.success(post);

          // clear data
          setMessage("");
          setLocation(undefined);
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const askLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  if (needToLogin) {
    return (
      <div id={props.id} className="new-post">
        Please sign-in/sign-up to add a post.
        <Link
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        >
          <p className="button">Go to sign-in/sign-up</p>
        </Link>
      </div>
    );
  } else {
    return (
      <div id={props.id} className="new-post">
        <h2>Add post:</h2>
        <textarea
          id="message"
          alt="message"
          name="message"
          aria-label="New post message"
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
        <div className="location">
          <label htmlFor="location">Share location: </label>
          <input
            aria-label="Enable share location"
            onChange={askLocation}
            type="checkbox"
          ></input>
        </div>
        <button aria-label="Add post to thread" onClick={handleClick}>
          Submit
        </button>
        <div>{error ? error : ""}</div>
      </div>
    );
  }
};

export default withRouter(NewPost);
