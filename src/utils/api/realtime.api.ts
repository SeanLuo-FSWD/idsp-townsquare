import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

const createConversation = (addedGroupIds: string[], cb: Function) => {
  console.log("createConversation called");
  axios
    .post(
      `${API_URL}/conversation`,
      { target: addedGroupIds },
      { withCredentials: true }
    )
    .then((response) => {
      console.log("createConversation response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("createConversation error");
      console.log(err);
      cb(err);
    });
};

export { createConversation };
