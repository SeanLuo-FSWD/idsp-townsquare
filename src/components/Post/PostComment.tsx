import React, { useState } from "react";
import { TComment } from "../../interfaces/IPost";

const PostComment: React.FC<TComment> = (props) => {
  return (
    <>
      <div>
        <div className="flex--space-between">
          <h3>{props.username}</h3>
          <h4>{props.createdAt}</h4>
        </div>
        <h4 style={{ paddingLeft: "20px" }}>{props.message}</h4>
      </div>
    </>
  );
};

export default PostComment;
