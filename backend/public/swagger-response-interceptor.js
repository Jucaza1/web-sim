window.addEventListener("load", function () {
  console.log("Custom Swagger script loaded");

  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    const res = await originalFetch(...args);
    if (res.status === 204) {
      const authHeader = res.headers.get("Authorization");
      if (authHeader) {
        document.cookie = `Authorization=${encodeURIComponent(authHeader)}; path=/; HttpOnly; max-age=360`;
      }
    }
    return res;
  };
});
