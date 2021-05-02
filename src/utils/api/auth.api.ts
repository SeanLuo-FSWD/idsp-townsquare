// import { posts } from "../../FakeDb/posts";
import axios from "axios";
import SERVER_URL from "../../constants/server_url";
import API_URL from "../../constants/api_url";

const authenticate = (cb: Function) => {
  axios
    .get(`${API_URL}/user/authenticate`)
    .then((response) => {
      console.log("authenticate response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("authenticate error");
      cb(error);
    });
};

const logout = (cb: Function) => {
  axios
    .get(`${API_URL}/user/logout`)
    .then((response) => {
      console.log("post register response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("post logout error");
      console.log(error);
      cb(error);
    });
};

const login = (user_obj: {}, cb: Function) => {
  axios
    .post(`${API_URL}/user/login`, user_obj, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log("post login response receive");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("post login error");
      console.log(error);
      cb(error);
    });
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
};

export { register, login, logout, authenticate };
