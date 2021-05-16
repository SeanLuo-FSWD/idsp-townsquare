import React, { useEffect, useState, useContext } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";
import styles from "./UserGrid.module.scss";
import styles2 from "./userDetail.module.scss";
import { getFeed, getFeedError } from "../../store/redux/selector/Feed";
import { LoginContext } from "../../store/context/LoginContext";
import _ from "lodash";
import {
  getPerson,
  getFollowingUsers,
  toggleFollowing,
} from "../../utils/api/people.api";
import PortalModal from "../../UI/PortalModal";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";

import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DetailFollow from "./DetailFollow";

function UserDetail(props: any) {
  console.log("UserDetail UserDetail UserDetail: user");
  console.log(props.people);
  const { currentUser, setCerror, showModal, setShowModal } =
    useContext(LoginContext);

  const [groupDd, setGroupDd] = useState(false) as any;
  const [group, setGroup] = useState([]) as any;

  const [followed, setFollowed] = useState([]) as any;

  useEffect(() => {
    getFollowingUsers((err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setFollowed(result.data);
      }
    });
  }, []);

  const onFollowHandleProp = (followUserId: string) => {
    toggleFollowing(followUserId, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        if (result === "followed") {
          setFollowed([
            ...followed,
            { followingUserId: followUserId, userId: currentUser.userId },
          ]);
        } else {
          const new_follow_arr = _.filter(
            followed,
            (f: any) => f.followingUserId !== followUserId
          );

          setFollowed(new_follow_arr);
        }
      }
    });
  };

  // const initGroups = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];

  return (
    <div>
      {props.people.map((person: any) => {
        const propObj = {
          person: person,
          onFollowHandleProp: "onFollowHandleProp",
          followed: "followed",
        };

        return (
          // <DetailFollow
          //   person={person}
          //   followed={followed}
          //   onFollowHandleProp={onFollowHandleProp}
          // ></DetailFollow>
          <div key={person._id}>
            {props.children(person, onFollowHandleProp, followed)}

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

export default UserDetail;
