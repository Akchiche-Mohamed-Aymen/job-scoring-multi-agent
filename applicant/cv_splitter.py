from pathlib import Path
from langchain_mistralai import MistralAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from langchain_core.documents import Document
from langchain_chroma import Chroma
from dotenv import load_dotenv
from langchain_mistralai import MistralAIEmbeddings
from langchain.tools import tool
import os
load_dotenv()
api_key = os.getenv("MISTRAL_API_KEY")
FILE_PATH = "./applicant/xai&LLM.pdf"

embeddings = MistralAIEmbeddings(
    model="mistral-embed",
    api_key= api_key
)
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
def store_chunks(chunks , collection_name="applicant_chunks", persist_directory="./chroma_db"):
    ids = [f'Document{chunks[i].metadata["page"]} chunk_{i}' for i in range(len(chunks))]
    db = Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=persist_directory,
        
    )
    db.add_documents(chunks, ids=ids)
    
# load → transform/chunk → embed → store    
def ingest_documents(file_path):
    documents = load_documents(file_path)
    print(f"Loaded {len(documents)} documents from {file_path}")
    chunks = chunk_documents(documents)
    print(f"Created {len(chunks)} chunks from the documents")
    try:
        store_chunks(chunks)
        print(f"Stored {len(chunks)} chunks in the Chroma database")
    except Exception as e:
        print(f"Error storing chunks in the Chroma database: {type(e).__name__}")
@tool
def query_documents(query, collection_name="applicant_chunks", persist_directory="./chroma_db"):
    """retrieve relevant documents from the Chroma database based on a query and return the documents and confidence score"""
    db = Chroma(
        collection_name=collection_name,
        embedding_function=embeddings,
        persist_directory=persist_directory,
    )
    k = 3
    results = db.similarity_search_with_score(query, k=k)
    evidence_documents = [doc.page_content for doc, _ in results]
    confidence = round(sum([score for _, score in results]) / k, 2)
    return evidence_documents, confidence
