import React, { useEffect, useState, useContext } from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import styles2 from "./userDetail.module.scss";
import { LoginContext } from "../../store/context/LoginContext";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
} from "../../utils/api/people.api";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import addToGroupIcon from "./assets/addToGroup.svg";
import unfollowIcon from "./assets/unfollow.svg";
import followIcon from "./assets/follow.svg";

function Detail({ user, onFollowHandleProp, followed }: any) {
  const [groupDd, setAddedGroupDd] = useState(false) as any;
  const { currentUser, setCerror, showModal, setShowModal } =
    useContext(LoginContext);
  const [availableGroup, setAvailableGroup] = useState([]) as any;
  const [newGroupName, setNewGroupName] = useState(null) as any;

  const [addedGroup, setAddedGroup] = useState([]) as any;
  const [groupObjArr, setGroupObjArr] = useState([]) as any;

  useEffect(() => {
    console.log("2222222222222222");
    console.log("2222222222222222");
    console.log(addedGroup);
    console.log("availableGroup");
    console.log(availableGroup);
  });

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

  function onAddGroupSubmit(e: any) {
    e.preventDefault();
  }

  const handleGroupCheck = (event: React.ChangeEvent<{ value: unknown }>) => {
    console.log("fffffffffffffffffffffff");
    console.log(event.target.value);

    setAddedGroup([...addedGroup, event.target.value]);
    console.log("777777777777777777777");
    const group_name = event.target.value;
    console.log({
      ...groupObjArr,
      group_name: [...(group_name as any), user._id],
    });

    // let newGroupObjArr = groupObjArr.map((g: any) => {
    //   const key = Object.keys(g)[0];
    //   if (key === event.target.value) {
    //     // add to it.
    //   }
    // });

    // need to find a way to toggle it off.

    setGroupObjArr({ ...groupObjArr, [event.target.value as any]: user._id });
  };

  return (
    <div className={styles2.detailedCards}>
      <div className={styles2.cardWrapper}>
        <div key={user._id} className="flex" style={{ justifyContent: "center" }}>
          <div className={styles2.vertialAlign}>
            <div className={styles2.avatarAndInfoWrapper}>

              <div className={styles2.avatarAndButtons}>

                <Link to={`/person/${user._id}`}>
                  <img
                    className={styles2.profileImage}
                    style={{ height: "100px", width: "100px" }}
                    src={user.avatar}
                  ></img>
                </Link>
              </div>


              <div className={styles2.userDescription}>
                <div>{user.username}</div>

                <div>
                  <span style={{ marginRight: "5px" }}>Location</span>
                  <span>{user.location}</span>
                </div>

                <div>
                  <span style={{ marginRight: "5px" }}>Age</span>
                  <span>{user.age}</span>
                </div>

                <div>
                  <span style={{ marginRight: "5px" }}>Gender</span>
                  <span>{user.gender}</span>
                </div>
              </div>

            </div>
            <div className={styles2.followUnfollowButtons}>
              {user._id !== currentUser.userId ? (
                checkFollowed(user._id) ? (
                  <button className={styles2.detailedButtons} onClick={() => onFollowHandleProp(user._id)}>
                    Unfollow
                    <img className={styles2.buttonIcons} src={unfollowIcon} />
                  </button>
                ) : (
                  <button className={styles2.detailedButtons} onClick={() => onFollowHandleProp(user._id)}>
                    Follow
                    <img className={styles2.buttonIcons} src={followIcon} />
                  </button>
                )
              ) : null}


              <button className={styles2.detailedButtons} onClick={() => fetchAvailableGroups(!groupDd)}>
                Add to Group
            <img className={styles2.buttonIcons} src={addToGroupIcon} />
              </button>
            </div>
          </div>




        </div>

        {groupDd && (
          <FormGroup style={{ flexDirection: "column" }}>
            <div className={styles2.dropDownWrapper}>

              {availableGroup.map((name: any) => (
                <MenuItem key={name}>
                  <Checkbox
                    className={styles2.muiDropDown}
                    value={name}
                    onChange={handleGroupCheck}
                    checked={addedGroup.indexOf(name) > -1}
                  />
                  <ListItemText primary={name} />
                </MenuItem>
              ))}

              <form className={styles2.inputForm}>
                <input className={styles2.inputForm} type="text" name="newGroup" onChange={handleChange} />
                <button className={styles2.createGroupButton} type="submit" onClick={createNewGroup}>
                  Create Group
                </button>
                <button className={styles2.createGroupButton} type="submit" onClick={onAddGroupSubmit}>
                  Add
              </button>
              </form>


            </div>
          </FormGroup>
        )}
      </div>

    </div>

  );
}

export default Detail;
