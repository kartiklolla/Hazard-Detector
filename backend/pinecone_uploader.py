# data_uploader.py
import os
import json
import glob
from typing import List, Dict
from pinecone import Pinecone, ServerlessSpec
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.docstore.document import Document

# ==========================================
# CONFIGURATION
# ==========================================

class Config:
    GEMINI_API_KEY = "AIzaSyDYOU7IntT-7FhKBmAgH7a_nS1xD9pGiNU"
    PINECONE_API_KEY = "pcsk_2AZ1fN_KQ5kSpng9q1NQ62Ls8mUomcDWtjy4gDLhFBgxUShQQNtSq8BGjQTrMKmcQjmmnB"
    PINECONE_INDEX_NAME = "accident-datasets"
    PINECONE_ENVIRONMENT = "us-east-1"
    DATASETS_FOLDER = "./datasets"

# ==========================================
# SIMPLE JSON UPLOADER
# ==========================================

class SimpleJsonUploader:
    """Upload raw JSON to Pinecone without processing"""
    
    def __init__(self, datasets_folder: str = "~/hazard-indicator/datasets"):
        self.datasets_folder = datasets_folder
    
    def load_all_json_files(self) -> List[Dict]:
        """Load all JSON files as-is"""
        all_jsons = []
        
        json_files = glob.glob(os.path.join(self.datasets_folder, "*.json"))
        
        print(f"Found {len(json_files)} JSON files\n")
        
        for file_path in json_files:
            filename = os.path.basename(file_path)
            print(f"Loading: {filename}")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                all_jsons.append({
                    'filename': filename,
                    'data': data
                })
        
        return all_jsons
    
    def convert_to_documents(self, json_files: List[Dict]) -> List[Document]:
        """Convert raw JSON to Document objects for Pinecone"""
        documents = []
        doc_id = 0
        
        for item in json_files:
            filename = item['filename']
            data = item['data']
            
            # Convert entire JSON to string
            json_str = json.dumps(data, indent=2)
            
            metadata = {
                'source_file': filename,
                'doc_id': doc_id,
                'raw_json': True
            }
            
            # Create a single document per JSON file
            documents.append(Document(page_content=json_str, metadata=metadata))
            doc_id += 1
            
            print(f"  Created document for {filename}")
        
        return documents

# ==========================================
# PINECONE UPLOADER
# ==========================================

class PineconeUploader:
    """Upload documents to Pinecone"""
    
    def __init__(self, api_key: str, index_name: str, gemini_key: str):
        self.pc = Pinecone(api_key=api_key)
        self.index_name = index_name
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=gemini_key
        )
    
    def create_index(self, dimension=768):
        """Create Pinecone index if it doesn't exist"""
        existing_indexes = [idx.name for idx in self.pc.list_indexes()]
        
        if self.index_name not in existing_indexes:
            print(f"Creating index: {self.index_name}")
            self.pc.create_index(
                name=self.index_name,
                dimension=dimension,
                metric='cosine',
                spec=ServerlessSpec(
                    cloud='aws',
                    region=Config.PINECONE_ENVIRONMENT
                )
            )
            print("✓ Index created successfully!\n")
        else:
            print(f"✓ Index {self.index_name} already exists\n")
    
    def upload_documents(self, documents: List[Document]):
        """Upload documents to Pinecone"""
        print(f"Uploading {len(documents)} documents to Pinecone...\n")
        
        vectorstore = PineconeVectorStore.from_documents(
            documents=documents,
            embedding=self.embeddings,
            index_name=self.index_name
        )
        
        print(f"✓ Successfully uploaded {len(documents)} documents!\n")
        return vectorstore

# ==========================================
# MAIN UPLOAD SCRIPT
# ==========================================

def upload_raw_json():
    """Upload raw JSON files to Pinecone"""
    
    print("=" * 60)
    print("Simple JSON Upload to Pinecone")
    print("=" * 60 + "\n")
    
    # Load JSON files
    uploader = SimpleJsonUploader(Config.DATASETS_FOLDER)
    json_files = uploader.load_all_json_files()
    print()
    
    if not json_files:
        print("❌ No JSON files found in datasets folder!")
        return None
    
    # Convert to documents
    documents = uploader.convert_to_documents(json_files)
    print()
    
    # Upload to Pinecone
    pinecone_uploader = PineconeUploader(
        Config.PINECONE_API_KEY,
        Config.PINECONE_INDEX_NAME,
        Config.GEMINI_API_KEY
    )
    pinecone_uploader.create_index()
    vectorstore = pinecone_uploader.upload_documents(documents)
    
    print("=" * 60)
    print("✓ Upload Complete!")
    print("=" * 60)
    return vectorstore

if __name__ == "__main__":
    # Configure Gemini
    genai.configure(api_key=Config.GEMINI_API_KEY)
    # Run upload
    upload_raw_json()
