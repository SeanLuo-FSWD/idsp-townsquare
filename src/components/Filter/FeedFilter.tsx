import React, { useState } from "react";
import styles from "./SubNav.module.scss";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function FeedFilter({ feedFilterProps, feedFilterSaved }: any) {
  const default_kw = feedFilterSaved.keywords ? feedFilterSaved.keywords : [];
  const default_hasImg = feedFilterSaved.hasImg
    ? feedFilterSaved.hasImg
    : false;
  const [keywords, setKeywords] = useState(default_kw) as any;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kwArray = e.target.value.split(" ");
    setKeywords(kwArray);
    feedFilterProps({ keywords: kwArray });
  };
  const [hasImg, setHasImg] = React.useState(default_hasImg);
  const handleHasImgFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasImg(event.target.checked);
    feedFilterProps({ hasImg: event.target.checked });
  };

  console.log("xxxxxxxxxxxxxxxxxxxxxx");
  console.log("xxxxxxxxxxxxxxxxxxxxxx");
  console.log(feedFilterSaved);

  return (
    <div>
      <div>
        <label htmlFor="site-search">Filter posts by keyword</label>
        <input
          type="search"
          id="site-search"
          name="keyword"
          value={keywords.join(" ")}
          aria-label="Separate search keyword by a space"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Has images</label>

        <FormControlLabel
          control={
            <Checkbox
              checked={hasImg}
              onChange={handleHasImgFilter}
              name="Have_image"
            />
          }
          label=""
        />
      </div>
    </div>
  );
}

export default FeedFilter;
