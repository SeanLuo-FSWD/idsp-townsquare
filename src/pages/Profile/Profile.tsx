import React, { useState, useEffect, useContext } from "react";
import { editProfile } from "../../utils/api/auth.api";
import { fetchPerson } from "../../utils/api/people.api";
import { LoginContext } from "../../store/context/LoginContext";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.scss";
import _, { String } from "lodash";
import SubNav from "../../components/Navbar/SubNav";
import { logout } from "../../utils/api/auth.api";

function Profile() {
  const [initPerson, setInitPerson] = useState(null) as any;
  const [person, setPerson] = useState({
    id: "",
    filename: "",
    username: "",
    age: "",
    gender: "",
    location: "",
  }) as any;
  //   const [pwRetype, setPwRetype] = useState(false);
  const [fieldArr, setFieldArr] = useState([]) as any;
  const [updateStatus, setUpdateStatus] = useState(false);
  const { currentUser, setCurrentUser, setCerror } = useContext(LoginContext);
  useEffect(() => {
    fetchPerson(currentUser.id, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPerson(result); // Uncontrolled
        console.log("null");
      }
    });
  }, []);
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;

    setPerson({ ...person, [name]: value }); //controlled
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
        // return the current user object

        // setCurrentUser({
        //   username: "patrick",
        //   id: "patrick_id",
        //   img:
        //     "https://static.wikia.nocookie.net/characters/images/6/6b/309.png/revision/latest/top-crop/width/360/height/450?cb=20141230071329",
        // });

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

  if (person.id) {
    const ageArr = [];
    for (let i = 1; i <= 100; i++) {
      ageArr.push(i);
    }

    return (
      <div>
        <Navbar currentPath={window.location.pathname} />
        <SubNav>
          <div className={`flex--space-around ${styles.SubNavWrap}`}>
            <h2>{currentUser.username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </SubNav>

        <div>
          <div>
            <div className={styles.container}>
              <img className={styles.profileImg} src={person.img} alt="" />
              <button data-edit="editImg" onClick={handleEditOpen}>
                Edit
              </button>
              {fieldArr.find((ele: string) => ele === "editImg") && (
                <div className={`flex`}>
                  <input
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
            <div className={`flex`}>
              <h2>username: {person.username}</h2>
              <button data-edit="editUsername" onClick={handleEditOpen}>
                Edit
              </button>
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
            <div className={`flex`}>
              <h2>age: {person.age}</h2>
              <button data-edit="editAge" onClick={handleEditOpen}>
                Edit
              </button>
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
            <div className={`flex`}>
              <h2>Location: {person.location}</h2>
              <button data-edit="editLocation" onClick={handleEditOpen}>
                Edit
              </button>
              {fieldArr.find((ele: string) => ele === "editLocation") && (
                <div className={`flex`}>
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
            <div className={`flex`}>
              <h2>gender: {person.gender}</h2>
              <button data-edit="editGender" onClick={handleEditOpen}>
                Edit
              </button>
              {fieldArr.find((ele: string) => ele === "editGender") && (
                <div className={`flex`}>
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
          </div>
        </div>
        {updateStatus && <h3>Profile updated!</h3>}

        <button onClick={handleProfileEdit} style={{ float: "right" }}>
          Submit
        </button>

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
