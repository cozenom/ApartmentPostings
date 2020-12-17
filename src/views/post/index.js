import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./post.css";
import { getPost, getComments } from "../../api/posts";
import Loader from "react-loader-spinner";
import { convertDate } from "../../service/helper";
import "./postgallery.css";
import ImageGallery from "react-image-gallery";
import { imageSize, getImageUrl } from "../../service/imageURLgenerator";
import ReactHtmlParser from "react-html-parser";
import CommentsList from "../../components/comments-list";
import NewComment from "../../components/comment-add";
import { currentUser } from "../../service/user.service";
// import likeButton from "../../components/like-button";

const Post = (props) => {
  const [id, setId] = useState();
  const [post, setPost] = useState(undefined);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [pics, setPics] = useState(null);
  const [like, setLike] = useState(false);
  const [comments, setComments] = useState([]);

  const initialLoad = () => {
    if (props.location && props.location.state && props.location.state.postId) {
      setId(props.location.state.postId);
    } else if (props.match && props.match.params && props.match.params.postId) {
      setId(props.match.params.postId);
    } else {
      setRedirectToHome(true);
    }
    fetchPost;
  };

  useEffect(initialLoad, [props.location, props.match]);

  const fetchPost = () => {
    if (id && !post) {
      getPost(id)
        .then((response) => {
          setPost(response.data);
          setDataAvailable(true);
        })
        .catch((err) => {
          // Show error message
          console.error("Failed to get all posts", err);
        });
    }
  };

  useEffect(fetchPost, [id, post]);

  const loadComments = () => {
    if (id && currentUser._id) {
      getComments(id, currentUser._id)
        .then((response) => {
          if (response.status === 200) {
            if (response.data) {
              setComments(response.data);
            }
          } else if (response.status === 202) {
            console.error("error", response.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(loadComments, [props.user, id]);

  // Insert comment
  const AddedComment = (newComment) => {
    console.log("Added comment, ", newComment);
    setComments([...comments, newComment]);
  };

  const getPics = () => {
    if (post && post.images) {
      setPics(
        post.images.map((id) => ({
          original: `${getImageUrl(id, imageSize.L)}`,
          thumbnail: `${getImageUrl(id, imageSize.S)}`,
        }))
      );
    } else {
      // setRedirectToHome(true);
    }
  };
  useEffect(getPics, [post]);

  const handleClick = () => {
    setLike(!like);
    console.log("Setlike", like);
  };

  return (
    <div className="post">
      <div className="container">
        {dataAvailable ? (
          <div className="post">
            <div className="content">
              <div className="title">{post.title}</div>
              <hr />
              <div className="gallery">
                <ImageGallery
                  items={pics}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  showIndex={false}
                  additionalClass="image-gallery"
                />
              </div>
              <hr />
              <div className="extra">
                <div className="date">
                  <b>Date Posted: </b>
                  {convertDate(post.date)}
                </div>
                <div className="price">
                  <b>Price: </b>${post.price}
                </div>
                <div className="bedrooms">
                  <b>BR: </b>
                  {post.bedrooms}
                </div>
                <div className="area">
                  <b>Area: </b>
                  {post.area} sqft
                </div>
                <div className="address">
                  <b>Address: </b>
                  {post.mapaddress}
                </div>
              </div>
              <div className="neighborhood">
                <b>Neighborhood: </b>
                {post.neighborhood.join(", ")}
              </div>
              <hr />
              <div className="body">{ReactHtmlParser(post.body)}</div>
            </div>
            <div>
              <hr />
              <h2>Notes: </h2>
              <div className="comments">
                {currentUser._id ? (
                  <React.Fragment>
                    <div className="list">
                      {comments && comments.length && comments.length > 0 ? (
                        <CommentsList comments={comments} />
                      ) : (
                        <div> No comments found for this post </div>
                      )}
                      <NewComment success={AddedComment} postId={post._id} />
                    </div>
                  </React.Fragment>
                ) : (
                  <div id={props.id} className="login">
                    Please sign-in/sign-up to make notes. <br />
                    <Link
                      to={{
                        pathname: "/login",
                        state: { from: props.location },
                      }}
                    >
                      <br /> To sign-in/up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <Loader
            type="TailSpin"
            color="#551A8B"
            height={100}
            width={100}
            className="loader"
          />
        )}
      </div>
    </div>
  );
};

export default Post;
