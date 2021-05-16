import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles2 from "./userDetail.module.scss";
import { LoginContext } from "../../store/context/LoginContext";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
  addPersonGroup,
} from "../../utils/api/people.api";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

function Detail({ person, onFollowHandleProp, followed }: any) {
  const [groupDd, setAddedGroupDd] = useState(false) as any;
  const { currentUser, setCerror, showModal, setShowModal } =
    useContext(LoginContext);
  const [availableGroup, setAvailableGroup] = useState([]) as any;
  const [newGroupName, setNewGroupName] = useState(null) as any;

  const [addedGroup, setAddedGroup] = useState([]) as any; // array of ids
  const [groupObjArr, setGroupObjArr] = useState([]) as any;

  //   useEffect(() => {
  //     console.log("2222222222222222");
  //     console.log("2222222222222222");
  //     console.log(addedGroup);
  //     console.log("availableGroup");
  //     console.log(availableGroup);
  //   });

  function fetchAvailableGroups(ddStatus: boolean) {
    if (ddStatus) {
      // Need to actual return the groupObjArr, and parse the names into an array.

      const sampleArr = [
        { group1: ["id1", "id2", "id3"] },
        { group2: ["id1", "id3"] },
        { group3: [] },
      ];
      setGroupObjArr(sampleArr);

      let group_name_arr: any = [];

      sampleArr.forEach((g) => {
        group_name_arr.push(Object.keys(g)[0]);
      });

      // setAvailableGroup([
      //   "Oliver Hansen",
      //   "Van Henry",
      //   "April Tucker",
      //   "Ralph Hubbard",
      // ]);

      setAvailableGroup(group_name_arr);
    }
    setAddedGroupDd(ddStatus);
  }

  function handleChange(e: any) {
    setNewGroupName(e.target.value);
  }

  function createNewGroup(e: any) {
    e.preventDefault();
    console.log("000000000000000000000");
    console.log("000000000000000000000");
    setAvailableGroup([...availableGroup, newGroupName]);
  }

  function checkFollowed(personUserId: string) {
    const match_follow = _.filter(
      followed,
      (f: any) => f.followingUserId === personUserId
    );
    if (match_follow[0]) {
      return true;
    }

    return false;
  }

  function onGroupSubmit(e: any) {
    e.preventDefault();
    const submitObj: any = {};
    submitObj["personId"] = person._id;
    submitObj["addedGroup"] = addedGroup;

    console.log("submitObj submitObj submitObj submitObj");
    console.log(submitObj);

    addPersonGroup(submitObj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setAddedGroupDd(false);
      }
    });
  }

  const handleGroupCheck = (event: any) => {
    console.log("fffffffffffffffffffffff");
    console.log("fffffffffffffffffffffff");

    console.log(event.target.value);
    console.log(event.target.checked);

    if (event.target.checked) {
      console.log("addedGroup: checked");
      console.log([...addedGroup, event.target.value]);
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

  return (
    <div key={person._id} className="flex" style={{ justifyContent: "center" }}>
      <Link to={`/person/${person._id}`}>
        <img
          className={styles2.profileImage}
          style={{ height: "100px", width: "100px" }}
          src={person.avatar}
        ></img>
      </Link>

      <div>
        <div>
          <h4>{person.username}</h4>
          {person._id !== currentUser.userId ? (
            checkFollowed(person._id) ? (
              <button onClick={() => onFollowHandleProp(person._id)}>
                Unfollow
              </button>
            ) : (
              <button onClick={() => onFollowHandleProp(person._id)}>
                Follow
              </button>
            )
          ) : null}

          <button onClick={() => fetchAvailableGroups(!groupDd)}>
            Add to Group
          </button>

          {groupDd && (
            <FormGroup style={{ flexDirection: "column" }}>
              <div className={styles2.dropDownWrapper}>
                {availableGroup.map((name: any) => (
                  <MenuItem key={name}>
                    <Checkbox
                      value={name}
                      onChange={handleGroupCheck}
                      checked={addedGroup.indexOf(name) > -1}
                    />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </div>
              <form>
                <input type="text" name="newGroup" onChange={handleChange} />
                <button type="submit" onClick={createNewGroup}>
                  create new group
                </button>
              </form>

              <button type="submit" onClick={onGroupSubmit}>
                Add
              </button>
            </FormGroup>
          )}
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
    </div>
  );
}

export default Detail;
