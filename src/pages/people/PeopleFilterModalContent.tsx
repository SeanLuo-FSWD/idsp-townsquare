import React, { useState, useEffect, useContext } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Slider from "@material-ui/core/Slider";
import { LoginContext } from "../../store/context/LoginContext";
import { postFilterSubmit } from "../../utils/api/posts.api";
import PeopleFilter from "../../components/Filter/PeopleFilter";
import FeedFilter from "../../components/Filter/FeedFilter";
import {
  doPeopleFilterUpdate,
  doPeopleFilterRemove,
  doFeedFilterUpdate,
  doFeedFilterRemove,
} from "../../store/redux/actions/filter_act";
import { connect } from "react-redux";

function PeopleFilterModalContent(props: any) {
  const { showModal, setModalProps, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const [showFeedFilter, setShowFeedFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(props.peoplePg.feed);
  const [peopleFilter, setPeopleFilter] = useState(props.peoplePg.people);

  const [hasSync, setHasSync] = React.useState(props.peoplePg.applyOtherPg);

  const handleHasSyncFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasSync(event.target.checked);
    feedFilterProps({ hasSync: event.target.checked });
  };

  const peopleFilterProps = (ppl_filter: any) => {
    const key_name_pair = Object.entries(ppl_filter)[0];

    setPeopleFilter({
      ...props.peoplePg.people,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({
      ...props.peoplePg.feed,
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

    console.log(peoplePgSlice);
    props.onPeopleFilterSubmit(peoplePgSlice);

    console.log("ddddddddddddddddddddddd");
    console.log("ddddddddddddddddddddddd");
    console.log(hasSync);

    // if (hasSync) {
    //   props.onFeedFilterSubmit(peoplePgSlice);
    // }

    setModalProps(null);
    setShowModal("");
  };

  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }

  return (
    <div>
      <PeopleFilter
        peopleFilterProps={peopleFilterProps}
        feedPg_People={props.peoplePg.people}
      />

      <div className="flex">
        {showFeedFilter ? (
          <button onClick={() => setShowFeedFilter(false)}>
            Hide Feed Filter
          </button>
        ) : (
          <button onClick={() => setShowFeedFilter(true)}>
            Show Feed Filter
          </button>
        )}
        <p>
          Apply Feed filter to users (Will only show users who created matched
          posts)
        </p>
      </div>

      {showFeedFilter && (
        <FeedFilter
          feedFilterProps={feedFilterProps}
          feedPg_Feed={props.peoplePg.feed}
        />
      )}

      <div className="flex">
        <button onClick={onPeopleFilterClick}>Submit</button>
        <button
          onClick={() => {
            setModalProps(null);
            setShowModal("");
            props.onPeopleFilterRemove();
          }}
        >
          Cancel
        </button>
        <FormControlLabel
          control={
            <Checkbox
              checked={hasSync}
              onChange={handleHasSyncFilter}
              name="Have_image"
            />
          }
          label="Apply to Feed page"
        />
      </div>
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
