import React from "react";
import styles from "./Error.module.scss";

const Error = (props: any) => {
  return (
    <div>
      <h2 className={styles.error}>{props.message}</h2>
    </div>
  );
};

export default Error;
