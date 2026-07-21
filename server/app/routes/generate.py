from fastapi import APIRouter, HTTPException

from app.models.schemas import DiffRequest, CommitResponse
from app.services.ai_service import generate_commit

router = APIRouter()


@router.post("/generate", response_model=CommitResponse)
def generate(request: DiffRequest):
    try:
        result = generate_commit(request.diff)
        result["provider"] = "OpenRouter"
        return result

    except Exception as e:
        print("ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )