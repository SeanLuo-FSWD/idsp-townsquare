import React, { useState } from "react";
import styles from "./SubNav.module.scss";

function FeedFilter({ feedFilterProps }: any) {
  const [keywords, setKeywords] = useState([]) as any;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const kwArray = e.target.value.split(" ");
    setKeywords(kwArray);
    feedFilterProps(kwArray);
  };
  return (
    <div>
      <div>
        <label htmlFor="site-search">Filter posts by keyword</label>
        <input
          type="search"
          id="site-search"
          name="keyword"
          aria-label="Separate search keyword by a space"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

export default FeedFilter;
