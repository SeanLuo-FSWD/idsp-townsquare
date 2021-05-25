import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import styles from "./FeedFilterModalContent.module.scss";
import { LoginContext } from "../../store/context/LoginContext";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doPeopleFilterUpdate,
} from "../../store/redux/actions/filter_act";
import { connect } from "react-redux";

function FeedFilterModalContent(props: any) {
  const { setCerror } = useContext(LoginContext);

  const [feedFilter, setFeedFilter] = useState(props.feedPg.feed);
  const [peopleFilter, setPeopleFilter] = useState(props.feedPg.people);

  let pplFilterHolder = props.feedPg.people;

  let applyOtherSide = false;
  const handleHasSyncFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    applyOtherSide = event.target.checked;
  };

  const peopleFilterProps = (ppl_filter: any) => {
    const key_name_pair = Object.entries(ppl_filter)[0];
    setPeopleFilter({ ...peopleFilter, [key_name_pair[0]]: key_name_pair[1] });
    pplFilterHolder = {
      ...pplFilterHolder,
      [key_name_pair[0]]: key_name_pair[1],
    };
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({
      ...feedFilter,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const onFeedFilterClick = () => {
    const feedPgSlice = {
      feedPg: {
        applied: true,
        people: peopleFilter,
        feed: feedFilter,
      },
    };

    props.onFeedFilterSubmit(feedPgSlice);

    if (applyOtherSide) {
      const peoplePgSlice = {
        peoplePg: {
          applied: true,
          people: peopleFilter,
          feed: feedFilter,
        },
      };
      props.onPeopleFilterSubmit(peoplePgSlice);
    }

    props.toggleFilterProp(false);
  };

  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }

  return (
    <div>
      <div className={styles.filterInfo}>
        <p style={{ fontSize: "1.8em" }}>Main filter</p>
      </div>
      <FeedFilter
        feedFilterProps={feedFilterProps}
        feedPg_Feed={props.feedPg.feed}
      />

      <div className={styles.filterInfo}>
        <p style={{ fontSize: "1.8em" }}>User filter</p>
        <p style={{ marginBottom: "10px" }}>
          Filter posts from matching users only
        </p>
      </div>

      <PeopleFilter
        peopleFilterProps={peopleFilterProps}
        feedPg_People={props.feedPg.people}
      />

      <div className={styles.footerWrapper}>
        <button
          // className={styles.submitButton}
          style={{ marginRight: "10px" }}
          onClick={onFeedFilterClick}
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
              props.onFeedFilterRemove();
              props.toggleFilterProp(false);
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

// export default FeedFilterModalContent;
const mapStateToProps = (state: any) => {
  return {
    feedPg: state.filterState.feedPg,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFeedFilterSubmit: (feedPgSlice: any) =>
      dispatch(doFeedFilterUpdate(feedPgSlice)),
    onPeopleFilterSubmit: (peoplePgSlice: any) =>
      dispatch(doPeopleFilterUpdate(peoplePgSlice)),
    onFeedFilterRemove: () => dispatch(doFeedFilterRemove()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedFilterModalContent);
