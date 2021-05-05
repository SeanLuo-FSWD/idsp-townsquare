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

function FeedFilterModalContent({ filterPostProp }: any) {
  const { showModal, setModalProps, setShowModal, setCerror } = useContext(
    LoginContext
  );

  const [showPeopleFilter, setShowPeopleFilter] = useState(false);
  const [feedFilter, setFeedFilter] = useState({});
  const [peopleFilter, setPeopleFilter] = useState(null);

  const peopleFilterProps = (ppl_filter: any) => {
    setPeopleFilter(ppl_filter);
  };

  const feedFilterProps = (post_filter: any) => {
    setFeedFilter({ keywords: post_filter });
  };

  const onPostFilterSubmit = () => {
    console.log("fffffffffffffffffffffff");
    console.log(peopleFilter);
    console.log(feedFilter);

    const filter_obj = {
      feedFilter: feedFilter,
      peopleFilter: peopleFilter,
    };

    postFilterSubmit(filter_obj, (err: Error, result: any) => {
      if (err) {
        setCerror(err.message);
      } else {
        filterPostProp(result);
      }
    });
  };

  return (
    <div>
      <FeedFilter feedFilterProps={feedFilterProps} />

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
        <PeopleFilter peopleFilterProps={peopleFilterProps} />
      )}

      <div className="flex">
        <button onClick={onPostFilterSubmit}>Submit</button>
        <button
          onClick={() => {
            setModalProps(null);
            setShowModal("");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// export default FeedFilterModalContent;

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(FeedFilterModalContent);
