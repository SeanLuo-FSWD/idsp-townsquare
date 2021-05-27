import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import styles from "./PeopleFilter.module.scss";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

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

  const muiTheme = createMuiTheme({
    overrides:{
      MuiSlider: {
        thumb:{
          color: "#b4315b",
        },
        track: {
          color: "#b4315b",
        },
        rail: {
          color: "#b4315b",
          width: "100%",
        }
      }
    }
  });

  const genderOptions = [
    { tag: 'female', value: female }, 
    { tag: 'male', value: male }, 
    { tag: 'other', value: other }
  ].map(genderOption => (
    <FormControlLabel
      control={
        <Checkbox
          checked={genderOption.value}
          onChange={handleGenderFilter}
          name={genderOption.tag}
          style ={{
            color: "#b4315b",
          }}
        />
      }
      label={genderOption.tag} />
  ));

  const cityOptions = [
    { tag: 'Burnaby', value: Burnaby }, 
    { tag: 'Richmond', value: Richmond }, 
    { tag: 'Coquitlam', value: Coquitlam },
    { tag: 'Vancouver', value: Vancouver },
    { tag: 'Surrey', value: Surrey }
  ].map(cityOption => (
    <FormControlLabel
      control={
        <Checkbox
          checked={cityOption.value}
          onChange={handleLocationFilter}
          name={cityOption.tag}
          style ={{
            color: "#b4315b",
          }}
        />
      }
      label={cityOption.tag}
    />
  ))


  return (
    <div className={styles.peopleFilterContainer}>
      <div className={styles.filterStyling}>
        <h3 className={styles.filterTitle}>
          Age
          <span>
            <div className={styles.ageIndicator}>{age[0]} to {age[1]}</div>
          </span>
        </h3>
        <ThemeProvider theme={muiTheme}>
          <Slider
              value={age}
              onChange={handleAgeFilter}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              color="secondary"
            />
        </ThemeProvider>
          
      </div>
      <div className={styles.filterStyling}>
        <h3 className={styles.filterTitle}>gender</h3>
        <FormGroup className={styles.filter}>
          {genderOptions}
        </FormGroup> 
      </div>
      <div className={styles.filterStyling}>
        <h3 className={styles.filterTitle}>Location</h3>
        <FormGroup className={styles.filter}>
          {cityOptions}
        </FormGroup>
      </div>
      <div className={styles.filterStyling}>
        <h3 className={styles.filterTitle}>Others</h3>
        <FormGroup className={styles.filter}>
          <FormControlLabel
            control={
              <Checkbox
                checked={followed}
                onChange={handleFollowedFilter}
                name="followed"
                style ={{
                  color: "#b4315b",
                }}
              />
            }
            label="Users you are following"
          />
        </FormGroup>
      </div>
    </div>
  );
}

export default PeopleFilter;
