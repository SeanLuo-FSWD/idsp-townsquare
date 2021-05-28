import React, { useState, useEffect, useContext } from "react";
import { updateProfile } from "../../utils/api/auth.api";
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
import { connect } from "react-redux";
import {
  doFeedFilterRemove,
  doPeopleFilterRemove,
} from "../../store/redux/actions/filter_act";
import Error from "../../components/Error/Error";
import Spinning from "../../pages/spinning.page";
import editIcon from "./assets/edit_icon.png";

function Profile(props: any) {
  const [initPerson, setInitPerson] = useState(null) as any;
  const [person, setPerson] = useState({}) as any;
  //   const [pwRetype, setPwRetype] = useState(false);
  const [fieldArr, setFieldArr] = useState([]) as any;
  const [updateStatus, setUpdateStatus] = useState(false);
  const { currentUser, setCurrentUser, cerror, setCerror } =
    useContext(LoginContext);
  const history = useHistory();

  let imgFile: any = null;
  useEffect(() => {
    return () => {
      setCerror("");
    };
  }, []);
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

    setPerson({ ...person, [name]: value });
  };

  function handleEditOpen(e: any) {
    setUpdateStatus(false);
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
          setInitPerson({ ...initPerson, avatar: person.avatarlink });
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
      <div className={styles.pagePadding}>
        <Navbar currentPath={window.location.pathname} />
        <SubNav></SubNav>

        {cerror && <Error message={cerror} />}

        <div className={styles.profilePage}>
        <div className={styles.profileContainer}>
          {currentUser.firstTime ? (
            <div>
              <h3>
                Welcome {currentUser.username}. Please fill your Age, Location
                and Gender,
                <br /> so you are searchable by others.
              </h3>
            </div>
          ) : (
            <div className={styles.rememberToFill}>
              <h4>
                Remember to fill Age, Location and Gender to be searchable!
              </h4>
            </div>
          )}
          <div className={styles.containerCard}>
            {/* <div> */}

              <div className={styles.container}>
                <div className={styles.avatarContainer}>
                  {person.avatar && updateStatus === false? (
                    <img
                      className={styles.profileImg}
                      src={person.avatarlink}
                      alt=""
                    />
                  ) : (
                    <img
                      className={styles.profileImg}
                      src={initPerson.avatar}
                      alt="" />
                  )
                }
                  {/* <img
                    className={styles.profileImg}
                    src={initPerson.avatar}
                    alt="" /> */}
                  <label htmlFor="myFile" className={styles.editLabel}>
                    <img src={editImage} className={styles.editIcon}/>
                  </label>
                </div>
                {/* {person.avatar && updateStatus === false && (
                  <img
                    className={styles.profileImg}
                    src={person.avatarlink}
                    alt=""
                  />
                )} */}
              </div>
            {/* </div> */}
            <input
              className={styles.uploadImage}
              type="file"
              id="myFile"
              name="avatar"
              accept="image"
              onChange={(e) => getImg(e)} />
            <hr />
            <div className={styles.itemsContainer}>
              <div className={styles.items}>
                <div className={styles.infoTitle}>
                  Username
                </div>
                {
                  fieldArr.find((ele: string) => ele === "editUsername")? 
                  // && 
                  (
                    <>
                    <div className={styles.inputContainer}>
                      <input
                        className={styles.inputField}
                        type="username"
                        id="username"
                        name="username"
                        placeholder={initPerson.username}
                        // value={initPerson.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className={styles.closeButton}>
                      <i className="fa fa-close"
                          data-edit="editUsername"
                          onClick={handleEditClose}></i>
                    </div>
                    </>
                  ) : (
                    <>
                    <div className={styles.infoContent}>
                      {initPerson.username}
                    </div>
                    <div data-edit="editUsername"
                        onClick={handleEditOpen}
                        className={styles.editButton}>
                      edit
                    </div>
                    </>
                  )
                }
              </div>
              <div className={styles.items}>
                <div className={styles.infoTitle}>
                  Age
                </div>
                {
                  fieldArr.find((ele: string) => ele === "editAge")? 
                  (
                    <>
                    <div className={styles.inputContainer}>
                      <select
                        name="age"
                        onChange={handleChange}
                        value={person.age}
                        defaultValue={initPerson.age}
                        className={styles.selectField}
                        required >
                        {ageArr.map((year) => {
                          return <option key={year}>{year}</option>;
                        })}
                      </select>        
                    </div>
                    <div className={styles.closeButton}>
                      <i className="fa fa-close"
                          data-edit="editAge"
                          onClick={handleEditClose}></i>
                    </div>

                    </>
                  ) : (
                    <>
                      <div className={styles.infoContent}>
                        {initPerson.age}
                      </div>
                      <div data-edit="editAge"
                        onClick={handleEditOpen}
                        className={styles.editButton}>edit
                      </div>
                    </>
                  )
                }
              </div>
              <div className={styles.items}>
                <div className={styles.infoTitle}>Location</div>
                {fieldArr.find((ele: string) => ele === "editLocation")? (
                  <>
                    <div className={styles.inputContainer}>
                      <select
                        name="location"
                        onChange={handleChange}
                        value={person.location}
                        defaultValue={initPerson.location}
                        required
                        className={styles.selectField}
                      >
                        {/* <option value=""></option> */}
                        <option value="Surrey">Surrey</option>
                        <option value="Burnaby">Burnaby</option>
                        <option value="Coquitlam">Coquitlam</option>
                        <option value="Richmond">Richmond</option>
                        <option value="Vancouver">Vancouver</option>
                      </select>
                    </div>
                    <div className={styles.closeButton}>
                      <i className="fa fa-close"
                        data-edit="editLocation"
                        onClick={handleEditClose}></i>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.infoContent}>
                      {initPerson.location}
                    </div>
                    <div data-edit="editLocation"
                        onClick={handleEditOpen}
                        className={styles.editButton}>edit
                    </div>
                  </>
                )
              }
              </div>
              <div className={styles.items}>
                <div className={styles.infoTitle}>gender</div>
                {
                  fieldArr.find((ele: string) => ele === "editGender")? (
                  <>
                    <div className={styles.inputContainer}>
                      <select
                        name="gender"
                        onChange={handleChange}
                        value={person.gender}
                        defaultValue={initPerson.gender}
                        className={styles.selectField}
                        required >
                        <option value=""></option>
                        <option value="female">female</option>
                        <option value="male">male</option>
                        <option value="other">other</option>
                        
                      </select>
                    </div>
                    <div className={styles.closeButton}>
                      <i className="fa fa-close"
                        data-edit="editGender"
                        onClick={handleEditClose}></i>
                    </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.infoContent}>
                        {initPerson.gender}
                      </div>
                      <div data-edit="editGender"
                        onClick={handleEditOpen}
                        className={styles.editButton}>edit
                      </div>
                    </>
                  )
                }
              </div>
            </div>


            <div className={styles.submitButton}>
              <button
                className={`pointer ${styles.saveChanges}`}
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
          <button
            className={`pointer ${styles.logoutButton}`}
            onClick={handleLogout}
          >
            <div className={styles.logoutButtonWrapper}>
              Logout
              <img
                className={`pointer ${styles.logoutIcon}`}
                src={logoutImage}
                onClick={handleLogout}
              />
            </div>
          </button>
        </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {cerror && <Error message={cerror} />}
      <Spinning />
    </>
  );
}

// export default Profile;
const mapDispatchToProps = (dispatch: any) => {
  return {
    onFeedFilterRemove: () => dispatch(doFeedFilterRemove()),
    onPeopleFilterRemove: () => dispatch(doPeopleFilterRemove()),
  };
};

export default connect(null, mapDispatchToProps)(Profile);
