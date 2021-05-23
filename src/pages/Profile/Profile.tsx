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
import townSquareLogo from "./assets/townSquareLogo.svg";
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

    setInitPerson(currentUser);
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

    updateProfile(bodyFormData, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPerson({});
        setUpdateStatus(true);
        setFieldArr([]);
        let newCurrrentUser;
        for (const key in person) {
          newCurrrentUser = { ...currentUser, [key]: person[key] };
        }

        if (currentUser.firstTime) {
          setTimeout(() => {
            setCurrentUser(result.data);
          }, 2000);
        } else {
          setCurrentUser(result.data);
        }
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

        <div className={styles.profileContainer}>
          {currentUser.firstTime ? (
            <div>
              <h3>
                Welcome {currentUser.username}. Please fill your Age, Location
                and Gender,
                <br /> so you are searcheable by others.
              </h3>
            </div>
          ) : (
            <div>
              <h4>
                Remember to fill Age, Location and Gender to be searchable!
              </h4>
            </div>
          )}
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
                <div>
                  <strong>Username: </strong>
                  {initPerson.username}
                </div>
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
                <div>
                  <strong>Age: </strong> {initPerson.age}
                </div>
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
                <div>
                  <strong>Location: </strong>
                  {initPerson.location}
                </div>
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
                      <option value=""></option>
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
                <div>
                  <strong>gender: </strong> {initPerson.gender}
                </div>
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
                      <option value=""></option>
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

              {updateStatus && currentUser.firstTime && (
                <div>
                  You will be
                  <br />
                  redirected to home page shortly
                </div>
              )}
            </div>
          </div>
        </div>
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
