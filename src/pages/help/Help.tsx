import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import SubNav from "../../components/Navbar/SubNav";
import { useHistory } from "react-router-dom";
import styles from "./Help.module.scss";
import backArrow from "./assets/backArrow.svg";

function Help() {
  const history = useHistory();

  return (
    <div>
      <Navbar currentPath={window.location.pathname} />
      <SubNav className="flex--space-between">
        <img
          src={backArrow}
          onClick={() => {
            history.goBack();
          }}
        />
      </SubNav>
      <div className={styles.helpContainer}>
      <h2 style={{ marginTop: "60px" }}>Terms of use :</h2>
      <p>
        Please do not spam or post massive amounts of pictures(20+), as our
        server is hosted on a free tier!
      </p>

      <h2>FAQ/HELP :</h2>
      <h3>Filters</h3>
      <h4>How does the basic filter works?</h4>
      <p>The filter allows you to filter for desired posts or users. </p>
      <p>
        For posts, you can filter by "matching keywords" (case insensitive and
        can accept multiple words), or by whether the post has images
      </p>
      <p>
        For users you can filter by location, gender, age, and whether you
        followed them.
      </p>

      <h4>What are cross-filters ?</h4>
      <p>
        You can apply users criteria to posts, and vice versa. The cross-filter
        criteria are shown below the main criteria.
      </p>

      <p>
        - If you are on the post-feed page, applying USER criteria will only
        show posts FROM users having the matched criteria.
      </p>
      <p>
        - If you are on the users page, applying POST criteria will only show
        users who HAVE MADE the posts having the matched criteria.
      </p>

      <h4>Can I mix and match the filters?</h4>
      <p>
        You can definitely apply more than 1 criteria on the filter. In this
        case, only the posts/users/ that satisfies all the criteria will be
        shown.
      </p>

      <h4>Can I apply the post filter to the users page, and vice versa?</h4>

      <p>
        Yes, if you check box the "", then the criteria will be apply to the
        other page (ie, to the users page if you are on posts page).
      </p>
      <p>
        Once you navigate to the other page, you will see the criteria already
        applied.
      </p>

      <h3>How do I see the "followed" users?</h3>
      <p>
        As we are an "open world" app, by default you will see everything. To
        see only the users you followed, use the filter, and check the
        "followed" box.
      </p>

      <h3>Why am I seeing empty chats?</h3>

      <p>
        Everytime someone click into chat with you or if you click into chat
        with someone, a new chat is created and will show up on both you and the
        other person's chatlist. This is not a bug, but a feature!
      </p>
      <h3>Can I remove my profile?</h3>
      <p>
        No. Unfortunately we haven't had the time to implement that feature. If
        you are worried about your data, see "Privacy policy" section below.
      </p>

      <h3>Can I remove my comment?</h3>
      <p>
        No. Unfortunately we haven't had the time to implement that feature. So
        don't write comment you may regret about!
      </p>

      <h3>Why do I see only 20 posts?</h3>
      <p>
        We limit to only the 20 most recents posts, to avoid request overload.
      </p>
      <p>
        To see older/other posts that interest you, please use the filter
        feature, which will return another 20 recent posts by matching criteria.
      </p>

      <h3>Additional help</h3>
      <p>For anything else, please see our instruction on "link"</p>
      <p>Or you can ask Alex, Johnny or Sean on demo day via Discord. </p>

      <h2>Privacy policy :</h2>
      <p style={{ paddingBottom: "50px" }}>
        We will not share your data (email, images, etc) with any third party.
        We will actually shut down the site and wipe out all contents (images,
        user data, etc) after Friday, May 28th.
      </p>
      </div>
      
    </div>
  );
}

export default Help;
