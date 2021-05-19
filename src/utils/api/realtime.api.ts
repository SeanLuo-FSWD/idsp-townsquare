import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

const createConversation = (addedGroupIds: string[], cb: Function) => {
  console.log(
    "createConversation createConversation createConversation called"
  );
  console.log(addedGroupIds);

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

const getMessagesInConversation = (chatId: string, cb: Function) => {
  axios
    .get(`${API_URL}/conversation/${chatId}/message`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log("getMessagesInConversation response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getMessagesInConversation error");
      console.log(error);

      cb(null, error.response.data.message);
    });
};

export { createConversation, getMessagesInConversation };
