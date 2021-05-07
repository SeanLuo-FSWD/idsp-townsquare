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
  doFeedFilterUpdate,
  doFeedFilterRemove,
} from "../../store/redux/actions/filter_act";
import { connect } from "react-redux";

function PeopleFilterModalContent(props: any) {
  const { showModal, setModalProps, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const [showFeedFilter, setShowFeedFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(props.feedPg.feed);
  const [peopleFilter, setPeopleFilter] = useState(props.feedPg.people);

  const peopleFilterProps = (ppl_filter: any) => {
    // setPeopleFilter(ppl_filter);
    const key_name_pair = Object.entries(ppl_filter)[0];
    // setPeopleFilter({ ...peopleFilter, [key_name_pair[0]]: key_name_pair[1] });

    setPeopleFilter({
      ...props.feedPg.people,
      [key_name_pair[0]]: key_name_pair[1],
    });
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({
      ...props.feedPg.feed,
      [key_name_pair[0]]: key_name_pair[1],
    });
    // setFeedFilter({
    //   ...props.feedPg,
    //   feed: {
    //     ...props.feedPg.feed,
    //     [key_name_pair[0]]: key_name_pair[1],
    //   },
    // });
  };

  const onPeopleFilterClick = () => {
    // const f_filter_obj = {
    //   feedFilter: feedFilter,
    //   peopleFilter: peopleFilter,
    // };

    console.log("444444444444444444");
    console.log("444444444444444444");

    console.log(feedFilter);
    console.log(peopleFilter);

    const feedPgSlice = {
      feedPg: {
        applied: true,
        people: peopleFilter,
        feed: feedFilter,
      },
    };

    console.log(feedPgSlice);
    props.onFeedFilterSubmit(feedPgSlice);

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
        feedPg_People={props.feedPg.people}
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
          // feedFilterSaved={props.feedPg ? props.feedPg.feedFilter : {}}
          feedPg_Feed={props.feedPg.feed}
        />
      )}

      <div className="flex">
        <button onClick={onPeopleFilterClick}>Submit</button>
        <button
          onClick={() => {
            setModalProps(null);
            setShowModal("");
            props.onFeedFilterRemove();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// export default FeedFilterModalContent;
const mapStateToProps = (state: any) => {
  console.log("zzzzzzzzzzzzzzzzzzzzzzz");
  console.log("zzzzzzzzzzzzzzzzzzzzzzz");
  console.log("zzzzzzzzzzzzzzzzzzzzzzz");
  console.log(state.filterState.feedPg);

  return {
    feedPg: state.filterState.feedPg,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFeedFilterSubmit: (feedPgSlice: any) =>
      dispatch(doFeedFilterUpdate(feedPgSlice)),

    onFeedFilterRemove: () => dispatch(doFeedFilterRemove()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PeopleFilterModalContent);
