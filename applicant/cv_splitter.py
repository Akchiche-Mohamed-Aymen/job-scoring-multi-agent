from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from langchain_core.documents import Document
FILE_PATH = "./applicant/xai&LLM.pdf"
def load_documents(file_path):
    reader = PdfReader(file_path)
    documents = []
    for page_number, page in enumerate(reader.pages):
        text = page.extract_text() or ""
        if text != "":
            documents.append(
                Document(
                    page_content=text,
                    metadata={
                        "source": str(Path(file_path)),
                        "page": page_number,
                    },
                )
            )
    return documents
def chunk_documents(documents, chunk_size=1000, chunk_overlap=200):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap
    )
    return text_splitter.split_documents(documents)
documents = load_documents(FILE_PATH)
n = len(documents)
print(f"Loaded {n} documents from {FILE_PATH}")
chunks = chunk_documents(documents)

print(f"Documents: {n}")
print(f"Chunks: {len(chunks)}")

for i, chunk in enumerate(chunks[:3]):
    print(f"\n--- Chunk {i + 1} ---")
    print(chunk.page_content)
    print("Metadata:", chunk.metadata)
    print('\n====================================================\n')
    