from langchain.agents import create_agent
from dotenv import load_dotenv
import os
from schemas import CVAnswer
from .cv_splitter import query_documents
from langchain_mistralai import ChatMistralAI

load_dotenv()
api_key = os.getenv("MISTRAL_API_KEY")
llm_model =  ChatMistralAI(
    model="open-mistral-7b",
    api_key= api_key
)
system_prompt = open("./applicant/system.txt", "r").read()
cv_evaluator_agent = create_agent(
    model=llm_model,
    system_prompt=system_prompt,
    tools=[query_documents],
    response_format=CVAnswer
)
