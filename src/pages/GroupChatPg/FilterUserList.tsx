import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../../store/context/LoginContext";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory, useParams } from "react-router-dom";
import styles from "./FilterUserList.module.scss";

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
  initialChatGroup,
}: any) {
  const { currentUser } = useContext(LoginContext);

  const initialChatGroupIds = initialChatGroup.map((p: any) => {
    return p.userId;
  });

  console.log("FilterUserList ----- initialChatGroup");
  console.log(initialChatGroup);

  // const [initialChatGroup, setInitialGroup] = useState(addedGroupIds);
  const history = useHistory();
  // let initialChatGroup: any = [];
  useEffect(() => {
    // initialChatGroup = addedGroupIds;
  }, []);
  const handleCheck = (event: any) => {
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
        {/* <button onClick={toggleFilterProp}>Back to filter</button> */}
        <button onClick={onStartChatProp}>Start Chatting</button>
        <button onClick={history.goBack}>Cancel</button>
      </SubNav>
      <div className={styles.listWrapper}>
        {people.map((person: any) => {
          if (person._id === currentUser.userId) {
            return;
          }
          if (initialChatGroupIds.includes(person._id)) {
            return;
          } else {
            return (
              <div key={person._id} className={styles.cardWrapper}>
                <div className={styles.imgSelect}>
                  <img
                    // onClick={() => {
                    //   history.push(`/person/${person._id}`);
                    // }}
                    src={person.avatar}
                    height="50px"
                    width="50px"
                    style={{ marginRight: "10px" }}
                  />
                  <FormGroup style={{ flexDirection: "row" }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value={person._id}
                          onChange={handleCheck}
                          checked={addedGroupIds.indexOf(person._id) > -1}
                        />
                      }
                      label="add"
                    />
                  </FormGroup>
                </div>

                <FilterUser person={person} />
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default FilterUserList;
