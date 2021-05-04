import axios from "axios";
import MOCK_URL from "../../constants/mock_server_url";

const fetchPeople = (cb: Function) => {
  axios
    .get(`${MOCK_URL}/ts/allusers`)
    .then((response) => {
      console.log("get fetchPeople response");
      console.log(response);
      cb(null, response);
    })
    .catch((error) => {
      console.log("fetchPeople error");
      console.log(error);
      cb(error);
    });
};

const fetchPerson = (id: string, cb: Function) => {
  axios
    .get(`${MOCK_URL}/ts/person/${id}`)
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

export { fetchPeople, fetchPerson };
