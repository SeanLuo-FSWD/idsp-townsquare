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
      <div className={"flex"}>
        {checkLiked() ? (
          <ThumbUpIcon
              className={styles.liked}
              onClick={() => {
              handleLikeProp();
            }}
          />
        ) : (
          <ThumbUpAltOutlinedIcon
            className={styles.unliked}
            onClick={() => {
              handleLikeProp();
            }}
          />
        )}
        <div  className={styles.showLikesButton} onClick={() => setShowLikes(!showLikes)}>{likesCount}</div>
        {showLikes && (
          <div>
            {likes.map((like: any) => {
              return <div className={styles.likesNames} key={like._id}>{like.username}</div>;
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PostLike;
