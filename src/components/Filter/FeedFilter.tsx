import React, { useState } from "react";
import styles from "./FeedFilter.module.scss";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

function FeedFilter({ feedFilterProps, feedPg_Feed }: any) {
  const [keywords, setKeywords] = useState(feedPg_Feed.keywords) as any;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kwArray = e.target.value.split(" ");
    setKeywords(kwArray);
    feedFilterProps({ keywords: kwArray });
  };
  const [hasImg, setHasImg] = React.useState(feedPg_Feed.hasImg);
  const handleHasImgFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasImg(event.target.checked);
    feedFilterProps({ hasImg: event.target.checked });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterStyling}>
        {/* <label htmlFor="site-search">Filter posts by keyword</label> */}
        <div className={styles.filterTitles}>Matching keyword(s)</div>
        <input
          className={styles.keywordSearch}
          type="search"
          id="site-search"
          name="keyword"
          value={keywords.join(" ")}
          aria-label="Separate search keyword by a space"
          onChange={handleChange}
        />
      </div>
      <div className={styles.filterStyling}>
        <div className={styles.filterTitles}>With images</div>

        {/* <label>Has images</label> */}

        <FormControlLabel
          style={{ float: "left" }}
          control={
            <Checkbox
              checked={hasImg}
              onChange={handleHasImgFilter}
              name="Have_image"
            />
          }
          label="Only posts with images"
        />
      </div>
    </div>
  );
}

export default FeedFilter;
