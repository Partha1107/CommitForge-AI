const API_URL = import.meta.env.VITE_API_URL;

export async function generateCommit(diff) {
  try {
    const response = await fetch(`${API_URL}/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diff }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to generate commit");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}