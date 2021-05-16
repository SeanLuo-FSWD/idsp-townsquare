import React from "react";

function FilterUserDetail({ people }: any) {
  return (
    <div style={{ marginTop: "50px" }}>
      {people.map((person: any) => {
        return (
          <div key={person._id}>
            <div>
              <img src={person.avatar} height="50px" width="50px" />
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
          </div>
        );
      })}
    </div>
  );
}

export default FilterUserDetail;
