import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import API_URL from "../../constants/api_url";
import { db } from "../../FakeDb/FakeDb";
// axios.defaults.withCredentials = true;

// const getNotice = (userId: string, cb: Function) => {
const getNotice = (cb: Function) => {
  axios
    // .get(`${API_URL}/notification?id=${userId}`, {
    .get(`${API_URL}/notification`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("getNotice response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getNotice error");
      cb(error.response.data.message);
    });
};

const clearAllNotifications = (cb: Function) => {
  axios
    .get(`${API_URL}/notification/clear`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("clearAllNotifications response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("clearAllNotifications error");
      cb(error.response.data.message);
    });
};

const removeNoticeById = (notice_obj: object, cb: Function) => {
  console.log("removeNoticeById - notificationId");
  console.log(notice_obj);

  axios
    .post(`${API_URL}/notification/delete`, notice_obj, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("removeNoticeById response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("removeNoticeById error");
      console.log(error);
      cb(error.response.data.message);
    });
};

const verify = (query: string, cb: Function) => {
  axios
    .get(`${API_URL}/user/verify?id=${query}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("verify response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("verify error");
      cb(error.response.data.message);
    });
};

const updateProfile = (bodyFormData: any, cb: Function) => {
  console.log("updateProfile updateProfile updateProfile");
  // console.log(bodyFormData);
  axios({
    method: "POST",
    url: `${API_URL}/user/profile`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  })
    .then((response) => {
      console.log("updateProfile response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("updateProfile error");
      cb(error.response.data.message);
    });
};

const authenticate = (cb: Function) => {
  axios
    .get(`${API_URL}/user/authenticate`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("authenticate response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("authenticate error");
      console.log(error);
      console.log(error.response.data);
      cb(error.response.data.message);
    });

  // for (let i = 0; i < db.users.length; i++) {
  //   if (
  //     db.users[i].email === "bob@bob.com" &&
  //     db.users[i].password === "bob@bob.com"
  //   ) {
  //     cb(null, db.users[i]);
  //     // cb(null, null);

  //     return;
  //   }
  // }
  // cb(new Error("user not found"));
};

const logout = (cb: Function) => {
  axios
    .get(`${API_URL}/user/logout`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("user logout response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("user logout error");
      console.log(error);
      cb(error.response.data.message);
    });
};

const login = (user_obj: any, cb: Function) => {
  console.log("user login user_obj");
  console.log(user_obj);

  axios
    .post(`${API_URL}/user/login`, user_obj, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("user login response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("user login error");
      console.log(error);
      cb(error.response.data.message);
    });
  // cb(new Error("login user not found"));
};

const register = (user_obj: {}, cb: Function) => {
  axios
    .post(`${API_URL}/user/signUp`, user_obj)
    .then((response) => {
      console.log("post register response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("post register error");
      console.log(error);
      cb(error.response.data.message);
    });
};

export {
  register,
  login,
  logout,
  authenticate,
  updateProfile,
  verify,
  getNotice,
  removeNoticeById,
  clearAllNotifications,
};
