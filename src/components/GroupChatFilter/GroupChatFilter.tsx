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
import { getPeople } from "../../utils/api/people.api";
import FILTER_INITIAL_STATE from "../../constants/filter_initial_state";
import UserDetail from "../Users/UserDetail";

function GroupChatFilter(props: any) {
  const { showModal, setModalProps, setShowModal, setCerror } =
    useContext(LoginContext);
  const [people, setPeople] = useState(null);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    setShowUsers(true);
  }, [people]);

  // const [showFeedFilter, setShowFeedFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState(
    FILTER_INITIAL_STATE.peoplePg.feed
  );
  const [peopleFilter, setPeopleFilter] = useState(
    FILTER_INITIAL_STATE.peoplePg.people
  );

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
    // feedFilterHolder = {
    //   ...feedFilterHolder,
    //   [key_name_pair[0]]: key_name_pair[1],
    // };
  };

  const onGroupFilterSubmit = () => {
    const peoplePgSlice = {
      applied: true,
      people: peopleFilter,
      feed: feedFilter,
    };

    getPeople(peoplePgSlice, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        setPeople(result);
      }
    });
  };

  // if (showUsers) {
  //     return (
  //       <UserDetail people={people}>
  //         {(person: any, onAddHandleProp: any) => {
  //           return (
  //             <DetailGroupChat
  //               person={person}
  //               onAddHandleProp={onAddHandleProp}
  //             />
  //           );
  //         }}
  //         </UserDetail>

  //     );
  // }
  return (
    <div>
      <PeopleFilter
        peopleFilterProps={peopleFilterProps}
        feedPg_People={FILTER_INITIAL_STATE.peoplePg.people}
      />

      <div className="flex">
        {/* {showFeedFilter ? (
          <button onClick={() => setShowFeedFilter(false)}>
            Hide Feed Filter
          </button>
        ) : (
          <button onClick={() => setShowFeedFilter(true)}>
            Show Feed Filter
          </button>
        )} */}
        <p>
          Apply Feed filter to users (Will only show users who created matched
          posts)
        </p>
      </div>
      {/* {showFeedFilter && (
        <FeedFilter
          feedFilterProps={feedFilterProps}
          feedPg_Feed={props.peoplePg.feed}
        />
      )} */}
      <FeedFilter
        feedFilterProps={feedFilterProps}
        feedPg_Feed={FILTER_INITIAL_STATE.peoplePg.feed}
      />
      <div className="flex">
        <button onClick={onGroupFilterSubmit}>Submit</button>
        <button
          onClick={() => {
            setModalProps(null);
            setShowModal("");
            props.onGroupFilterRemove();
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
    peoplePg: state.filterState.peoplePg,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onGroupFilterSubmit: (peoplePgSlice: any) =>
      dispatch(doPeopleFilterUpdate(peoplePgSlice)),
    onFeedFilterSubmit: (feedPgSlice: any) =>
      dispatch(doFeedFilterUpdate(feedPgSlice)),
    onGroupFilterRemove: () => dispatch(doPeopleFilterRemove()),
  };
};

// export default connect(null, mapDispatchToProps)(GroupChatFilter);

export default GroupChatFilter;
