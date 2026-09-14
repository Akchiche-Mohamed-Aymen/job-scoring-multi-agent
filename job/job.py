from langchain.agents import create_agent
from schemas import HRJobRequirements
import  json
from util import llm_model

job_system_prompt = open("./job/job_system_prompt.txt", "r").read()
job_agent = create_agent(model=llm_model,
                        system_prompt=job_system_prompt ,
                        response_format = HRJobRequirements)
