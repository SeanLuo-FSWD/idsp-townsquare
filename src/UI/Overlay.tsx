import React, { useContext, useEffect } from "react";
import styles from "./Overlay.module.scss";
import { LoginContext } from "../store/context/LoginContext";

function Overlay({ togglePortalProp }: any) {
  const { showModal, setShowModal, setModalProps } = useContext(LoginContext);
  return (
    <div
      className={styles.overlay}
      onClick={() => {
        setModalProps(null);
        setShowModal("");
        togglePortalProp();
      }}
    ></div>
  );
}

export default Overlay;
