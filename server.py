from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import IngestRequest, JobProfileRequest
from applicant.cv_splitter import ingest_documents
from main import structured_job_profile

app = FastAPI(title="Job Scoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/v0/ingest")
def ingest_cv(request: IngestRequest):
    try:
        result = ingest_documents(f'{request.file_path}')

        return {
            "success": True,
            "message": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/v0/job-profile")
def create_job_profile(request: JobProfileRequest):
    try:
        result = structured_job_profile(
            request.job_title,
            request.job_description
        )
        return {
            "success": True,
            "message": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
#py -m uvicorn server:app --reload