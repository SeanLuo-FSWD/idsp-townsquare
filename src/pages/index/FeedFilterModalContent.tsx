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

function FeedFilterModalContent(props: any) {
  const { showModal, setModalProps, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const [showPeopleFilter, setShowPeopleFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState({});
  const [peopleFilter, setPeopleFilter] = useState({});

  const peopleFilterProps = (ppl_filter: any) => {
    // setPeopleFilter(ppl_filter);
    const key_name_pair = Object.entries(ppl_filter)[0];
    setPeopleFilter({ ...peopleFilter, [key_name_pair[0]]: key_name_pair[1] });
  };

  const feedFilterProps = (post_filter: Object) => {
    const key_name_pair = Object.entries(post_filter)[0];
    setFeedFilter({ ...feedFilter, [key_name_pair[0]]: key_name_pair[1] });

    // setFeedFilter({ keywords: post_filter });
  };

  const onFeedFilterClick = () => {
    const f_filter_obj = {
      feedFilter: feedFilter,
      peopleFilter: peopleFilter,
    };

    props.onFeedFilterSubmit(f_filter_obj);

    setModalProps(null);
    setShowModal("");

    // postFilterSubmit(f_filter_obj, (err: Error, result: any) => {
    //   if (err) {
    //     setCerror(err.message);
    //   } else {
    //     props.filterPostProp(result);
    //   }
    // });
  };

  if (props.error) {
    setCerror(props.error.message);
    return <></>;
  }

  return (
    <div>
      <FeedFilter
        feedFilterProps={feedFilterProps}
        feedFilterSaved={props.mstpFilter ? props.mstpFilter.feedFilter : {}}
      />

      <div className="flex">
        {showPeopleFilter ? (
          <button onClick={() => setShowPeopleFilter(false)}>
            Hide User Filter
          </button>
        ) : (
          <button onClick={() => setShowPeopleFilter(true)}>
            Show User Filter
          </button>
        )}
        <p>
          Apply user filter to posts (Will show posts from matching users only)
        </p>
      </div>

      {showPeopleFilter && (
        <PeopleFilter
          peopleFilterProps={peopleFilterProps}
          peopleFilterSaved={
            props.mstpFilter ? props.mstpFilter.peopleFilter : {}
          }
        />
      )}

      <div className="flex">
        <button onClick={onFeedFilterClick}>Submit</button>
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
  return {
    mstpFilter: state.filterState.feed,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFeedFilterSubmit: (f_filter_obj: any) =>
      dispatch(doFeedFilterUpdate(f_filter_obj)),

    onFeedFilterRemove: () => dispatch(doFeedFilterRemove()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedFilterModalContent);
