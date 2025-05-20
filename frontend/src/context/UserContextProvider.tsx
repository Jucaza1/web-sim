import { useState, PropsWithChildren } from "react";
import { UserContext } from "../context/userContext";
import { UserInfo } from "../types/state";

export function UserContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState(null as UserInfo | null);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}