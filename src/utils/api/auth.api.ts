// import { posts } from "../../FakeDb/posts";
import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
// import API_URL from "../../constants/api_url";
import { users, posts } from "../../FakeDb/FakeDb";
// axios.defaults.withCredentials = true;

const verify = (query: string, cb: Function) => {
  axios
    .get(`http://bb7a42c6c8a5.ngrok.io/api/user/verify?id=${query}`, {
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
  // axios
  //   .put(`${MOCK_URL}/ts/user/edit`, person)
  //   .then((response) => {
  //     console.log("editProfile response");
  //     console.log(response);
  //     cb(null, response);
  //   })
  //   .catch((error) => {
  //     console.log("editProfile error");
  //     cb(error);
  //   });

  cb(null, person);
};

const authenticate = (cb: Function) => {
  // axios
  //   .get(`${API_URL}/user/authenticate`)
  //   .then((response) => {
  //     console.log("authenticate response");
  //     console.log(response);
  //     cb(null, response);
  //   })
  //   .catch((error) => {
  //     console.log("authenticate error");
  //     cb(error);
  //   });

  cb(null, 200);
};

const logout = (cb: Function) => {
  // axios
  //   .get(`${API_URL}/user/logout`)
  //   .then((response) => {
  //     console.log("post register response");
  //     console.log(response);
  //     cb(null, response);
  //   })
  //   .catch((error) => {
  //     console.log("post logout error");
  //     console.log(error);
  //     cb(error);
  //   });
  cb(null, 200);
};

const login = (user_obj: any, cb: Function) => {
  console.log("aaaaaaaaaaaaaaaaaaaaaaaa");
  console.log(user_obj);
  users.forEach((u) => {
    if (user_obj.email == u.email && user_obj.password == u.password) {
      cb(null, user_obj);
    } else {
      cb(new Error("user not found"));
    }
  });
};

const register = (user_obj: {}, cb: Function) => {
  // axios
  //   .post(`${MOCK_URL}/user/signUp`, user_obj)
  //   .then((response) => {
  //     console.log("post register response");
  //     console.log(response);
  //     cb(null, response);
  //   })
  //   .catch((error) => {
  //     console.log("post register error");
  //     console.log(error);
  //     cb(error);
  //   });

  cb(null, user_obj);
};

export { register, login, logout, authenticate, editProfile, verify };
