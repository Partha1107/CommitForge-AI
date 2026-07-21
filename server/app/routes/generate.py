import json

from fastapi import APIRouter, HTTPException

from app.models.request import GenerateRequest
from app.services.ai_manager import generate_ai

router = APIRouter()


@router.post("/generate")
def generate(data: GenerateRequest):
    try:
        ai_response = generate_ai(data.diff)

        # Remove markdown if Gemini returns it
        ai_response = (
            ai_response.replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(ai_response)

    except json.JSONDecodeError:
        raise HTTPException(
            status_code=500,
            detail="Gemini returned invalid JSON."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )