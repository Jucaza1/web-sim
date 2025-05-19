import { createContext, PropsWithChildren, useState } from 'react';
import { UserInfo } from '../types/state';

export const UserContext = createContext({} as UserContextType);
export type UserContextType = {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};
export function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(null as UserInfo | null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
