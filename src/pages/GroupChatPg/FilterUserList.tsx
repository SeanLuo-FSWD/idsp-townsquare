import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";

import FilterUser from "./FilterUser";

// the entire state lies here!  Go back and lose it all. Go forward and start the chat page.
// how pass state to chat page?

// on start chatting, has to save users to server with an id, pass back and redirect there.
function FilterUserList({
  people,
  toggleFilterProp,
  addedGroup,
  setAddedGroupProp,
  onStartChatProp,
  setAddedGroupIds,
  addedGroupIds,
  chatType,
  initialIdGroup,
}: any) {
  const { showModal, setModalProps, setShowModal, setCerror, currentUser } =
    useContext(LoginContext);

  // const [initialIdGroup, setInitialGroup] = useState(addedGroupIds);
  const history = useHistory();
  // let initialIdGroup: any = [];
  useEffect(() => {
    console.log("1111111111111111111111");
    console.log(addedGroupIds);
    // initialIdGroup = addedGroupIds;
  }, []);
  const handleCheck = (event: any) => {
    console.log("88888888888888888888");

    console.log(event.target.value);
    console.log(event.target.checked);
    function mapIdToUser(id: string) {
      for (let i = 0; i < people.length; i++) {
        if (people[i]._id === id) {
          return {
            userId: id,
            avatar: people[i].avatar,
            username: people[i].username,
          };
        }
      }
    }
    if (event.target.checked) {
      // setAddedGroupProp([...addedGroup, event.target.value]);
      setAddedGroupIds([...addedGroupIds, event.target.value]);
      const mappedUser = mapIdToUser(event.target.value);

      setAddedGroupProp([...addedGroup, mappedUser]);
    } else {
      const removedGroup = addedGroupIds.filter((gn: string) => {
        return gn !== event.target.value;
      });
      console.log("addedGroup: unchecked");
      console.log(removedGroup);
      let mappedGroup = [];

      mappedGroup = removedGroup.map((id: string) => {
        return mapIdToUser(id);
      });

      setAddedGroupIds(removedGroup);
      setAddedGroupProp(mappedGroup);
    }
  };

  return (
    <>
      <Navbar currentPath={window.location.pathname} />
      <SubNav>
        <button onClick={toggleFilterProp}>Back to filter</button>
        <button onClick={onStartChatProp}>Start Chatting</button>
        <button onClick={history.goBack}>Cancel</button>
      </SubNav>
      <div style={{ marginTop: "50px" }}>
        {people.map((person: any) => {
          if (person._id === currentUser.userId) {
            return;
          }
          if (initialIdGroup.includes(person._id)) {
            return;
          } else {
            return (
              <div key={person._id}>
                <FilterUser person={person} />

                <FormGroup style={{ flexDirection: "row" }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        //   value={person._id}
                        value={person._id}
                        onChange={handleCheck}
                        checked={addedGroupIds.indexOf(person._id) > -1}
                      />
                    }
                    label="add"
                  />
                </FormGroup>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default FilterUserList;
