import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../UI/Overlay";
import styles from "./FilterUser.module.scss";
import PortalModal from "../../UI/PortalModal";
import Person from "../person/Person";
function FilterUser({ person }: any) {
  const [openPortal, setOpenPortal] = useState(false);

  function togglePortalProp() {
    setOpenPortal(false);
  }
  return (
    <div className={styles.infoWrapper}>
      <div className={styles.infoRow}>
          <strong>Location:</strong>    
      </div>
      <div className={styles.infoContent}>
        {person.location}
      </div>
      <div className={styles.infoRow}>
          <strong>age:</strong>
      </div>
      <div className={styles.infoContent}>
        <p>{person.age}</p>
      </div>
      <div className={styles.infoRow}>
        <strong>gender:</strong>
      </div>
      <div className={styles.infoContent}>
        {person.gender}
      </div>

      <PortalModal
        // message="Hello World!"
        isOpen={openPortal}
        onClose={() => setOpenPortal(false)}
      >
        <Person personId={person._id} />
      </PortalModal>

      {openPortal && <Overlay togglePortalProp={togglePortalProp} />}
    </div>
  );
}

export default FilterUser;
