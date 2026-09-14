from pydantic import BaseModel, Field
from typing import  List, Literal

#========================== HR Job Requirements Schema ==========================
class HRQuestion(BaseModel):
    category: Literal["job_profile", "experience", "technical_skill", "soft_skill", "education_cert", "other"]
    question: str = Field(description="The specific question the CV must answer")
    eval_criteria: str = Field(description="What specific evidence in the CV qualifies as a PASS")
    type: Literal["must_have", "nice_to_have"]
    importance: Literal["critical", "high", "medium", "low"]

class HRJobRequirements(BaseModel):
    job_title: str = Field(description="Target role title")
    total_must_haves: int = Field(description="Total count of mandatory questions")
    questions: List[HRQuestion] = Field(
        description="The complete list of questions covering all profile, skill, and education requirements"
    )

#========================== CV Agent Response Schema ==========================

class CVAnswer(BaseModel):
    answer: str
    evidence_status: Literal["high","medium","low","unknown"]
    evidence_documents: list[str]
    confidence: float


class CVAgentResponse(BaseModel):
    answers: list[CVAnswer]
class IngestRequest(BaseModel):
    file_path: str


class JobProfileRequest(BaseModel):
    job_title: str
    job_description: str
