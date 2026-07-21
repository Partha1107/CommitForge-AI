import os
import json
import httpx
from dotenv import load_dotenv

load_dotenv()

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
MODEL = os.getenv("OPENROUTER_MODEL", "openai/gpt-4o-mini")

if not OPENROUTER_API_KEY:
    raise Exception("OPENROUTER_API_KEY not found in .env")


def generate_commit(diff: str):
    prompt = f"""
You are CommitForge AI.

Analyze the following Git diff and return ONLY valid JSON.

Rules:
- Do NOT explain anything.
- Do NOT use markdown.
- Do NOT wrap the JSON inside ``` blocks.
- Fill every field.
- Never leave a field empty.

JSON Schema:

{{
  "commit_message": "string",
  "description": "string",
  "type": "feat|fix|docs|style|refactor|perf|test|build|ci|chore",
  "scope": "string",
  "breaking_change": false,
  "risk_level": "Low|Medium|High",
  "branch_name": "string",
  "pr_title": "string",
  "release_notes": "string",
  "files_summary": [
    "string"
  ]
}}

Git Diff:

{diff}
"""

    response = httpx.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
        },
        json={
            "model": MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": "You are an expert Git assistant that ALWAYS returns valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.2,
            "response_format": {
                "type": "json_object"
            }
        },
        timeout=60
    )

    response.raise_for_status()

    data = response.json()

    print("\n========== OPENROUTER RESPONSE ==========")
    print(json.dumps(data, indent=2))
    print("=========================================\n")

    content = data["choices"][0]["message"]["content"]

    if isinstance(content, list):
        content = "".join(
            item.get("text", "")
            for item in content
            if isinstance(item, dict)
        )

    content = content.strip()

    if content.startswith("```json"):
        content = content[7:]

    if content.startswith("```"):
        content = content[3:]

    if content.endswith("```"):
        content = content[:-3]

    content = content.strip()

    print("\n========== AI CONTENT ==========")
    print(content)
    print("================================\n")

    result = json.loads(content)

    defaults = {
        "commit_message": "chore: update project files",
        "description": "Updated project files.",
        "type": "chore",
        "scope": "general",
        "breaking_change": False,
        "risk_level": "Low",
        "branch_name": "chore/update-project",
        "pr_title": "Update project files",
        "release_notes": "General improvements.",
        "files_summary": []
    }

    for key, value in defaults.items():
        if key not in result or result[key] in ("", None):
            result[key] = value

    return result