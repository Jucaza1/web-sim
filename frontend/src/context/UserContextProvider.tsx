import { useState, PropsWithChildren, useEffect} from "react";
import { UserContext } from "../context/userContext";
import { UserInfo } from "../types/state";
import { API_URL } from "../config";
import { User } from "../types/response";

export function UserContextProvider({ children }: PropsWithChildren) {
  console.log("UserContextProvider montado");
  const [user, setUser] = useState(null as UserInfo | null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Al recargar la página comprueba si hay un token en el localStorage e intenta recuperar el usuario - hidratación
  useEffect(() => {
    console.log("UserContextProvider useEffect");
    const fetchUser = async () => {
    const userString = localStorage.getItem("user");
    let userInfo: UserInfo | undefined
    if(userString){
      try{
        userInfo = JSON.parse(userString)
      } catch(e:unknown) {
        console.error("error parsing user from localStore", e)
      }
    }
    if(userInfo != undefined){
      setUser(userInfo)
      setLoggedIn(true)
      return
    }
      try {
          const response = await fetch(`${API_URL}/users/me`, {
            method: "GET",
          })
          if (!response.ok) {
            throw new Error("Error al recuperar el usuario");
          }
          const data = await response.json() as User;
          if (data.id && data.role && data.name ){
            userInfo = {
              id : data.id,
              company : data?.companyId,
              role : data.role ,
              name : data.name,
            }
            console.log("Usuario recuperado:", data);
            setUser(user);
            setLoggedIn(true);
          }

      } catch (error) {
        console.error("Error al recuperar el usuario:", error);
        setUser(null);
        setLoggedIn(false);
        return
      }
    }

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
}
