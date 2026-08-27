from langchain.agents import create_agent
from schemas import JobProfile
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
import os , json
load_dotenv()
job_key = os.getenv("GOOGLE_API_KEY")
model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    temperature=0.1,
    api_key=job_key,   
    max_retries=2,
)
job_system_prompt = open("job_system_prompt.txt", "r").read()
job_agent = create_agent(model=model,
                        system_prompt=job_system_prompt ,
                        response_format = JobProfile)
job_title = "AI Engineer"
job_description = """
This job is Full-time
Must Have Technical/Functional Skills

 Experience with Apple developmental tools such as Shuri, Claude Code, Apple GitHub, Conductor, and DevX (or equivalent internal developer tooling)
 Strong analytical skills, with hands-on experience in using ML models
 Strong prompt engineering skills to improve and optimize model outputs
 Experience with Vision Language Models (VLMs) for computer vision use cases
 Knowledge of Git, CI/CD tools, and cloud platforms for deployment and version control
 Knowledge of Apple operational tools including Access Manager, Sentry, PagerDuty, and HelpCentral
 Experience working with Apple internal systems such as Radar, Box, Wrike, and Quip

Roles & Responsibilities

 Integrate GenAI tools (ChatGPT, Claude, etc.) into applications to deliver AI-powered functionality
 Apply ML models for anomaly detection, analyzing data to surface meaningful anomalies and risks
 Leverage Apple developmental tooling (Shuri, Claude Code, Apple GitHub etc) throughout the development lifecycle
 Query, and analyze data from SQL databases (Snowflake / Postgres)
 Conduct extensive UAT testing to identify, reproduce, and triage bugs before release
 Iteratively improve model outputs through prompt engineering
 Manage version control, deployment, and delivery pipelines using Apple's Shuri, Multidev etc
 Write and maintain Python scripts to validate data for pipelines and analysis

Cross Functional Collaboration

 Work closely with Product, QA, and Design teams to take features from concept to delivery
 Partner with cross-functional stakeholders to align technical implementation with product intent
 Participate in code reviews, debugging, and performance tuning to ensure quality and reliability

Generic Managerial Skills, If any

 Strong written and verbal communication skills
 Committed to meeting stringent deadlines
 Proactive, driven, and result oriented
 Ability to find solutions collaboratively across the network/teams

Key Words to search in Resume

 Apple Internal Tools, AI, LLM Integration, ChatGPT, Claude, Prompt Engineering, RAG, ChatBot, Machine Learning, Computer Vision, Python Scripts, UAT Testing, Bug Identification, QA, Node.js, Python, API Integration, Git, CI/CD, Cloud Platforms, SQL / NoSQL, Vector DB, Feature Delivery, Cross-Functional Collaboration

Location:Sunnyvale, CA

Salary range:$90,000-$140,000 a year.
"""
try:
    response = job_agent.invoke({
        "messages": [{"role": "user", "content": f"Job Title: {job_title}\nJob Description: {job_description}"}]
    })
    res = response['structured_response'].model_dump_json()
    with open("job_profile.json", "w") as f:
        json.dump(res, f, indent=4, ensure_ascii=False)
except Exception as e:
    print(f"Error: {e}")
