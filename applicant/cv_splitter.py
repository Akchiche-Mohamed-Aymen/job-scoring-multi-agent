from pathlib import Path
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pypdf import PdfReader
from langchain_core.documents import Document
from langchain_chroma import Chroma
from sentence_transformers import SentenceTransformer

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
def store_chunks(chunks):
    embedder = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")
    texts = [chunk.page_content for chunk in chunks]
    vectors = embedder.encode(texts).tolist()
    db=Chroma(collection_name="applicant_chunks",
        persist_directory="./chroma_db",
        embedding_function=embedder)
    ids = [f'Document{chunks[i].metadata["page"]} chunk_{i}' for i in range(len(chunks))]
    db._collection.add(
        ids=ids,
        documents=texts,
        embeddings=vectors,
        metadatas=[chunk.metadata for chunk in chunks]
    )

documents = load_documents(FILE_PATH)
print(f"Loaded {len(documents)} documents from {FILE_PATH}")
chunks = chunk_documents(documents)
print(f"Created {len(chunks)} chunks from the documents")
try:
    store_chunks(chunks)
    print(f"Stored {len(chunks)} chunks in the Chroma database")
except Exception as e:
    print(f"Error storing chunks in the Chroma database: {e}")
    