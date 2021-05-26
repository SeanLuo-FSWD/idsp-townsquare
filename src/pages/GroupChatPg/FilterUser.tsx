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
      {/* <div>
        <img
          className="pointer"
          onClick={() => setOpenPortal(true)}
          src={person.avatar}
          height="50px"
          width="50px"
        />
      </div> */}
      <div style={{ display: "flex" }}>
        <p style={{ width: "90px" }}>
          <strong>Location:</strong>
        </p>
        <p>{person.location}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ width: "90px" }}>
          <strong>age:</strong>
        </p>
        <p>{person.age}</p>
      </div>
      <div style={{ display: "flex" }}>
        <p style={{ width: "90px" }}>
          <strong>gender:</strong>
        </p>
        <p>{person.gender}</p>
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
