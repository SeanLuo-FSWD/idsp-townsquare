import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import styles from "./FeedFilterModalContent.module.scss"
import { LoginContext } from "../../store/context/LoginContext";
import { postFilterSubmit } from "../../utils/api/posts.api";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import {
  doFeedFilterUpdate,
  doFeedFilterRemove,
  doPeopleFilterUpdate,
  doPeopleFilterRemove,
} from "../../store/redux/actions/filter_act";
import { connect } from "react-redux";

function FeedFilterModalContent(props: any) {
  const { showModal, setModalProps, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const [showPeopleFilter, setShowPeopleFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(props.feedPg.feed);
  const [peopleFilter, setPeopleFilter] = useState(props.feedPg.people);

  let feedFilterHolder = props.feedPg.feed;
  let pplFilterHolder = props.feedPg.people;

  // useEffect(() => {
  //   console.log("useEffect: should NOT happen");
  // });

  // const [hasSync, setHasSync] = React.useState(props.feedPg.applyOtherPg);
  // const [hasSync, setHasSync] = React.useState(false);
  let applyOtherSide = false;
  const handleHasSyncFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setHasSync(event.target.checked);
    applyOtherSide = event.target.checked;
    // feedFilterProps({ hasSync: event.target.checked });
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
    // feedFilterHolder = {
    //   ...feedFilterHolder,
    //   [key_name_pair[0]]: key_name_pair[1],
    // };
    setFeedFilter({
      ...feedFilter,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const onFeedFilterClick = () => {
    // console.log("3333333333333333");
    // console.log("onFeedFilterClick");

    const feedPgSlice = {
      feedPg: {
        applied: true,
        people: peopleFilter,
        // people: pplFilterHolder,
        feed: feedFilter,
        // feed: feedFilterHolder,
      },
    };

    props.onFeedFilterSubmit(feedPgSlice);

    if (applyOtherSide) {
      const peoplePgSlice = {
        peoplePg: {
          applied: true,
          people: peopleFilter,
          // people: pplFilterHolder,
          feed: feedFilter,
          // feed: feedFilterHolder,
        },
      };
      props.onPeopleFilterSubmit(peoplePgSlice);
    }

    // setModalProps(null);
    setShowModal("");
  };

  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }

  return (
    <div className={styles.mainFilterCard}>
      <FeedFilter
        feedFilterProps={feedFilterProps}
        feedPg_Feed={props.feedPg.feed}
      />

      <div className={styles.filterInfo}>
        {/* {showPeopleFilter ? (
          <button onClick={() => setShowPeopleFilter(false)}>
            Hide User Filter
          </button>
        ) : (
          <button onClick={() => setShowPeopleFilter(true)}>
            Show User Filter
          </button>
        )} */}
        <div className={styles.filterInfo}>
          Apply user filter to posts (Will show posts from matching users only)
        </div>
      </div>

      {/* {showPeopleFilter && (
        <PeopleFilter
          peopleFilterProps={peopleFilterProps}
          feedPg_People={props.feedPg.people}
        />
      )} */}

      <PeopleFilter
        peopleFilterProps={peopleFilterProps}
        feedPg_People={props.feedPg.people}
      />

      <div className="flex">
        <button onClick={onFeedFilterClick}>Submit</button>
        <button
          onClick={() => {
            // setModalProps(null);
            setShowModal("");
            props.onFeedFilterRemove();
          }}
        >
          Cancel
        </button>
        <FormControlLabel
          control={
            <Checkbox
              // checked={hasSync}
              onChange={handleHasSyncFilter}
              name="Have_image"
            />
          }
          label="Apply to User page"
        />
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
