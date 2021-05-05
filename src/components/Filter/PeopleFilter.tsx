import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { LoginContext } from "../../store/context/LoginContext";
import { postFilterSubmit } from "../../utils/api/posts.api";

function PeopleFilter({ peopleFilterProps }: any) {
  const { showModal, setModalProps, setShowModal, setCerror } = useContext(
    LoginContext
  );

  useEffect(() => {
    peopleFilterProps(peopleFilter);
  });
  const [location, setLocation] = useState({
    Burnaby: false,
    Richmond: false,
    Coquitlam: false,
    Vancouver: false,
    Surrey: false,
  }) as any;

  const [peopleFilter, setPeopleFilter] = useState({});

  const [gender, setGender] = React.useState({
    female: false,
    male: false,
    other: false,
  });

  const { female, male, other } = gender;
  const { Burnaby, Richmond, Coquitlam, Vancouver, Surrey } = location;

  const handleGenderFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const gender_obj = { ...gender, [event.target.name]: event.target.checked };
    setGender(gender_obj);
    setPeopleFilter({ ...peopleFilter, ["gender"]: gender_obj });
  };

  const handleLocationFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const loc_obj = { ...location, [event.target.name]: event.target.checked };
    setLocation(loc_obj);
    setPeopleFilter({ ...peopleFilter, ["location"]: loc_obj });
  };

  const [age, setAge] = React.useState<number[]>([20, 37]);

  const handleAgeChange = (event: any, newValue: number | number[]) => {
    setAge(newValue as number[]);
    setPeopleFilter({ ...peopleFilter, ["age"]: newValue });
  };

  return (
    <div>
      <div className="flex">
        <h3>age</h3>
        <button
          onClick={() => {
            console.log(age);
          }}
        >
          Onclick
        </button>
        <h4>Min age: {age[0]}</h4>
        <h4>Max age: {age[1]}</h4>
        <Slider
          value={age}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
      </div>
      <div className="flex">
        <h3>gender</h3>
        <button
          onClick={() => {
            console.log(gender);
          }}
        >
          Onclick
        </button>

        <FormGroup style={{ flexDirection: "row" }}>
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
      <div className="flex">
        <h3>location</h3>
        <button
          onClick={() => {
            console.log(location);
          }}
        >
          Onclick
        </button>
        <FormGroup style={{ flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
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
    </div>
  );
}

export default PeopleFilter;
