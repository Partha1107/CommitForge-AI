from pydantic import BaseModel


class GenerateRequest(BaseModel):
    diff: str