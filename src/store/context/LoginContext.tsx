import { createContext, Dispatch, SetStateAction } from "react";

export interface ILoginContext {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  username: string;
  setUsername: Dispatch<SetStateAction<string>>;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  signUpStatus: boolean;
  setSignUpStatus: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext({} as ILoginContext);
