import React, { useState, useEffect, useContext } from "react";
import Overlay from "../../UI/Overlay";

import PortalModal from "../../UI/PortalModal";
import Person from "../person/Person";
function FilterUser({ person }: any) {
  const [openPortal, setOpenPortal] = useState(false);

  function togglePortalProp() {
    setOpenPortal(false);
  }
  return (
    <div>
      <div>
        <img
          onClick={() => setOpenPortal(true)}
          src={person.avatar}
          height="50px"
          width="50px"
        />
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "20px" }}>Location</span>
        <span>{person.location}</span>
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "20px" }}>age</span>
        <span>{person.age}</span>
      </div>
      <div style={{ display: "flex" }}>
        <span style={{ marginRight: "20px" }}>gender</span>
        <span>{person.gender}</span>
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
