import axios from "axios";
import SERVER_URL from "../../constants/mock_server_url";

const fetchUsers = (cb: Function) => {
  axios
    .get(`${SERVER_URL}/ts/allusers`)
    .then((response) => {
      console.log("get fetchUsers response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("fetchUsers error");
      console.log(error);
      cb(error);
    });
};

export { fetchUsers };
