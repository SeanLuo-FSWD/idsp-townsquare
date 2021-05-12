import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import API_URL from "../../constants/api_url";
import { db } from "../../FakeDb/FakeDb";
// axios.defaults.withCredentials = true;

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
      cb(null, error);
    });
};

const editProfile = (person: any, cb: Function) => {
  console.log("editProfile editProfile editProfile");
  console.log(person);

  axios
    .put(`${API_URL}/user/profile`, person)
    .then((response) => {
      console.log("editProfile response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("editProfile error");
      cb(error);
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
      cb(error);
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
      cb(error);
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
      cb(error);
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
      cb(error);
    });

  // cb(null, user_obj);
};

export { register, login, logout, authenticate, editProfile, verify };
