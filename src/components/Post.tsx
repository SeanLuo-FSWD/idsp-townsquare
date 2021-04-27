import React from "react";
import IPost from "../interfaces/IPost";

const Post = (props: IPost) => {
  return (
    <div>
      <h2>{props.userName}</h2>
      <h3>{props.message}</h3>
    </div>
  );
};

export default Post;
