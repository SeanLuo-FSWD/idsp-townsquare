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
import editImage from "./assets/edit.svg";
import saveChanges from "./assets/save.svg";
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

    // getPerson(currentUser.id, (err: Error, result: any) => {
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
            <p className={styles.profileUserName}>{currentUser.username}</p>
            <img src={logoutImage} onClick={handleLogout} />
          </div>
        </SubNav>

        {currentUser.firstTime && (
          <h2>Welcome {currentUser.username}, please fill your info first.</h2>
        )}
        <div>
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
              <img
                src={changeProfileImg}
                data-edit="editImg"
                onClick={handleEditOpen}
              />

              {fieldArr.find((ele: string) => ele === "editImg") && (
                <div className={styles.items}>
                  <input
                    className={styles.uploadImage}
                    type="file"
                    id="myFile"
                    name="avatar"
                    accept="image"
                    onChange={(e) => getImg(e)}
                  />
                  <p data-edit="editImg" onClick={handleEditClose}>
                    x
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.items}>
              <p>username: {initPerson.username}</p>
              <img
                src={editImage}
                data-edit="editUsername"
                onClick={handleEditOpen}
              />

              {fieldArr.find((ele: string) => ele === "editUsername") && (
                <div className={`flex`}>
                  <input
                    type="username"
                    id="username"
                    name="username"
                    placeholder="Create a username"
                    // value={person.username}
                    onChange={handleChange}
                  />
                  <p data-edit="editUsername" onClick={handleEditClose}>
                    x
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.items}>
              <p>age: {initPerson.age}</p>
              <img
                src={editImage}
                data-edit="editAge"
                onClick={handleEditOpen}
              />

              {fieldArr.find((ele: string) => ele === "editAge") && (
                <div className={`flex`}>
                  <select name="age" onChange={handleChange} value={person.age}>
                    {ageArr.map((year) => {
                      return <option key={year}>{year}</option>;
                    })}
                  </select>
                  <p data-edit="editAge" onClick={handleEditClose}>
                    x
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.items}>
              <p>Location: {initPerson.location}</p>
              <img
                src={editImage}
                data-edit="editLocation"
                onClick={handleEditOpen}
              />

              {fieldArr.find((ele: string) => ele === "editLocation") && (
                <div className={styles.items}>
                  <select
                    name="location"
                    onChange={handleChange}
                    value={person.location}
                  >
                    <option value="Surrey">Surrey</option>
                    <option value="Burnaby">Burnaby</option>
                    <option value="Coquitlam">Coquitlam</option>
                    <option value="Richmond">Richmond</option>
                    <option value="Vancouver">Vancouver</option>
                  </select>
                  <p data-edit="editLocation" onClick={handleEditClose}>
                    x
                  </p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.items}>
              <p>gender: {initPerson.gender}</p>
              <img
                src={editImage}
                data-edit="editGender"
                onClick={handleEditOpen}
              />

              {fieldArr.find((ele: string) => ele === "editGender") && (
                <div className={styles.items}>
                  <select
                    name="gender"
                    onChange={handleChange}
                    value={person.gender}
                  >
                    <option value="female">female</option>
                    <option value="male">male</option>
                    <option value="other">other</option>
                  </select>
                  <p data-edit="editGender" onClick={handleEditClose}>
                    x
                  </p>
                </div>
              )}
            </div>
            <div className={styles.submitButton}>
              <button
                className={styles.saveChanges}
                onClick={handleProfileEdit}
              >
                Save
              </button>
            </div>
          </div>
          {updateStatus && <p>Profile updated!</p>}
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
