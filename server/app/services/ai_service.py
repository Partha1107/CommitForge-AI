import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai

# Load .env from the server folder
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

if (api_key := os.getenv("GEMINI_API_KEY")) is None:
    raise ValueError("❌ GEMINI_API_KEY not found in .env")

client = genai.Client(api_key=api_key)


def generate_from_ai(diff: str):
    prompt = f"""
You are an expert Git assistant.

Analyze the following Git diff:

{diff}

Return ONLY valid JSON.

The JSON format MUST be:

{{
    "commit": "",
    "description": "",
    "prTitle": "",
    "prDescription": "",
    "changelog": "",
    "releaseNotes": ""
}}

Do NOT wrap the JSON in markdown.
Do NOT explain anything.
Only return valid JSON.
"""

    response = client.models.generate_content(
        model="gemini-2.5-pro",
        contents=prompt,
    )

    return response.text.strip()