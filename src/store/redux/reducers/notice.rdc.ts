import {
  NoticeActionTypes,
  API_ERROR,
  NOTICE_STATE_ADD,
  NOTICE_STATE_REMOVE,
  NOTICE_STATE_SET,
} from "../constants/noticeActionTypes";

import _ from "lodash";

const INITIAL_STATE = {
  error: null,
  notices: [],
} as any;

function noticeReducer(noticeState = INITIAL_STATE, action: NoticeActionTypes) {
  switch (action.type) {
    case API_ERROR: {
      return { ...noticeState, error: action.error };
    }
    case NOTICE_STATE_SET: {
      console.log("NOTICE_STATE_SET");
      console.log("action.notices");
      console.log(action.notices);

      const newNoticeState = {
        ...noticeState,
        notices: action.notices,
      };
      return newNoticeState;
    }
    case NOTICE_STATE_ADD: {
      console.log("NOTICE_STATE_ADD");
      console.log("action.notice");
      console.log(action.notice);

      const newNoticeState = {
        ...noticeState,
        notices: [...noticeState.notices, action.notice],
      };
      return newNoticeState;
    }
    case NOTICE_STATE_REMOVE: {
      console.log("NOTICE_STATE_REMOVE - noticeState.notices");
      console.log(noticeState.notices);

      console.log("action.noticeId");
      console.log(action.noticeId);

      const newNotices = _.filter(
        noticeState.notices,
        (n) => n._id !== action.noticeId
      );

      const newNoticeState = {
        ...noticeState,
        notices: newNotices,
      };

      console.log("NOTICE_STATE_REMOVE - newNoticeState");
      console.log(newNoticeState);
      return newNoticeState;
    }
    default:
      return noticeState;
  }
}

export default noticeReducer;
