import axios from "axios";
// import MOCK_URL from "../../constants/mock_server_url";
import { db } from "../../FakeDb/FakeDb";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import API_URL from "../../constants/api_url";

const getConversationByMembers = (addedGroupIds: string[], cb: Function) => {
  console.log("getConversationByMembers called");
  console.log(addedGroupIds);

  axios
    .post(
      `${API_URL}/conversation`,
      { target: addedGroupIds },
      // { target: null },
      { withCredentials: true }
    )
    .then((response) => {
      console.log("getConversationByMembers response");
      console.log(response);
      cb(null, response.data);
    })
    .catch((err) => {
      console.log("getConversationByMembers error");
      console.log(typeof err);

      if (!err.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(err.response.data);
      }

      // console.log(err);
      // console.log(err.response);
      // console.log(err.response.data);
    });
};

// const getConversationByMembers = (personIds: string[], cb: Function) => {
//   console.log(
//     "getConversationByMembers getConversationByMembers getConversationByMembers"
//   );

//   axios
//     .post(
//       `${API_URL}/conversation/person`,
//       { target: personIds },
//       {
//         withCredentials: true,
//       }
//     )
//     .then((response) => {
//       console.log("getConversationByMembers response");
//       console.log(response);
//       cb(null, response.data);
//     })
//     .catch((error) => {
//       console.log("getConversationByMembers error");
//       console.log(error);

//             if (!error.response) {
//   cb(
//     new Error(
//       "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
//     )
//   );
// } else {
//   cb(error.response.data);
// }
//     });
// };

const getMessagesInConversation = (chatId: string, cb: Function) => {
  console.log("getMessagesInConversation --------- getMessagesInConversation");
  console.log(chatId);

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

      if (!error.response) {
        cb(
          new Error(
            "Wow the server just crashed...be a hero, and tell Alex, Johnny or Sean  ASAP. Please also remember the steps leading to this."
          )
        );
      } else {
        cb(error.response.data);
      }
    });
};

export { getConversationByMembers, getMessagesInConversation };
