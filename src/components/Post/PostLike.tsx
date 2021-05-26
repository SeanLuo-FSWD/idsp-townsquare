import React, { useState, useEffect, useContext } from "react";
import { TLikes } from "../../interfaces/IPost";
import { getLikesByPostId } from "../../utils/api/posts.api";
import { LoginContext } from "../../store/context/LoginContext";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import _ from "lodash";
import styles from "./PostLike.module.scss";
import { Link, useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const PostLike = ({
  showLikes,
  setShowLikes,
  handleLikeProp,
  likesArr,
}: any) => {
  const history = useHistory();
  const { currentUser } = useContext(LoginContext);
  function checkLiked() {
    let liked_arr = _.filter(
      likesArr,
      (o: any) => o.userId === currentUser.userId
    );

    if (liked_arr.length > 0) {
      return true;
    }

    return false;
  }

  // function redirect_profile(link: string) {
  //   const linkTarget = {
  //     pathname: link,
  //     key: uuidv4(),
  //   };

  //   history.push(linkTarget);
  // }

  return (
    <>
      <div className={"flex"}>
        {checkLiked() ? (
          <ThumbUpIcon
            className={`pointer ${styles.liked}`}
            onClick={() => {
              handleLikeProp();
            }}
          />
        ) : (
          <ThumbUpAltOutlinedIcon
            className={`pointer ${styles.unliked}`}
            onClick={() => {
              handleLikeProp();
            }}
          />
        )}
        <div
          className={`pointer ${styles.showLikesButton}`}
          onClick={() => setShowLikes(!showLikes)}
        >
          {likesArr.length}
        </div>
        {showLikes && (
          <div className={styles.likedByContainer}>
            <div className={styles.likedBy}>Liked by:</div>

            {likesArr.map((like: any) => {
              return (
                <div
                  className={`pointer ${styles.likesNames}`}
                  key={like._id}
                  onClick={() => {
                    // redirect_profile(`/person/${like.userId}`);
                    history.push(`/person/${like.userId}`);
                  }}
                >
                  {/* <Link to={`/person/${like.userId}`}>{like.username}</Link>, */}
                  {like.username},
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
