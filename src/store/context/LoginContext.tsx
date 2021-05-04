import { createContext, Dispatch, SetStateAction } from "react";
import { IUser } from "../../interfaces/IUser";

export interface ILoginContext {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  currentUser: any | null;
  setCurrentUser: Dispatch<SetStateAction<any | null>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  signUpStatus: boolean;
  setSignUpStatus: Dispatch<SetStateAction<boolean>>;
  showModal: string;
  setShowModal: Dispatch<SetStateAction<string>>;
  modalProps: any;
  setModalProps: Dispatch<SetStateAction<any>>;
  cerror: any;
  setCerror: Dispatch<SetStateAction<any>>;
}

export const LoginContext = createContext({} as ILoginContext);
