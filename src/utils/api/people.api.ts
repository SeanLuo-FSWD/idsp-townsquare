import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

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
      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
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
      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
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
      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
    });
};

const getAllConversationsByUserId = (cb: Function) => {
  axios
    .get(`${API_URL}/conversation/`, {
      withCredentials: true,
    })
    .then((response) => {
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getAllConversationsByUserId error");
      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
    });
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
      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
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
      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
    });
};

export {
  getPeople,
  getPerson,
  getAllConversationsByUserId,
  getFollowingUsers,
  toggleFollowing,
  addPersonGroup,
};
