import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

const getConversationByConversationId = (
  addedGroupIds: string[],
  cb: Function
) => {
  console.log(
    "getConversationByConversationId getConversationByConversationId getConversationByConversationId called"
  );
  console.log(addedGroupIds);

  axios
    .post(
      `${API_URL}/conversation`,
      { target: addedGroupIds },
      { withCredentials: true }
    )
    .then((response) => {
      console.log("getConversationByConversationId response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("getConversationByConversationId error");
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

const getConversationByMembers = (personIds: string[], cb: Function) => {
  console.log(
    "getConversationByMembers getConversationByMembers getConversationByMembers"
  );

  axios
    .post(
      `${API_URL}/conversation/person`,
      { target: personIds },
      {
        withCredentials: true,
      }
    )
    .then((response) => {
      console.log("getConversationByMembers response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((error) => {
      console.log("getConversationByMembers error");
      console.log(error);

      cb(null, error.response.data.message);
    });
};

export {
  getConversationByConversationId,
  getMessagesInConversation,
  getConversationByMembers,
};
