import { createContext, PropsWithChildren, useState } from 'react';

export const UserContext = createContext({});
type UserInfoType = {
  id: number;
  role: string;
  company: string;
};
export type UserContextType = {
  user: UserInfoType | null;
  setUser: (user: UserInfoType) => void;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
};
export function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
