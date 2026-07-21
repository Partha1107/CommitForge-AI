import os
import requests


OPENROUTER_URL = (
    "https://openrouter.ai/api/v1/chat/completions"
)



PROMPT = """

You are an expert Git assistant.

Analyze the git diff and generate a commit message.

Return ONLY JSON:

{
    "commit_message": "",
    "description": "",
    "type": "",
    "scope": ""
}

Git Diff:

"""



def generate_from_openrouter(diff: str):

    api_key = os.getenv(
        "OPENROUTER_API_KEY"
    )


    if not api_key:

        raise Exception(
            "OPENROUTER_API_KEY missing"
        )


    headers = {

        "Authorization":
            f"Bearer {api_key}",

        "Content-Type":
            "application/json"

    }


    payload = {

        "model":
            "openai/gpt-4o-mini",


        "messages": [

            {

                "role": "user",

                "content":
                    PROMPT + diff

            }

        ]

    }



    response = requests.post(

        OPENROUTER_URL,

        headers=headers,

        json=payload,

        timeout=30

    )


    if response.status_code != 200:

        raise Exception(
            response.text
        )



    data = response.json()


    return (
        data["choices"][0]
        ["message"]
        ["content"]
    )