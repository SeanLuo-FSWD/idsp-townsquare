import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";

// the entire state lies here!  Go back and lose it all. Go forward and start the chat page.
// how pass state to chat page?

// on start chatting, has to save users to server with an id, pass back and redirect there.
function FilterUserDetail({ people, toggleFilterProp }: any) {
  const [addedGroup, setAddedGroup] = useState([]) as any; // array of ids
  const { setGroupChat } = useContext(LoginContext);
  const history = useHistory();

  useEffect(() => {
    console.log("1111111111111111111111");
    console.log(addedGroup);
  });
  const handleCheck = (event: any) => {
    console.log("88888888888888888888");
    console.log(event.target.value);
    console.log(event.target.checked);

    if (event.target.checked) {
      setAddedGroup([...addedGroup, event.target.value]);
    } else {
      const removedGroup = addedGroup.filter((gn: string) => {
        return gn !== event.target.value;
      });
      console.log("addedGroup: unchecked");
      console.log(removedGroup);
      setAddedGroup(removedGroup);
    }
  };

  function submitSelection() {
    if (addedGroup.length === 0) {
      window.alert("You must select at least one user!");
    } else {
      setGroupChat(addedGroup);
      history.push(`/chat`);
    }
  }

  return (
    <>
      <Navbar currentPath={window.location.pathname} />
      <SubNav>
        <button onClick={toggleFilterProp}>Back to filter</button>
        <button onClick={submitSelection}>Start Chatting</button>
        <button onClick={history.goBack}>Cancel</button>
      </SubNav>
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

              <FormGroup style={{ flexDirection: "row" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={person._id}
                      onChange={handleCheck}
                      checked={addedGroup.indexOf(person._id) > -1}
                    />
                  }
                  label="add"
                />
              </FormGroup>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default FilterUserDetail;
