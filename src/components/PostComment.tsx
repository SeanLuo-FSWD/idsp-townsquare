import React, { useState } from "react";
import { TComment } from "../interfaces/IPost";

const PostComment: React.FC<TComment> = (props) => {
  return (
    <div>
      <h4>{props.message}</h4>
    </div>
  );
};

export default PostComment;
