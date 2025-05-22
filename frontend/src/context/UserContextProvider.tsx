import { useState, PropsWithChildren, useEffect} from "react";
import { UserContext } from "../context/userContext";
import { UserInfo } from "../types/state";
import { API_URL } from "../config";

export function UserContextProvider({ children }: PropsWithChildren) {
  console.log("UserContextProvider montado");
  const [user, setUser] = useState(null as UserInfo | null);
  const [loggedIn, setLoggedIn] = useState(false);

  // Al recargar la página comprueba si hay un token en el localStorage e intenta recuperar el usuario - hidratación
  useEffect(() => {
    console.log("UserContextProvider useEffect");
    const fetchUser = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if(token) {
      try {
          const response = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          });
          if (!response.ok) {
            throw new Error("Error al recuperar el usuario");
            setUser(null);
            setLoggedIn(false);
            return;
          }
          const data = await response.json();
          console.log("Usuario recuperado:", data); 
          setUser(data);
          setLoggedIn(true);
        } catch (error) {
          console.error("Error al recuperar el usuario:", error);
          setUser(null);
          setLoggedIn(false);
        }
      } else {
        console.log("No hay token en el localStorage");
        setUser(null);
        setLoggedIn(false);
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