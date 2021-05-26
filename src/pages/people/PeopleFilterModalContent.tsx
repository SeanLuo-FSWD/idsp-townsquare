import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { LoginContext } from "../../store/context/LoginContext";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import {
  doPeopleFilterUpdate,
  doPeopleFilterRemove,
  doFeedFilterUpdate,
  doFeedFilterRemove,
} from "../../store/redux/actions/filter_act";
import styles from "./PeopleFilterModalContent.module.scss";

import { connect } from "react-redux";

function PeopleFilterModalContent(props: any) {
  const { showModal, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);

  // const [showFeedFilter, setShowFeedFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(props.peoplePg.feed);
  const [peopleFilter, setPeopleFilter] = useState(props.peoplePg.people);

  let feedFilterHolder = props.peoplePg.feed;
  let pplFilterHolder = props.peoplePg.people;
  let applyOtherSide = false;

  // const [hasSync, setHasSync] = React.useState(false);

  const handleHasSyncFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setHasSync(event.target.checked);
    applyOtherSide = event.target.checked;
    // feedFilterProps({ hasSync: event.target.checked });
  };

  const peopleFilterProps = (ppl_filter: any) => {
    const key_name_pair = Object.entries(ppl_filter)[0];

    setPeopleFilter({ ...peopleFilter, [key_name_pair[0]]: key_name_pair[1] });
    // pplFilterHolder = {
    //   ...pplFilterHolder,
    //   [key_name_pair[0]]: key_name_pair[1],
    // };
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({
      ...feedFilter,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const onPeopleFilterClick = () => {
    const peoplePgSlice = {
      peoplePg: {
        applied: true,
        people: peopleFilter,
        feed: feedFilter,
      },
    };

    props.onPeopleFilterSubmit(peoplePgSlice);

    if (applyOtherSide) {
      const feedPgSlice = {
        feedPg: {
          applied: true,
          people: peopleFilter,
          feed: feedFilter,
        },
      };
      props.onFeedFilterSubmit(feedPgSlice);
    }

    props.toggleFilterProp(false);
  };

  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }

  return (
    <div className={styles.mainFilterCard}>
      <div className={styles.filterInfo}>
        <p style={{ fontSize: "1.8em" }}>Main filter</p>
      </div>
      <PeopleFilter
        peopleFilterProps={peopleFilterProps}
        feedPg_People={props.peoplePg.people}
      />

      {/* <div className="flex">
        <p>
          Apply Feed filter to users (Will only show users who created matched
          posts)
        </p>
      </div> */}

      <div className={styles.filterInfo}>
        <p style={{ fontSize: "1.8em" }}>Post filter</p>
        <p style={{ marginBottom: "10px" }}>
          Filter users who created matching posts only
        </p>
      </div>

      <FeedFilter
        feedFilterProps={feedFilterProps}
        feedPg_Feed={props.peoplePg.feed}
      />

      <div className={styles.footerWrapper}>
        <button
          // className={styles.submitButton}
          style={{ marginRight: "10px" }}
          onClick={onPeopleFilterClick}
        >
          Submit
        </button>

        <FormControlLabel
          control={
            <Checkbox onChange={handleHasSyncFilter} name="Have_image" />
          }
          label="Also apply to User page"
        />

        <div style={{ marginLeft: "auto" }}>
          <button
            onClick={() => {
              props.onPeopleFilterRemove();
              props.toggleFilterProp(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* <div className="flex">
        <button onClick={onPeopleFilterClick}>Submit</button>
        <button
          onClick={() => {
            props.onPeopleFilterRemove();
            props.toggleFilterProp(false);
          }}
        >
          Cancel
        </button>
        <FormControlLabel
          control={
            <Checkbox onChange={handleHasSyncFilter} name="Have_image" />
          }
          label="Apply to Feed page"
        />
      </div> */}
    </div>
  );
}

// export default FeedFilterModalContent;
const mapStateToProps = (state: any) => {
  return {
    peoplePg: state.filterState.peoplePg,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onPeopleFilterSubmit: (peoplePgSlice: any) =>
      dispatch(doPeopleFilterUpdate(peoplePgSlice)),
    onFeedFilterSubmit: (feedPgSlice: any) =>
      dispatch(doFeedFilterUpdate(feedPgSlice)),
    onPeopleFilterRemove: () => dispatch(doPeopleFilterRemove()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleFilterModalContent);
