import os
from pathlib import Path

from dotenv import load_dotenv
from google import genai

env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(env_path)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate(diff: str):
    prompt = f"""
You are an expert Git assistant.

Analyze this git diff:

{diff}

Return ONLY JSON.

{{
  "commit":"",
  "description":"",
  "prTitle":"",
  "prDescription":"",
  "changelog":"",
  "releaseNotes":""
}}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=prompt
    )

    return response.text