import React, { useState, useEffect, useContext } from "react";
import { updateProfile } from "../../utils/api/auth.api";
import { getPerson } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.scss";
import _ from "lodash";
import SubNav from "../../components/Navbar/SubNav";
import { logout } from "../../utils/api/auth.api";
import changeProfileImg from "./assets/image.svg";
import logoutImage from "./assets/logout.svg";
import closeIcon from "./assets/close.svg";
import editImage from "./assets/edit.svg";
import saveChanges from "./assets/save.svg";
import townSquareLogo from "./assets/townSquareLogo.png";
import { connect } from "react-redux";
import {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doPeopleFilterUpdate,
  doPeopleFilterRemove,
} from "../../store/redux/actions/filter_act";

function Profile(props: any) {
  const [initPerson, setInitPerson] = useState(null) as any;
  const [person, setPerson] = useState({}) as any;
  //   const [pwRetype, setPwRetype] = useState(false);
  const [fieldArr, setFieldArr] = useState([]) as any;
  const [updateStatus, setUpdateStatus] = useState(false);
  const { currentUser, setCurrentUser, setCerror } = useContext(LoginContext);
  const history = useHistory();

  let imgFile: any = null;
  useEffect(() => {
    console.log("state refresh");
    console.log(currentUser);
    // let search = window.location.search;
    // let firstTime = new URLSearchParams(search).get("firstTime") as string;

    // getPerson(currentUser.userId, (err: Error, result: any) => {
    //   if (err) {
    //     setCerror(err.message);
    //   } else {
    //     setInitPerson(result);
    //   }
    // });

    setInitPerson(currentUser);

    // if (firstTime === "true") {
    //   console.log("1111111111111111111111");
    //   console.log("1111111111111111111111");
    //   console.log(firstTime);
    //   setInitPerson({ ...currentUser, ["firstTime"]: true });
    // }
  }, [currentUser]);

  const handleChange = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "age") {
      value = parseInt(value);
    }

    console.log("fffffffffffffffffffffff");
    console.log("88888888888888888888");

    console.log({ ...person, [name]: value });

    setPerson({ ...person, [name]: value });
  };

  function handleEditOpen(e: any) {
    setFieldArr([...fieldArr, e.target.getAttribute("data-edit")]);
  }

  function handleEditClose(e: any) {
    let new_likes_arr = _.filter(
      fieldArr,
      (o) => o != e.target.getAttribute("data-edit")
    );

    setFieldArr(new_likes_arr);
  }

  function handleProfileEdit(e: any) {
    e.preventDefault();

    const required_arr = ["gender", "location", "age"];
    for (let i = 0; i < required_arr.length; i++) {
      console.log("check if filled");

      console.log(person[required_arr[i]]);

      if (
        person[required_arr[i]] === null ||
        person[required_arr[i]] === undefined
      ) {
        alert("You must fill all the fields: username, age, gender, location");
        return;
      }
    }

    console.log("handleProfileEdit handleProfileEdit handleProfileEdit person");
    console.log(person);

    let bodyFormData = new FormData();

    for (const key in person) {
      if (key !== "avatarlink") {
        console.log("imgFile imgFile imgFile imgFile");
        console.log(person[key]);

        bodyFormData.append(key, person[key]);
      }
    }

    console.log("000000000000000000000");
    console.log(bodyFormData);

    updateProfile(bodyFormData, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        // for (const key in result) {
        //   if (key === "username" || key === "img") {
        //     setCurrentUser({
        //       ...currentUser,
        //       [key]: result[key],
        //     });
        //   }
        // }
        // setCurrentUser(result);

        // You will have to let state change refresh to grab fetch again
        console.log("greeeeeat successs!! person");
        console.log(person);
        console.log("currentUser below");
        console.log(currentUser);

        setPerson({});
        setUpdateStatus(true);
        setFieldArr([]);
        let newCurrrentUser;
        for (const key in person) {
          newCurrrentUser = { ...currentUser, [key]: person[key] };
        }

        console.log(
          "setCurrentUser setCurrentUser setCurrentUser result.data : "
        );
        console.log(result.data);

        setCurrentUser(result.data);
      }
    });
  }

  function getImg(e: any) {
    let imgFile = e.target.files[0];
    let binaryData = [];
    binaryData.push(imgFile);
    const blob = new Blob(binaryData);
    const img_src = window.URL.createObjectURL(blob);

    console.log("777777777777777777777");
    console.log("getImg");
    console.log(img_src);

    let newPerson = { ...person, ["avatar"]: imgFile };
    newPerson = { ...newPerson, ["avatarlink"]: img_src };

    setPerson(newPerson);
  }

  function handleLogout() {
    logout((err: Error, result: any) => {
      if (err) {
        console.log(err);
        setCerror(err.message);
      } else {
        setCerror("");
        setCurrentUser(null);
        props.onFeedFilterRemove();
        props.onPeopleFilterRemove();
        history.push("/");
      }
    });
  }

  // if (person.id) {
  if (initPerson) {
    const ageArr = [];
    for (let i = 1; i <= 100; i++) {
      ageArr.push(i);
    }
    return (
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <div className={`flex--space-around ${styles.SubNavWrap}`}>
            <img className={styles.townSquareLogo} src={townSquareLogo} />
            <div className={styles.profileUserName}>{currentUser.username}</div>
            <img
              className={styles.logoutIcon}
              src={logoutImage}
              onClick={handleLogout}
            />
          </div>
        </SubNav>

        {currentUser.firstTime && (
          <div>
            Welcome {currentUser.username}, please fill your info first.
          </div>
        )}
        <div className={styles.profileContainer}>
          <div className={styles.containerCard}>
            <div>
              <div className={styles.container}>
                <img
                  className={styles.profileImg}
                  src={initPerson.avatar}
                  alt=""
                />
                {person.avatar && updateStatus === false && (
                  <img
                    className={styles.profileImg}
                    src={person.avatarlink}
                    alt=""
                  />
                )}
              </div>
            </div>
            <div className={styles.items}>
              <img
                className={styles.userPageIcons}
                src={changeProfileImg}
                data-edit="editImg"
                onClick={handleEditOpen}
              />
              {fieldArr.find((ele: string) => ele === "editImg") && (
                <div className={`flex`}>
                  <input
                    className={styles.uploadImage}
                    type="file"
                    id="myFile"
                    name="avatar"
                    accept="image"
                    onChange={(e) => getImg(e)}
                  />
                  <img
                    className={styles.userPageIcons}
                    src={closeIcon}
                    data-edit="editImg"
                    onClick={handleEditClose}
                  />
                </div>
              )}
            </div>
            <div>
              <div className={styles.items}>
                <div>Username: {initPerson.username}</div>
                <img
                  className={styles.userPageIcons}
                  src={editImage}
                  data-edit="editUsername"
                  onClick={handleEditOpen}
                />

                {fieldArr.find((ele: string) => ele === "editUsername") && (
                  <div className={`flex`}>
                    <input
                      className={styles.inputField}
                      type="username"
                      id="username"
                      name="username"
                      placeholder="Create a username"
                      // value={person.username}
                      onChange={handleChange}
                      required
                    />
                    <img
                      src={closeIcon}
                      data-edit="editUsername"
                      onClick={handleEditClose}
                    />
                    <img
                      className={styles.userPageIcons}
                      src={closeIcon}
                      data-edit="editUsername"
                      onClick={handleEditClose}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className={styles.items}>
                <div>Age: {initPerson.age}</div>
                <img
                  className={styles.userPageIcons}
                  src={editImage}
                  data-edit="editAge"
                  onClick={handleEditOpen}
                />

                {fieldArr.find((ele: string) => ele === "editAge") && (
                  <div className={`flex`}>
                    <select
                      name="age"
                      onChange={handleChange}
                      value={person.age}
                      defaultValue={initPerson.age}
                      required
                    >
                      {ageArr.map((year) => {
                        return <option key={year}>{year}</option>;
                      })}
                    </select>
                    <img
                      className={styles.userPageIcons}
                      src={closeIcon}
                      data-edit="editAge"
                      onClick={handleEditClose}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className={styles.items}>
                <div>Location: {initPerson.location}</div>
                <img
                  className={styles.userPageIcons}
                  src={editImage}
                  data-edit="editLocation"
                  onClick={handleEditOpen}
                />

                {fieldArr.find((ele: string) => ele === "editLocation") && (
                  <div className={`flex`}>
                    <select
                      name="location"
                      onChange={handleChange}
                      value={person.location}
                      defaultValue={initPerson.location}
                      required
                    >
                      <option value="Surrey">Surrey</option>
                      <option value="Burnaby">Burnaby</option>
                      <option value="Coquitlam">Coquitlam</option>
                      <option value="Richmond">Richmond</option>
                      <option value="Vancouver">Vancouver</option>
                    </select>
                    <img
                      className={styles.userPageIcons}
                      src={closeIcon}
                      data-edit="editLocation"
                      onClick={handleEditClose}
                    />
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className={styles.items}>
                <div>gender: {initPerson.gender}</div>
                <img
                  className={styles.userPageIcons}
                  src={editImage}
                  data-edit="editGender"
                  onClick={handleEditOpen}
                />

                {fieldArr.find((ele: string) => ele === "editGender") && (
                  <div className={`flex`}>
                    <select
                      name="gender"
                      onChange={handleChange}
                      value={person.gender}
                      defaultValue={initPerson.gender}
                      required
                    >
                      <option value="female">female</option>
                      <option value="male">male</option>
                      <option value="other">other</option>
                    </select>
                    <img
                      className={styles.userPageIcons}
                      src={closeIcon}
                      data-edit="editGender"
                      onClick={handleEditClose}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.submitButton}>
              <button
                className={styles.saveChanges}
                onClick={handleProfileEdit}
              >
                Save
              </button>
            </div>

            <div className={styles.updateMessage}>
              {updateStatus && <div>Profile updated!</div>}
            </div>
          </div>
        </div>

        {/* <form>
          <div className="form-control">
            <label htmlFor="username">username : </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Edit username"
              value={person.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="age">age : </label>
            <input
              type="text"
              id="age"
              name="age"
              placeholder="Edit age"
              value={person.age}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="location">location : </label>
            <input
              type="text"
              id="location"
              name="location"
              placeholder="Edit location"
              value={person.location}
              onChange={handleChange}
            />
          </div>

          <button type="submit" onClick={handleProfileEdit}>
            Submit Edit
          </button>
        </form> */}
      </div>
    );
  }
  return <h2>Loading</h2>;
}

// export default Profile;
const mapDispatchToProps = (dispatch: any) => {
  return {
    onFeedFilterRemove: () => dispatch(doFeedFilterRemove()),
    onPeopleFilterRemove: () => dispatch(doPeopleFilterRemove()),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
