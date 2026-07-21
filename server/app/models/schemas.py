from pydantic import BaseModel
from typing import List


class DiffRequest(BaseModel):
    diff: str


class CommitResponse(BaseModel):
    provider: str
    commit_message: str
    description: str
    type: str
    scope: str
    breaking_change: bool
    risk_level: str
    branch_name: str
    pr_title: str
    release_notes: str
    files_summary: List[str]