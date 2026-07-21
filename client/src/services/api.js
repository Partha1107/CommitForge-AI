const API_URL = "http://127.0.0.1:8000";

export async function generateCommit(diff) {
  const response = await fetch(`${API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ diff }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Generation failed");
  }

  return response.json();
}