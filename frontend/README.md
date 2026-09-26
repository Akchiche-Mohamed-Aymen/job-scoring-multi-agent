# CV Matching UI

This project is the frontend interface for an AI-powered CV matching application. It provides a simple step-by-step workflow that allows the user to prepare a CV and a job description, then run the final matching process.

## UI Overview

The interface is organized around four main steps. A sidebar provides navigation between the different steps, while the main content area displays the corresponding page. The application also includes an introductory page explaining the workflow.

The frontend communicates with a FastAPI backend through HTTP requests using Axios. Each step of the interface is connected to a specific backend route.

## 1. Ingest CV

The first page allows the user to provide the path of a candidate's CV.

The purpose of this step is to send the CV location to the backend so that the document can be processed and prepared for the matching workflow.

Route:
POST /v0/ingest_documents

## 2. Add API Keys

The second page allows the user to provide the API keys required by the AI components of the application.

The interface provides separate fields for the required keys and performs basic validation before sending them to the backend.

Route:
POST /v0/api_key

## 3. Structure Job

The third page allows the user to enter a job title and a complete job description.

The purpose of this step is to send the job information to the backend, where the job description is transformed into a structured representation that can later be used during CV evaluation.

Route:
POST /v0/job-profile

After the request is completed successfully, the interface displays a confirmation message rather than the internal structured representation.

## 4. Match CV

The final page provides a single button to start the matching process.

No additional information is required from the user at this stage because the necessary CV and job information have already been prepared in the previous steps.

When the button is clicked, the frontend sends a request to the backend. The backend performs the CV-to-job evaluation and returns the final matching result, which is then presented by the interface in a readable format.

Route:
POST /v0/match_cv

## Application Flow

The intended workflow is:

Ingest CV
→ Add API Keys
→ Structure Job
→ Match CV

The frontend acts as the presentation and interaction layer, while the FastAPI backend handles document processing, AI operations, job structuring, and CV matching.

## Backend Connection

The frontend expects the FastAPI backend to be available at:

http://localhost:8000

The four main connections are:

POST /v0/ingest_documents — CV ingestion

POST /v0/api_key — API key configuration

POST /v0/job-profile — Job structuring

POST /v0/match_cv — Final CV matching

The UI is intentionally kept simple so that the AI processing remains entirely on the backend while the frontend focuses on guiding the user through the workflow and presenting the results.