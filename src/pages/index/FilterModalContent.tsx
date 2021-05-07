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
  doFilterUpdate,
  doFilterRemove,
} from "../../store/redux/actions/filter_act";
import { connect } from "react-redux";
import FeedFilterModalContent from "./FeedFilterModalContent";

function FilterModalContent(props: any) {
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
    const filter_obj = {
      feedFilter: feedFilter,
      peopleFilter: peopleFilter,
    };

    console.log("444444444444444444");
    console.log(filter_obj);
    props.onFilterSubmit(filter_obj);

    setModalProps(null);
    setShowModal("");

    // postFilterSubmit(filter_obj, (err: Error, result: any) => {
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
    <>
      <FeedFilterModalContent
        peopleFilterProps={peopleFilterProps}
        feedFilterProps={feedFilterProps}
        onFilterSubmit={props.onFilterSubmit}
      />
    </>
  );
}

// export default FilterModalContent;
const mapStateToProps = (state: any) => {
  return {
    //   mstpFilter: state.filterState.feed,
    mstpFilter: state.filterState,
    error: state.filterState.error,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onFilterSubmit: (filter_obj: any) => dispatch(doFilterUpdate(filter_obj)),

    onFilterRemove: () => dispatch(doFilterRemove()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModalContent);
