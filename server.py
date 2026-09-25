from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import IngestRequest, JobProfileRequest
from applicant.cv_splitter import ingest_documents
from main import structured_job_profile , evaluate_cv

app = FastAPI(title="Job Scoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

#"C:/Users/SG INFO/Desktop/job-scoring-multi-agent/applicant/Mohamed_Aymen_Akchiche.pdf"
@app.post("/v0/ingest")
def ingest_cv(request: IngestRequest):
    try:
        msg = ingest_documents(request.file_path)

        return {
            "success": True,
            "message": msg
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


@app.post("/v0/api_key")
def save_api_key(api_key: str):
    try:
        with open("key.txt" , "w") as f:
            f.write(api_key.strip())
        return {
            "success": True,
            "message": "Api Key was saved successfully"
        }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
@app.post("/v0/job-profile")
def create_job_profile(request: JobProfileRequest):
    try:
        msg = structured_job_profile(
            request.job_title,
            request.job_description
        )
        return {
            "success": True,
            "message": msg
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
@app.get("/v0/cv_evaluate")
def match_cv():
    try:
        return {
                    "success": True,
                    "message": evaluate_cv()
                }
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
        
        
#py -m uvicorn server:app --reload