import React, { useState, useEffect, useContext } from "react";
import { editProfile } from "../../utils/api/auth.api";
import { fetchPerson } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.scss";
import _, { String, stubFalse } from "lodash";
import SubNav from "../../components/Navbar/SubNav";
import { logout } from "../../utils/api/auth.api";
import changeProfileImg from "./assets/image.svg";
import logoutImage from "./assets/logout.svg";
import editImage from "./assets/edit.svg";
import saveChanges from "./assets/save.svg";

function Profile() {
  const [initPerson, setInitPerson] = useState(null) as any;
  const [person, setPerson] = useState({}) as any;
  //   const [pwRetype, setPwRetype] = useState(false);
  const [fieldArr, setFieldArr] = useState([]) as any;
  const [updateStatus, setUpdateStatus] = useState(false);
  const { currentUser, setCurrentUser, setCerror } = useContext(LoginContext);

  useEffect(() => {
    console.log("state refresh");

    fetchPerson(currentUser.id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setInitPerson(result);
      }
    });
  });

  const handleChange = (e: any) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "age") {
      value = parseInt(value);
    }

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
    editProfile(person, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        for (const key in result) {
          if (key === "username" || key === "img") {
            setCurrentUser({
              ...currentUser,
              [key]: result[key],
            });
          }
        }

        // You will have to let state change refresh to grab fetch again
        setPerson({});
        setUpdateStatus(true);
        setFieldArr([]);
      }
    });
  }

  function getImg(e: any) {
    const imgFile = e.target.files[0];
    let binaryData = [];
    binaryData.push(imgFile);
    const blob = new Blob(binaryData);
    const img_src = window.URL.createObjectURL(blob);
    setPerson({ ...person, ["img"]: img_src });
  }

  function handleLogout() {
    logout((err: Error, result: any) => {
      if (err) {
        console.log(err);
        setCerror(err.message);
      } else {
        setCerror("");
        setCurrentUser(null);
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
            <img src={logoutImage} onClick={handleLogout}/>
          </div>
        </SubNav>

        <div className={styles.container}>
          <div >
            <div >
              <img className={styles.profileImg} src={initPerson.img} alt="" />
              {person.img && updateStatus === false && (
                <img className={styles.profileImg} src={person.img} alt="" />
              )}
              <img src={changeProfileImg} data-edit="editImg" onClick={handleEditOpen}/>

              {fieldArr.find((ele: string) => ele === "editImg") && (
                <div className={styles.items}>
                  <input
                    className={styles.uploadImage}
                    type="file"
                    id="myFile"
                    name="filename"
                    accept="image/png"
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
              <img src={editImage} data-edit="editUsername" onClick={handleEditOpen}/>

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
              <img src={editImage} data-edit="editAge" onClick={handleEditOpen}/>
              
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
              <img src={editImage} data-edit="editLocation" onClick={handleEditOpen}/>

              {fieldArr.find((ele: string) => ele === "editLocation") && (
                <div className={styles.items}>
                  <select
                    name="location"
                    onChange={handleChange}
                    value={person.location}
                  >
                    <option value="Abbotsford">Abbotsford</option>
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
              <img src={editImage} data-edit="editGender" onClick={handleEditOpen}/>

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
              <button className={styles.saveChanges} onClick={handleProfileEdit}>Save</button>
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

export default Profile;
