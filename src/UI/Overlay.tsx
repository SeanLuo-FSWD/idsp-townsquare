import React, { useContext, useEffect } from "react";
import styles from "./Overlay.module.scss";
import { LoginContext } from "../store/context/LoginContext";

function Overlay({ togglePortalProp, transparent }: any) {
  const { setShowModal, setModalProps } = useContext(LoginContext);
  return (
    <div
      // className={styles.overlay}
      className={`${styles.overlay} ${transparent && styles.transparent}`}
      onClick={() => {
        setModalProps(null);
        setShowModal("");
        if (togglePortalProp) {
          togglePortalProp();
        }
      }}
    ></div>
  );
}

export default Overlay;
