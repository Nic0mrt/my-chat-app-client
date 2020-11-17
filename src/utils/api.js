const HTTPADRRESS = "http://localhost:8000";

export async function api(url, method, body) {
  const results = await fetch(`${HTTPADRRESS + url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: method,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await results.json();

  return data;
}
