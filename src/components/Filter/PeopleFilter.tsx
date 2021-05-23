import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import styles from "./PeopleFilter.module.scss"
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { LoginContext } from "../../store/context/LoginContext";
import { postFilterSubmit } from "../../utils/api/posts.api";

function PeopleFilter({ peopleFilterProps, feedPg_People }: any) {
  let location_as_state = {
    Burnaby: false,
    Richmond: false,
    Coquitlam: false,
    Vancouver: false,
    Surrey: false,
  } as Object;

  feedPg_People.location.forEach((city: string) => {
    location_as_state = { ...location_as_state, [city]: true };
  });

  const [location, setLocation] = useState(location_as_state) as any;
  const { Burnaby, Richmond, Coquitlam, Vancouver, Surrey } = location;

  let gender_as_state = {
    female: false,
    male: false,
    other: false,
  };

  feedPg_People.gender.forEach((sex: string) => {
    gender_as_state = { ...gender_as_state, [sex]: true };
  });
  const [gender, setGender] = React.useState(gender_as_state);
  const { female, male, other } = gender;

  const [age, setAge] = React.useState<number[]>(feedPg_People.age);

  const [followed, setFollowed] = useState(feedPg_People.followed);

  function handleFollowedFilter(event: React.ChangeEvent<HTMLInputElement>) {
    setFollowed(event.target.checked);
    peopleFilterProps({ followed: event.target.checked });
  }

  // const [peopleFilter, setPeopleFilter] = useState({});
  const handleGenderFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gender_obj = { ...gender, [event.target.name]: event.target.checked };
    setGender(gender_obj);

    let gd_obj_arr = Object.entries(gender_obj);
    let gdArr: any = [];

    gd_obj_arr.forEach((l) => {
      if (l[1] === true) {
        gdArr.push(l[0]);
      }
    });
    // setPeopleFilter({ ...peopleFilter, ["gender"]: gdArr });
    peopleFilterProps({ gender: gdArr });
  };

  const handleLocationFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const loc_obj = { ...location, [event.target.name]: event.target.checked };
    setLocation(loc_obj);
    let loc_obj_arr = Object.entries(loc_obj);
    let locArr: any = [];

    loc_obj_arr.forEach((l) => {
      if (l[1] === true) {
        locArr = [...locArr, l[0]];
        // locArr.push(l[0]);
      }
    });
    console.log("locArr locArr locArr");
    console.log(locArr);
    // setPeopleFilter({ ...peopleFilter, ["location"]: locArr });
    peopleFilterProps({ location: locArr });
  };

  const handleAgeFilter = (event: any, newValue: number | number[]) => {
    setAge(newValue as number[]);
    // setPeopleFilter({ ...peopleFilter, ["age"]: newValue });
    peopleFilterProps({ age: newValue });
  };

  return (
    <div className={styles.peopleFilterContainer}>
      <div className={styles.filterStyling}>
        <div className={styles.filterTitles}>age</div>
        <div>Min age: {age[0]}</div>
        <div>Max age: {age[1]}</div>
        <Slider
          value={age}
          onChange={handleAgeFilter}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </div>
      <div className={styles.filterStyling}>
        <div  className={styles.filterTitles}>gender</div>
        <FormGroup className={styles.gender}>
          <FormControlLabel
            control={
              <Checkbox
                checked={female}
                onChange={handleGenderFilter}
                name="female"
              />
            }
            label="female"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={male}
                onChange={handleGenderFilter}
                name="male"
              />
            }
            label="male"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={other}
                onChange={handleGenderFilter}
                name="other"
              />
            }
            label="other"
          />
        </FormGroup>
      </div>
      <div className={styles.filterStyling}>
        <div className={styles.filterTitles}>location</div>
        <FormGroup className={styles.locationFilter}>
          <FormControlLabel
            control={
              <Checkbox
                className={styles.filterBottomActions}
                checked={Burnaby}
                onChange={handleLocationFilter}
                name="Burnaby"
              />
            }
            label="Burnaby"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Richmond}
                onChange={handleLocationFilter}
                name="Richmond"
              />
            }
            label="Richmond"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Coquitlam}
                onChange={handleLocationFilter}
                name="Coquitlam"
              />
            }
            label="Coquitlam"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Vancouver}
                onChange={handleLocationFilter}
                name="Vancouver"
              />
            }
            label="Vancouver"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={Surrey}
                onChange={handleLocationFilter}
                name="Surrey"
              />
            }
            label="Surrey"
          />
        </FormGroup>
      </div>
      <div className={styles.filterStyling}>
        <div className={styles.filterTitles}>Followed</div>
        <FormGroup style={{ flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={followed}
                onChange={handleFollowedFilter}
                name="followed"
              />
            }
            label="followed"
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default PeopleFilter;
