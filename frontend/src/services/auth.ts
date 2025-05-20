import { jwtDecode } from "jwt-decode";
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
  const response = await fetch("http://localhost:3000/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Detalles del error:", error);
    throw new Error(error.message || "Error al iniciar sesión");
  }

  if (response.status === 204) {
    // Obtener el token del header Authorization
    const token = response.headers.get("Authorization");
    console.log(token)
    // Guardar la cookie
    if (token) {
      document.cookie = `Authorization=${token}; path=/ ; max-age=3600`;
      return jwtDecode(token) as jwtPayload
      //return null;

    }
    return null;
  }

  return null
}
