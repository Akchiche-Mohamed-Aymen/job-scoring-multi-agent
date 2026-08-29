from pathlib import Path

from pypdf import PdfReader
from langchain_core.documents import Document


FILE_PATH = "./applicant/xai&LLM.pdf"

reader = PdfReader(FILE_PATH)

documents = []
for page_number, page in enumerate(reader.pages):
    text = page.extract_text() or ""
    if text != "":
        documents.append(
            Document(
                page_content=text,
                metadata={
                    "source": str(Path(FILE_PATH)),
                    "page": page_number,
                },
            )
        )

print(f"Loaded {len(documents)} documents from {FILE_PATH}")
