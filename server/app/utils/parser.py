import json


def parse_ai_response(response: str):

    try:
        return json.loads(response)

    except json.JSONDecodeError:

        cleaned = (
            response
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(cleaned)