import React, { useState, useContext, useEffect } from "react";
import PostComment from "./PostComment";
import {
  createComment,
  getAllCommentsByPostId,
} from "../../utils/api/posts.api";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";

function PostCommentList({ postId, commentSubmitProp, commentsCount }: any) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]) as any;
  const { setCerror } = useContext(LoginContext);

  useEffect(() => {
    // setTimeout(() => {
    getAllCommentsByPostId(postId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        console.log("ggggggggggggggggggggggg");
        console.log(result.data.comments);

        setCommentList(result.data.comments);
      }
    });
    // }, 2000);
  }, []);

  function onCommentSubmit(e: any) {
    e.preventDefault();
    commentSubmitProp(comment, (result: any) => {
      console.log("callback worked==============================");
      console.log(commentList);
      console.log("result");
      console.log(result);
      setComment("");

      setCommentList(_.concat(result, commentList));
    });
  }

  console.log("lengthhhhhhhhhhh");
  console.log(commentList.length);
  console.log(commentList);

  return (
    <div>
      <form onSubmit={onCommentSubmit}>
        <input
          type="text"
          id="comment"
          name="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add Comment</button>
      </form>
      {/* <h4>{commentsCount}</h4> */}
      {commentList.length > 0 && (
        <div>
          {commentList.map((c: any) => {
            console.log("fffffffffffffffffffffff");
            console.log("fffffffffffffffffffffff");
            console.log(c._id);

            return <PostComment key={c._id} {...c} />;
          })}
        </div>
      )}
    </div>
  );
}

export default PostCommentList;
