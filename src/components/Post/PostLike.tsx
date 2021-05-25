import React, { useState, useEffect, useContext } from "react";
import { TLikes } from "../../interfaces/IPost";
import { getLikesByPostId } from "../../utils/api/posts.api";
import { LoginContext } from "../../store/context/LoginContext";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import _ from "lodash";
import styles from "./PostLike.module.scss";

const PostLike = ({ postId, likesCount, handleLikeProp, likesArr }: any) => {
  const [likes, setLikes] = useState(likesArr);

  const [showLikes, setShowLikes] = useState(false);

  const {
    currentUser,
    showModal,
    setShowModal,
    modalProps,
    setModalProps,
    setCerror,
  } = useContext(LoginContext);

  // useEffect(() => {
  //   getLikesByPostId(postId, (err: Error, result: any) => {
  //     if (err) {
  //       setCerror(err.message);
  //     } else {
  //       setLikes(result.data);
  //     }
  //   });
  // }, [likesCount]);

  console.log("PostLike :--------------: likes");
  console.log(likesArr);

  function checkLiked() {
    console.log(likesArr);

    let liked_arr = _.filter(
      likesArr,
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
        <div
          className={styles.showLikesButton}
          onClick={() => setShowLikes(!showLikes)}
        >
          {likesArr.length}
        </div>
        {showLikes && (
          <div className={styles.likedByContainer}>
            <div className={styles.likedBy}>Liked by:</div>

            {likesArr.map((like: any) => {
              console.log("bob bob bob<<<");
              console.log(like);

              return (
                <div className={styles.likesNames} key={like._id}>
                  {like.username}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default PostLike;
