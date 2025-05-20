import { createContext } from 'react';
import { UserInfo } from '../types/state';

export const UserContext = createContext({} as UserContextType);
export type UserContextType = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};

