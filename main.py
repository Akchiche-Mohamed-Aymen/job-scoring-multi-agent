from applicant.employee import cv_evaluator_agent
from job.job import job_agent
import json
import time

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


def evaluate_cv():
        try:
            evaluation  = json.load(open("./applicant/cv_evaluation.json", "r" , encoding='utf-8'))
        except:
            evaluation = {
            "index" : 0,
            "answers": [],
            "score" : 0
                }
        res = json.load(open("./job/job_profile.json", "r" , encoding='utf-8'))
        res = res['questions']
        i = evaluation['index']
        score = evaluation['score']
        n  = len(res)
        if i >= n :
            return evaluation
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
                    out = json.loads(out)
                    evaluation['answers'].append(out)
                    evaluation['answers'][i]['question'] = res[i]['question']
                    evaluation['answers'][i]['category'] = res[i]['category']
                    evaluation['answers'][i]['type'] = res[i]['type']
                    score += out['confidence'] / n
                    evaluation['score'] = score
                    evaluation['index'] = i + 1
                    print(f"\033[92m>>> Question {i+1} evaluated successfully.\033[0m")
                    with open("./applicant/cv_evaluation.json", "w" , encoding='utf-8') as f:
                        json.dump(evaluation, f, indent=4, ensure_ascii=False)
                    s = 3
                    print(f"\033[1;34mLLM goes to sleep for {s} seconds...\033[0m")
                    time.sleep(s)
                    i += 1
                    return {
                        "msg":"All questions evaluated successfully. Process completed.",
                        "answers": evaluation["answers"],
                        "score": score
                        }
                        
                except Exception as e:
                    print(f"\033[91m>>> Error From CV Agent ===> {e}\033[0m")
                    fail += 1
                    if fail > 3:
                        evaluation['index'] = i 
                        with open("./applicant/cv_evaluation.json", "w" , encoding='utf-8') as f:
                            json.dump(evaluation, f, indent=4, ensure_ascii=False)
                        raise Exception(f"Failed to evaluate Question {i+1} after 3 attempts. Process terminated. {str(e)}")
                        

    
