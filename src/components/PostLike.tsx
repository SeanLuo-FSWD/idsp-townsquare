import React, { useState, useContext } from "react";
import { TLikes } from "../interfaces/IPost";
import { connect } from "react-redux";
import { getLike } from "../store/redux/selector/Feed";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { doLikePost } from "../store/redux/actions/feed_action";
import _ from "lodash";
import { LoginContext } from "../store/context/LoginContext";

const PostLike = (props: any) => {
  const { username, userId } = useContext(LoginContext);
  const [show, setShow] = useState(false);
  function likeList() {
    console.log("like like like");
    console.log(props.like_arr);

    return props.like_arr.map((like: TLikes) => {
      console.log("-----");
      console.log(like);
      return <li key={like.userId}>{like.username}</li>;
    });
    // return <li key={props.like_arr[0].userId}>{props.like_arr[0].username}</li>;
  }

  const handleLike = (liked: boolean) => {
    props.onLikePost(userId, username, props.postId, liked);
  };

  function checkLiked(): boolean {
    return (
      _.filter(props.like_arr.likes, (o) => o.userId == userId).length != 0
    );
  }

  return (
    <div>
      {checkLiked() ? (
        <ThumbUpIcon
          onClick={() => {
            handleLike(true);
          }}
        />
      ) : (
        <ThumbUpAltOutlinedIcon
          onClick={() => {
            handleLike(false);
          }}
        />
      )}
      {/* {show && (
        <ul>
          {props.like_arr.map((like: TLikes) => {
            console.log("-----");

            console.log(like);

            return <li key={like.userId}>{like.username}</li>;
          })}
        </ul>
      )} */}
      <ul>{likeList()}</ul>
      <h4
        onClick={() => {
          console.log("props.like_arr props.like_arr");

          console.log(props.like_arr);

          setShow(!show);
        }}
      >
        {props.like_arr.length}
      </h4>
    </div>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    like_arr: getLike(state.feedState, ownProps.postId),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLikePost: (
      userId: string,
      username: string,
      postId: string,
      liked: boolean
    ) => dispatch(doLikePost(userId, username, postId, liked)),
  };
};
// export default PostLike;
export default connect(mapStateToProps, mapDispatchToProps)(PostLike);
