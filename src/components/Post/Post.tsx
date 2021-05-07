import React, { useState, useContext, useEffect } from "react";
import { TComment } from "../../interfaces/IPost";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import PostLike from "./PostLike";
import PostComment from "./PostComment";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { doPostComment, doLikePost } from "../../store/redux/actions/feed_act";
import styles from "./Post.module.scss";
import user from "./user.svg"
import comments from "./comments.svg"
import ImageSlider from "../../UI/ImageSlider";
import {
  fetchFeed,
  addComment,
  likePost,
  postCreate,
} from "../../utils/api/posts.api";

import { IPost, TLikes } from "../../interfaces/IPost";

const Post = (props: any) => {
  const { setCerror, currentUser } = useContext(LoginContext);
  const [likes, setLikes] = useState([]) as any;

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]) as any;

  const [commentsVisible, setCommentsVisible] = useState(false);

  useEffect(() => {
    setLikes(props.post.likes);
    setCommentList(props.post.commentList.reverse());
  }, []);

  const commentSubmit = (e: any) => {
    e.preventDefault();

    const comment_obj: any = {
      userId: currentUser.id,
      username: currentUser.username,
      createdAt: new Date().toDateString(),
      message: comment,
      id: uuidv4(),
      postId: props.post.id,
    };

    addComment(comment_obj, (err: Error, result: IPost[]) => {
      if (err) {
        setCerror(err.message);
      } else {
        // setCommentList([...commentList, result]);
        setCommentList(_.concat(result, commentList));

        setComment("");
      }
    });

    // props.post.onPostComment(comment_obj);
  };

  const handleLike = (toLike: boolean) => {
    const like_obj = {
      id: uuidv4(),
      userId: currentUser.id,
      username: currentUser.username,
      postId: props.post.id,
    };

    const new_likes = toLike
      ? [...likes, like_obj]
      : _.filter(likes, (o) => o.userId != currentUser.id);

    likePost(new_likes, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        // const new_likes = toLike
        //   ? _.filter(likes, (o) => o.userId == userId)
        //   : [...likes, result];

        setLikes(new_likes);
      }
    });

    // props.post.onLikeComment(like_obj);
  };

  function checkLiked(): boolean {
    // return TRUE if liked
    const liked =
      _.filter(likes, (o) => o.userId == currentUser.id).length != 0;
    console.log("always return false for first run?");

    console.log(liked);

    return liked;
  }

  return (
    <div className={styles.postContainer}>
      <div key={props.post.postId} className={styles.post}>
            <div className="flex--space-left">
              <img className="flex-item" src={user}></img>
              <h4 className={styles.flexItem}>{props.post.username}</h4>
              <h4 className="flex--space-right">{props.post.createdAt}</h4>
            </div>


            <div className={styles.textContainer}>
              <h2>{props.title}</h2>
              <h5 >{props.post.message}</h5>
            </div>
            

            <ImageSlider slides={props.post.img_urls} />

            <div className={styles.textContainer}>

            <div className="flex--space-between">
              <div className="flex">
                {checkLiked() ? (
                  <ThumbUpIcon
                    onClick={() => {
                      handleLike(false);
                    }}
                  />
                ) : (
                  <ThumbUpAltOutlinedIcon
                    onClick={() => {
                      handleLike(true);
                    }}
                  />
                )}
                <PostLike like_arr={likes} />
              </div>

              <img src={comments} onClick={() => setCommentsVisible(!commentsVisible)}/>

            </div>

            {commentsVisible && (
              <div>
                <form onSubmit={commentSubmit}>
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button type="submit">add Comment</button>
                </form>
                <div>
                  {commentList.map((c: TComment) => {
                    return <PostComment key={c.id} {...c} />;
                  })}
                </div>
              </div>
            )}

          </div>

            


          </div>
    </div>
    
  );
};

// const mapDispatchToProps = (dispatch: any) => {
//   return {
//     onPostComment: (comment_obj: TComment) =>
//       dispatch(doPostComment(comment_obj)),
//     onLikeComment: (like_obj: any) => dispatch(doLikePost(like_obj)),
//   };
// };

// export default Post;
// export default connect(null, mapDispatchToProps)(Post);

export default Post;
