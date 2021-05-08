import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";

import { DbHelper } from "./_dbHelper";

const userFollow = (userId: string, follow: boolean, cb: Function) => {
  cb(null, 200);
};
const fetchPeople = (peoplePg: any, cUser: any, cb: Function) => {
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

  if (!peoplePg.applied) {
    cb(null, db.users);
  }

  let db_helper = new DbHelper(peoplePg, cUser);

  let feed_filter_posts = db_helper.getPostFromPost();

  let desired_users: any[] = [];

  if (peoplePg.feed.keywords.length != 0 || peoplePg.feed.hasImg) {
    for (let i = 0; i < feed_filter_posts.length; i++) {
      for (let j = 0; j < db.users.length; j++) {
        if (feed_filter_posts[i].userId === db.users[j].id) {
          desired_users.push(db.users[j]);
        }
      }
    }
  } else {
    desired_users = db.users;
  }

  desired_users = desired_users.filter((u) => {
    return db_helper.checkPersonFromPerson(u);
  });

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

  for (let i = 0; i < db.users.length; i++) {
    if (db.users[i].id == id) {
      profile_obj = db.users[i] as any;
      profile_obj["feed"] = _.filter(db.posts, (w) => w.userId == id);
    }
  }

  if (profile_obj) {
    cb(null, profile_obj);
  } else {
    cb(new Error("no user exist"));
  }
};

export { fetchPeople, fetchPerson, userFollow };
