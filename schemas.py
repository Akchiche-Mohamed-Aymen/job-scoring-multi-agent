from pydantic import BaseModel
from typing import Literal

class CVAnswer(BaseModel):
    answer: str
    evidence_status: Literal["high","medium","low","unknown"]
    evidence_documents: list[str]
    confidence: float


class CVAgentResponse(BaseModel):
    answers: list[CVAnswer]