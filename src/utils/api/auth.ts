// import { posts } from "../../FakeDb/posts";
import axios from "axios";
import SERVER_URL from "../../constants/server_url";

const register = async (email: string, password: string, cb: Function) => {
  axios
    .post(`http://671cdc1794ca.ngrok.io/api/user/signUp`, {
      email: email,
      password: password,
    })
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

export { register };
