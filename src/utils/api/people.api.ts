import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

import { DbHelper } from "./_dbHelper";

const addPersonGroup = (submitObj: string[], cb: Function) => {
  axios
    .post(
      `${API_URL}/user/addGroup`,
      { personGroupsObj: submitObj },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("addPersonGroup addPersonGroup response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("addPersonGroup error");
      console.log(error);
      cb(error.response.data.message);
    });
};

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
      cb(error.response.data.message);
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

const getAllConversationsByUserId = (cb: Function) => {
  axios
    .get(`${API_URL}/conversation`, {
      withCredentials: true,
    })
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getAllConversationsByUserId error");
      cb(null, error.response.data.message);
    });
};

const userFollow = (userId: string, follow: boolean, cb: Function) => {
  cb(null, 200);
};
const getPeople = (peoplePg: any, cb: Function) => {
  axios
    .post(`${API_URL}/people`, peoplePg, { withCredentials: true })
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getPeople error");
      console.log(error);
      cb(error.response.data.message);
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
      cb(error.response.data.message);
    });
};

export {
  getPeople,
  getPerson,
  userFollow,
  getAllConversationsByUserId,
  getChat,
  addChatMsg,
  getFollowingUsers,
  toggleFollowing,
  addPersonGroup,
};
