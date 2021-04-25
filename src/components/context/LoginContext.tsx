import { createContext, Dispatch, SetStateAction } from "react";

export interface ILoginContext {
  username: string;
  isAuthenticated: boolean;
  setUsername: Dispatch<SetStateAction<string>>;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
}

export const LoginContext = createContext({} as ILoginContext);
