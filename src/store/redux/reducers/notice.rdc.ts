import {
  NoticeActionTypes,
  API_ERROR,
  NOTICE_STATE_ADD,
  NOTICE_STATE_REMOVE,
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
    case NOTICE_STATE_ADD: {
      console.log("NOTICE_STATE_ADD");
      const newNoticeState = {
        ...noticeState,
        notices: [...noticeState.notices, action.notice],
      };
      return newNoticeState;
    }
    case NOTICE_STATE_REMOVE: {
      const newNoticeState = _.filter(
        noticeState.notices,
        (n) => n.noticeId !== action.noticeId
      );
      return newNoticeState;
    }
    default:
      return noticeState;
  }
}

export default noticeReducer;
