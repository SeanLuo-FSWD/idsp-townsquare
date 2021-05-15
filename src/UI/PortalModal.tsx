import React, { useState, useEffect, useContext } from "react";
import Overlay from "./Overlay";
import styles from "./PortalModal.module.scss";

import { createPortal } from "react-dom";

// function PortalModal({ children }: any) {
//   const portalRoot: any = document.getElementById("modal_portal");
//   const el = document.createElement("div");

//   useEffect(() => {
//     portalRoot.appendChild(el);

//     return () => portalRoot.removeChild(el);
//   }, []);

//   return createPortal(children, el);
// }

const PortalModal = ({ message, isOpen, onClose, children }: any) => {
  const portalRoot: any = document.getElementById("modal_portal");
  if (!isOpen) return null;

  return createPortal(
    <>
      <div className={styles.portalModal}>
        <span>{message}</span>
        <button onClick={onClose}>Close</button>
      </div>
      <Overlay />
    </>,

    portalRoot
  );
};

export default PortalModal;
