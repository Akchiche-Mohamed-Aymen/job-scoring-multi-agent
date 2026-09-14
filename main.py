from applicant.employee import cv_evaluator_agent
from job.job import job_agent
import json
import time
hr_agent  = None
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

def structured_job_profile(job_title, job_description):
    try:
        response = job_agent.invoke({
            "messages": [{"role": "user", "content": f"Job Title: {job_title}\nJob Description: {job_description}"}]
        })
        res = json.dumps(response['structured_response'].model_dump(), indent=4)
        res = json.loads(res)
        with open("./job/job_profile.json", "w" , encoding='utf-8') as f:
            json.dump(res, f, indent=4, ensure_ascii=False) 
        return "Job profile structured successfully and saved "
    except Exception as e:
        raise Exception(str(e))
try:
    evaluation  = json.load(open("./applicant/cv_evaluation.json", "r" , encoding='utf-8'))
except Exception as e:
    evaluation = {
        "index" : 0,
        "answers": []
    }

def evaluate_cv(res):
        i = evaluation['index']
        n  = len(res)
        while i < n:
                fail = 0
                formatter = ''
                formatter += f"Category: {res[i]['category']}\n"
                formatter += f"Question: {res[i]['question']}\n"
                formatter += f"Evaluation Criteria: {res[i]['eval_criteria']}\n"
                formatter += f"Required Type: {res[i]['type']}\n"
                formatter += f"Importance: {res[i]['importance']}\n\n"
                try:
                    cv_response = cv_evaluator_agent.invoke({
                        "messages": [{"role": "user", "content": formatter}]
                    })
                    out = json.dumps(cv_response['structured_response'].model_dump(), indent=4)
                    out = json.loads(out)['answers'][0]
                    evaluation['answers'].append(out)
                    evaluation['index'] = i + 1
                    print(f"\033[92m>>> Question {i+1} evaluated successfully.\033[0m")
                    with open("./applicant/cv_evaluation.json", "w" , encoding='utf-8') as f:
                        json.dump(evaluation, f, indent=4, ensure_ascii=False)
                    s = 10
                    print(f"\033[1;34mLLM goes to sleep for {s} seconds...\033[0m")
                    time.sleep(s)
                    i += 1
                    if i > n - 1:
                        print(f"\033[92m>>> All questions evaluated successfully. Process completed.\033[0m")
                except Exception as e:
                    print(f"\033[91m>>> Error From CV Agent ===> {e}\033[0m")
                    fail += 1
                    if fail > 3:
                        print(f"\033[91m>>> Failed to evaluate Question {i+1} after 3 attempts. Process terminated.\033[0m")
                        evaluation['index'] = i 
                        with open("./applicant/cv_evaluation.json", "w" , encoding='utf-8') as f:
                            json.dump(evaluation, f, indent=4, ensure_ascii=False)
                        i += 1
#res = structured_job_profile(job_title, job_description)
res = json.load(open("./job/job_profile.json", "r" , encoding='utf-8'))
evaluate_cv(res['questions'])
