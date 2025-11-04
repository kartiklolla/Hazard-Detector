# app.py - Flask Backend with Raw JSON
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from typing import List, Dict
import json
import os

# ==========================================
# CONFIGURATION
# ==========================================

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your-gemini-api-key")
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "your-pinecone-api-key")
    PINECONE_INDEX_NAME = "accident-datasets"
    PORT = 5000

# ==========================================
# RAG CHATBOT - RAW JSON RETRIEVAL
# ==========================================

class DGMSChatbot:
    """RAG chatbot that retrieves raw JSON and uses LLM"""
    
    def __init__(self, gemini_api_key: str, pinecone_api_key: str, index_name: str):
        # Configure Gemini
        genai.configure(api_key=gemini_api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        
        # Setup embeddings
        self.embeddings = GoogleGenerativeAIEmbeddings(
            model="models/embedding-001",
            google_api_key=gemini_api_key
        )
        
        # Connect to Pinecone
        self.vectorstore = PineconeVectorStore(
            index_name=index_name,
            embedding=self.embeddings,
            pinecone_api_key=pinecone_api_key
        )
        
        # Conversation history
        self.conversation_history = []
    
    def retrieve_raw_json(self, query: str, k: int = 3) -> List[Dict]:
        """Retrieve raw JSON documents from Pinecone"""
        docs = self.vectorstore.similarity_search(query, k=k)
        
        results = []
        for doc in docs:
            try:
                # Parse JSON if it's JSON content
                json_content = json.loads(doc.page_content)
            except:
                json_content = doc.page_content
            
            results.append({
                'content': json_content,
                'source': doc.metadata.get('source_file', 'Unknown'),
                'metadata': doc.metadata
            })
        
        return results
    
    def build_prompt(self, query: str, retrieved_jsons: List[Dict]) -> str:
        """Build prompt with raw JSON data"""
        
        # Format retrieved JSON data
        json_data = "\n\n".join([
            f"[Data from {item['source']}]\n{json.dumps(item['content'], indent=2)}"
            for item in retrieved_jsons
        ])
        
        history_text = ""
        if self.conversation_history:
            history_text = "\n\nPrevious conversation:\n" + "\n".join([
                f"User: {turn['user']}\nAssistant: {turn['assistant']}"
                for turn in self.conversation_history[-3:]
            ])
        
        prompt = f"""You are an expert assistant for the Directorate General of Mine Safety (DGMS) in India.
Use the provided data to answer questions about mining accidents, safety classifications, and regulations.

Retrieved Data:
{json_data}
{history_text}

User Question: {query}

Instructions:
1. Answer based on the retrieved data provided above
2. Extract relevant information from the JSON data
3. Explain codes and classifications clearly
4. If data is not in the retrieved information, say so
5. Be accurate and detailed

Answer:"""
        
        return prompt
    
    def generate_response(self, query: str, k: int = 3) -> Dict:
        """Generate response using raw JSON retrieval"""
        
        try:
            # Retrieve raw JSON
            retrieved_data = self.retrieve_raw_json(query, k=k)
            
            # Build prompt
            prompt = self.build_prompt(query, retrieved_data)
            
            # Generate response
            response = self.model.generate_content(prompt)
            answer = response.text
            
            # Update conversation history
            self.conversation_history.append({
                'user': query,
                'assistant': answer
            })
            
            return {
                'success': True,
                'answer': answer,
                'retrieved_data': retrieved_data,
                'query': query,
                'num_sources': len(retrieved_data)
            }
        
        except Exception as e:
            return {
                'success': False,
                'error': str(e),
                'query': query
            }
    
    def clear_history(self):
        """Clear conversation history"""
        self.conversation_history = []

# ==========================================
# FLASK APPLICATION
# ==========================================

app = Flask(__name__)
CORS(app)

print("Initializing DGMS Chatbot...")
chatbot = DGMSChatbot(
    Config.GEMINI_API_KEY,
    Config.PINECONE_API_KEY,
    Config.PINECONE_INDEX_NAME
)
print("✓ Chatbot ready!\n")

@app.route('/api/chat', methods=['POST'])
def chat():
    """Chat endpoint"""
    try:
        data = request.json
        query = data.get('message', '').strip()
        k = data.get('k', 3)
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'No message provided'
            }), 400
        
        result = chatbot.generate_response(query, k=k)
        
        if result['success']:
            return jsonify(result), 200
        else:
            return jsonify(result), 500
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/chat/history', methods=['GET'])
def get_history():
    """Get conversation history"""
    return jsonify({
        'history': chatbot.conversation_history,
        'count': len(chatbot.conversation_history)
    }), 200

@app.route('/api/chat/clear', methods=['POST'])
def clear_history():
    """Clear history"""
    chatbot.clear_history()
    return jsonify({
        'success': True,
        'message': 'Conversation cleared'
    }), 200

@app.route('/api/search', methods=['POST'])
def search():
    """Search for raw JSON"""
    try:
        data = request.json
        query = data.get('query', '').strip()
        k = data.get('k', 3)
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'No query provided'
            }), 400
        
        results = chatbot.retrieve_raw_json(query, k=k)
        
        return jsonify({
            'success': True,
            'results': results,
            'query': query,
            'count': len(results)
        }), 200
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check"""
    return jsonify({
        'status': 'healthy',
        'service': 'DGMS RAG Chatbot'
    }), 200

if __name__ == '__main__':
    print("=" * 60)
    print("DGMS RAG Chatbot Server")
    print("=" * 60)
    print(f"Running on http://localhost:{Config.PORT}\n")
    app.run(debug=True, port=Config.PORT, host='0.0.0.0')
