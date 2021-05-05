import axios from "axios";
import MOCK_URL from "../../constants/mock_server_url";
import { users, posts } from "../../FakeDb/FakeDb";
import _ from "lodash";

const fetchPeople = (cb: Function) => {
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

  cb(null, users);
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
    console.log("ddddddddddddddddddddddd");
    console.log(users[i].id);
    console.log("ddddddddddddddddddddddd");
    console.log(id);
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
