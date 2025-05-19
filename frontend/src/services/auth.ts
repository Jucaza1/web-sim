type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
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
    const jwt = response.headers.get("Authorization");
    console.log(jwt)
    // Guardar la cookie
    if (jwt) {
      document.cookie = `Authorization=${jwt}; path=/; httpOnly;`;
    }
    return null;
  }

  return await response.json();
}
