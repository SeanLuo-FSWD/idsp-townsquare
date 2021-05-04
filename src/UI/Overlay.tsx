import React, { useContext, useEffect } from "react";
import styles from "./Overlay.module.scss";
import { LoginContext } from "../store/context/LoginContext";

function Overlay() {
  const { showModal, setShowModal, setModalProps } = useContext(LoginContext);
  return (
    <div
      className={styles.overlay}
      onClick={() => {
        setModalProps(null);
        setShowModal("");
      }}
    ></div>
  );
}

export default Overlay;
