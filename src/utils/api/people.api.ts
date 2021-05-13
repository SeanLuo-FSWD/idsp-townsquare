import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

import { DbHelper } from "./_dbHelper";

const toggleFollowing = (followUserId: string, cb: Function) => {
  axios
    .post(
      `${API_URL}/user/followUser`,
      { followingUserId: followUserId },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("toggleFollowing toggleFollowing response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getPeople error");
      console.log(error);
      cb(error);
    });
};

const getFollowingUsers = (cb: Function) => {
  axios
    .get(`${API_URL}/user/followingUsers`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("getFollowingUsers response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("getFollowingUsers error");
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
const getPeople = (peoplePg: any, cb: Function) => {
  console.log("getPeople no peoplePg peoplePg peoplePg");
  console.log(peoplePg);

  axios
    .post(`${API_URL}/people`, peoplePg, { withCredentials: true })
    .then((response) => {
      console.log("getPeople response");
      console.log(response.data);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getPeople error");
      console.log(error);
      cb(error);
    });
};

const getPerson = (id: string, cb: Function) => {
  axios
    .get(`${API_URL}/people/${id}`, { withCredentials: true })
    .then((response) => {
      console.log("get getPerson response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("getPerson error");
      console.log(error);
      cb(error);
    });
};

export {
  getPeople,
  getPerson,
  userFollow,
  getChatList,
  getChat,
  addChatMsg,
  getFollowingUsers,
  toggleFollowing,
};
