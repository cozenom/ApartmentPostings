import React, { useState, useEffect } from "react";
import { addComment } from "../../api/posts";
import { currentUser } from "../../service/user.service";
import { Link, withRouter } from "react-router-dom";
import "./comment-add.css";

const NewComment = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [postId, setPostId] = useState(undefined);

  const initialSetup = () => {
    setPostId(props.postId);
  };

  useEffect(initialSetup, [currentUser]);

  const handleClick = () => {
    if (message && message.length > 0) {
      var payload = {
        userId: currentUser._id,
        username: currentUser.username,
        postId: postId,
        message: message,
      };
      console.log("payload", payload);
      addComment(payload)
        .then((response) => {
          if (response.status === 200) {
            // link to thread page
            const data = response.data;
            // convert to post object
            const post = {
              userId: data._id,
              message: data.message,
              created: data.created,
              user: [
                {
                  name: currentUser.name,
                  id: currentUser.id,
                },
              ],
            };
            props.success(post);

            setMessage("");
            setError("");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setError("Error: empty note");
      return;
    }
  };

  return (
    <div id={props.id} className="new-comment">
      <h2>Add note:</h2>
      <textarea
        id="comment"
        alt="comment"
        name="comment"
        aria-label="New comment"
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>
      <br />
      <button aria-label="Add comment to thread" onClick={handleClick}>
        Submit
      </button>
      <div className="error">{error ? error : ""}</div>
    </div>
  );
};

export default withRouter(NewComment);
