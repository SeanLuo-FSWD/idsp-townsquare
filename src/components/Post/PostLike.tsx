import React, { useState, useEffect, useContext } from "react";
import { TLikes } from "../../interfaces/IPost";
import { getLikesByPostId } from "../../utils/api/posts.api";
import { LoginContext } from "../../store/context/LoginContext";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import _ from "lodash";
import styles from "./PostLike.module.scss";

const PostLike = ({ postId, likesCount, handleLikeProp, isLiked }: any) => {
  const [likes, setLikes] = useState([]);
  const [showLikes, setShowLikes] = useState(false);

  const {
    currentUser,
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    setCerror,
  } = useContext(LoginContext);

  useEffect(() => {
    getLikesByPostId(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setLikes(result.data);
      }
    });
  }, [likesCount]);

  function checkLiked() {
    let liked_arr = _.filter(
      likes,
      (o: any) => o.userId === currentUser.userId
    );

    if (liked_arr.length > 0) {
      return true;
    }

    return false;
  }

  return (
    <>
      <div className="flex">
        {checkLiked() ? (
          <ThumbUpIcon
            onClick={() => {
              handleLikeProp();
            }}
          />
        ) : (
          <ThumbUpAltOutlinedIcon
            onClick={() => {
              handleLikeProp();
            }}
          />
        )}
        <h4 onClick={() => setShowLikes(!showLikes)}>{likesCount}</h4>
        {showLikes && (
          <div>
            {likes.map((like: any) => {
              return <p key={like._id}>{like.username}</p>;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PostLike;
