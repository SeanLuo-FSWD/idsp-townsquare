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
  const placeholder = "Enter something!";

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterStyling}>
        <h3 className={styles.filterTitle}>Keyword</h3>
        <input
          placeholder={placeholder}
          className={styles.keywordSearch}
          type="search"
          id="site-search"
          name="keyword"
          value={keywords.join(" ")}
          aria-label="Separate search keyword by a space"
          onChange={handleChange}
        />
      </div>
        <FormControlLabel
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
  );
}

export default FeedFilter;
