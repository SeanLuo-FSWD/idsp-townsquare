import React, { useState } from "react";
import { TComment } from "../../interfaces/IPost";

const PostComment: React.FC<any> = (props) => {
  return (
    <>
      <div>
        <div className="flex--space-between">
          <img src={props.avatar} style={{ width: "50px", height: "50px" }} />
          <h3>{props.username}</h3>
          <h4>{props.createdAt}</h4>
        </div>
        <h4 style={{ paddingLeft: "20px" }}>{props.text}</h4>
      </div>
    </>
  );
};

export default PostComment;
