import React from "react";
import styles from "./SubNav.module.scss";

function SubNav(props: any) {
  return <div className={styles.subNav}>{props.children}</div>;
}

export default SubNav;
