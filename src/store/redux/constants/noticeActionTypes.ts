export const API_ERROR = "API_ERROR";
export const NOTICE_STATE_ADD = "NOTICE_STATE_ADD";
export const NOTICE_STATE_REMOVE = "NOTICE_STATE_REMOVE";

export interface ErrorAction {
  type: typeof API_ERROR;
  error: string;
}

export interface NoticeUpdateAction {
  type: typeof NOTICE_STATE_ADD;
  notice: {
    message: string;
    link: string;
    timestamp: Date;
  };
}

export interface NoticeRemoveAction {
  type: typeof NOTICE_STATE_REMOVE;
  noticeId: string;
}

type noticeAction = ErrorAction | NoticeUpdateAction | NoticeRemoveAction;

export type NoticeActionTypes = noticeAction;
