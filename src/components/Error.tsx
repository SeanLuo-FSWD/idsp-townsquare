import React from "react";
import "./Error.scss";

const Error = (props: any) => {
  return (
    <div>
      <h2 className="error">{props.message}</h2>
    </div>
  );
};

export default Error;
