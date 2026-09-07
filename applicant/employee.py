from langchain.agents import create_agent
from dotenv import load_dotenv
from applicant.cv_splitter import query_documents
import os
from schemas import CVAgentResponse
load_dotenv()
api_key = os.getenv("MISTRAL_API_KEY")

llm_model = "mistral-7b-instruct-v0.1"


system_prompt = open("system.txt", "r").read()
cv_evaluator_agent = create_agent(
    llm_model=llm_model,
    system_prompt=system_prompt,
    api_key=api_key,
    tools=[query_documents],
    response_format=CVAgentResponse
)