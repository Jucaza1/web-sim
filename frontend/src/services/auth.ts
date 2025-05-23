import { jwtDecode } from "jwt-decode";
import { API_URL } from "../config";
import { UserInfo } from "../types/state";

type LoginPayload = {
  email: string;
  password: string;
};
type jwtPayload = {
  id: number
  name: string
  role: "USER" | "ADMIN_COMPANY" | "ADMIN"
  company: number | null
}

export async function login(payload: LoginPayload): Promise<jwtPayload | null> {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Detalles del error:", error?.error);
    throw new Error(error?.error || "Error al iniciar sesión");
    // return null
  }

  if (response.status === 204) {
    // Obtener el token del header Authorization
    const token = response.headers.get("Authorization");
    // Guardar la cookie
    if (token) {
      // Guardar el token en el localStorage
      // localStorage.setItem("token", token);
      document.cookie = `Authorization=${token}; path=/ ; max-age=3600`;

      const user: UserInfo =  jwtDecode(token) as jwtPayload
      localStorage.setItem("user", JSON.stringify(user));

      return user
      //return null;

    }
    return null;
  }

  return null
}
