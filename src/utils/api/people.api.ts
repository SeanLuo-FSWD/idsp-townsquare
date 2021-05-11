import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

import { DbHelper } from "./_dbHelper";

const getFollowed = (cb: Function) => {
  axios
    .get(`${API_URL}/user/followingUsers`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("getFollowed response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("getFollowed error");
      cb(null, error.response.data.message);
    });
};
const addChatMsg = (msgObj: any, cb: Function) => {
  if (msgObj) {
    const msg_res = {
      id: uuidv4(),
      userId: msgObj.authorId,
      timeStamp: new Date().toString(),
      text: msgObj.message,
    };
    cb(null, msg_res);
  } else {
    cb(new Error("msg not sent"));
  }
};
const getChat = (chatId: string, cb: Function) => {
  const chat = db.chats.filter((c) => c.id === chatId);
  cb(null, chat);
};

const getChatList = (userId: string, cb: Function) => {
  const cuser = db.users.filter((u) => u.id === userId);
  const chats = db.chats.filter((c) => cuser[0].chats.includes(c.id));

  cb(null, chats);
};

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
  axios
    .get(`${API_URL}/ts/person/${id}`)
    .then((response) => {
      console.log("get fetchPerson response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("fetchPerson error");
      console.log(error);
      cb(error);
    });
};

export {
  fetchPeople,
  fetchPerson,
  userFollow,
  getChatList,
  getChat,
  addChatMsg,
  getFollowed,
};
