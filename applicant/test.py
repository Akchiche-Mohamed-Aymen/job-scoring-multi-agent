import json
data  = json.load(open("./applicant/cv_evaluation.json", "r" , encoding='utf-8'))
for a in data["answers"]:
    print(len(a['evidence_documents']))