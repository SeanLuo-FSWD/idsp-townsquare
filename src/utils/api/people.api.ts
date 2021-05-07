import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { users, posts } from "../../FakeDb/FakeDb";
import _ from "lodash";

import { DbHelper } from "./_dbHelper";

const fetchPeople = (peoplePg: any, cb: Function) => {
  // axios
  //   .get(`${MOCK_URL}/ts/allusers`)
  //   .then((response) => {
  //     console.log("get fetchPeople response");
  //     console.log(response);
  //     cb(null, response);
  //   })
  //   .catch((error) => {
  //     console.log("fetchPeople error");
  //     console.log(error);
  //     cb(error);
  //   });
  console.log("sssssssssssssssssssssssss");
  console.log("sssssssssssssssssssssssss");
  console.log(peoplePg);

  if (!peoplePg.applied) {
    cb(null, users);
  }

  let db_helper = new DbHelper(peoplePg);

  let feed_filter_posts = db_helper.getPostFromPost();

  let desired_users: any[] = [];

  console.log("vvvvvvvvvvvvvvvvvvv");
  console.log("vvvvvvvvvvvvvvvvvvv");
  console.log(feed_filter_posts);
  if (peoplePg.feed.keywords.length != 0 || peoplePg.feed.hasImg) {
    for (let i = 0; i < feed_filter_posts.length; i++) {
      for (let j = 0; j < users.length; j++) {
        if (feed_filter_posts[i].userId === users[j].id) {
          desired_users.push(users[j]);
        }
      }
    }
  } else {
    desired_users = users;
  }

  console.log("55555555555555555");
  console.log("55555555555555555");
  console.log(desired_users);

  desired_users = desired_users.filter((u) => {
    return db_helper.checkPersonFromPerson(u);
  });

  console.log("3333333333333333");
  console.log("3333333333333333");
  console.log(desired_users);

  cb(null, desired_users);
};

const fetchPerson = (id: string, cb: Function) => {
  // axios
  //   .get(`${MOCK_URL}/ts/person/${id}`)
  //   .then((response) => {
  //     console.log("get fetchPerson response");
  //     console.log(response);
  //     cb(null, response);
  //   })
  //   .catch((error) => {
  //     console.log("fetchPerson error");
  //     console.log(error);
  //     cb(error);
  //   });
  let profile_obj;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      profile_obj = users[i] as any;
      profile_obj["feed"] = _.filter(posts, (w) => w.userId == id);
    }
  }

  if (profile_obj) {
    cb(null, profile_obj);
  } else {
    cb(new Error("no user exist"));
  }
};

export { fetchPeople, fetchPerson };
