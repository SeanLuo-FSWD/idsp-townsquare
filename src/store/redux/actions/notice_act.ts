import { Dispatch } from "redux";

import {
  NOTICE_STATE_ADD,
  API_ERROR,
  NOTICE_STATE_REMOVE,
} from "../constants/noticeActionTypes";

// import { fetchFeed } from "../../../utils/api/posts.api";

const doNoticeError = (error: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: API_ERROR,
    error,
  });
};

const doNoticeAdd = (notice: Object) => async (dispatch: Dispatch) => {
  dispatch({
    type: NOTICE_STATE_ADD,
    notice: notice,
  });
};

const doNoticeRemove = (noticeId: string) => async (dispatch: Dispatch) => {
  dispatch({
    type: NOTICE_STATE_REMOVE,
    noticeId: noticeId,
  });
};

export { doNoticeError, doNoticeAdd, doNoticeRemove };
