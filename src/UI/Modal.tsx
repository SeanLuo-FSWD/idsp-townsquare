import React, { useContext, useEffect } from "react";
import styles from "./Modal.module.scss";
import Overlay from "./Overlay";
import { LoginContext } from "../store/context/LoginContext";

function Modal(props: any) {
  // const { showModal, setShowModal } = useContext(LoginContext);

  useEffect(() => {
    document.body.classList.add("disable_scroll");
    return () => {
      document.body.classList.remove("disable_scroll");
    };
  }, []);

  return (
    <>
      <div className={`${styles.Modal}`}>{props.children}</div>;
      <Overlay />
    </>
  );
}

export default Modal;
