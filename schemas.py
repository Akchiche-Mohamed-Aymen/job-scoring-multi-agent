from pydantic import BaseModel
from typing import Optional, List, Dict, Literal

class JobClassification(BaseModel):
    job_title: str
    domain: str
    seniority: Literal["Intern","Entry Level", "Junior","Mid-level", "Senior", "Not specified"]
    job_type: Literal["Full-time", "Part-time", "Contract", "Temporary", "Internship", "Not specified"]
    work_arrangement: Literal["Remote", "On-site", "Hybrid", "Not specified"]
    location: Optional[str] = None

class SkillRequirement(BaseModel):
    skill: str
    category: str          # technical / soft
    importance: str        # critical / high / medium / low
    evidence: str          # where it came from in the JD
class Skills(BaseModel):
    required: list[SkillRequirement]
    preferred: list[SkillRequirement]
    resume_keywords: list[str]


class ExperienceRequirement(BaseModel):
    minimum_years: Optional[int] = None
    maximum_years: Optional[int] = None


class Requirements(BaseModel):
    experience: ExperienceRequirement
    education: List[str]
    certifications: List[str]
    languages: List[str]
    other: List[str]


class RequirementImportance(BaseModel):
    skills: Dict[str, Literal["critical", "high", "medium", "low"]]
    experience: Literal["critical", "high", "medium", "low"]
    education: Literal["critical", "high", "medium", "low"]
    certifications: Literal["critical", "high", "medium", "low"]
    languages: Literal["critical", "high", "medium", "low"]
    other_requirements: Literal["critical", "high", "medium", "low"]


class JobProfile(BaseModel):
    job_classification: JobClassification
    skills: Skills
    requirements: Requirements
    responsibilities: List[str]
    requirement_importance: RequirementImportance
    salary_range: Optional[str] = None