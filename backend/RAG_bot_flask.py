# app.py - Flask Backend
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_pinecone import PineconeVectorStore
from typing import List, Dict
import os

# ==========================================
# CONFIGURATION
# ==========================================

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "your-gemini-api-key")
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY", "your-pinecone-api-key")
    PINECONE_INDEX_NAME = "dgms-mining-accidents"
    PORT = 5000

# ==========================================
# RAG CHATBOT
# ==========================================

class DGMSChatbot:
    """RAG-powered chatbot for DGMS mining accidents"""
    
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
    
    def retrieve_context(self, query: str, k: int = 5) -> List[Dict]:
        """Retrieve relevant documents from Pinecone"""
        docs = self.vectorstore.similarity_search(query, k=k)
        
        return [
            {
                'content': doc.page_content,
                'metadata': doc.metadata,
            }
            for doc in docs
        ]
    
    def build_prompt(self, query: str, context_docs: List[Dict], 
                    conversation_history: List[Dict] = None) -> str:
        """Build prompt with context and history"""
        
        # Format context
        context_text = "\n\n".join([
            f"[Reference {i+1}]\n{doc['content']}"
            for i, doc in enumerate(context_docs)
        ])
        
        # Format conversation history
        history_text = ""
        if conversation_history and len(conversation_history) > 0:
            history_text = "\n\nPrevious conversation:\n" + "\n".join([
                f"User: {turn['user']}\nAssistant: {turn['assistant']}"
                for turn in conversation_history[-3:]  # Last 3 turns
            ])
        
        prompt = f"""You are an expert assistant for the Directorate General of Mine Safety (DGMS) in India. 
Your role is to provide accurate, detailed information about mining accident classifications, 
safety codes, locations, and accident causes based on DGMS standards.

Context from DGMS classification system:
{context_text}
{history_text}

User Question: {query}

Instructions:
1. Answer based on the provided context from DGMS classification codes
2. When mentioning accident codes, include both the code number and description
3. Explain what each classification code represents
4. If asked about specific accident types, list all relevant codes
5. If the context doesn't fully answer the question, say so clearly
6. Be concise but comprehensive
7. Use bullet points for listing multiple codes or categories

Answer:"""
        
        return prompt
    
    def generate_response(self, query: str, k: int = 5, 
                         use_history: bool = True) -> Dict:
        """Generate response using RAG"""
        
        try:
            # Retrieve relevant documents
            context_docs = self.retrieve_context(query, k=k)
            
            # Build prompt
            history = self.conversation_history if use_history else None
            prompt = self.build_prompt(query, context_docs, history)
            
            # Generate response
            response = self.model.generate_content(prompt)
            answer = response.text
            
            # Update conversation history
            if use_history:
                self.conversation_history.append({
                    'user': query,
                    'assistant': answer
                })
            
            return {
                'success': True,
                'answer': answer,
                'sources': context_docs,
                'query': query,
                'num_sources': len(context_docs)
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
        return len(self.conversation_history)

# ==========================================
# FLASK APPLICATION
# ==========================================

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Initialize chatbot
print("Initializing DGMS Chatbot...")
chatbot = DGMSChatbot(
    Config.GEMINI_API_KEY,
    Config.PINECONE_API_KEY,
    Config.PINECONE_INDEX_NAME
)
print("✓ Chatbot ready!")

@app.route('/api/chat', methods=['POST'])
def chat():
    """Main chat endpoint"""
    try:
        data = request.json
        query = data.get('message', '').strip()
        k = data.get('k', 5)
        use_history = data.get('use_history', True)
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'No message provided'
            }), 400
        
        # Generate response
        result = chatbot.generate_response(query, k=k, use_history=use_history)
        
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
    """Clear conversation history"""
    count = chatbot.clear_history()
    return jsonify({
        'success': True,
        'message': 'Conversation history cleared',
        'remaining': count
    }), 200

@app.route('/api/search', methods=['POST'])
def search():
    """Direct search without conversation context"""
    try:
        data = request.json
        query = data.get('query', '').strip()
        k = data.get('k', 5)
        
        if not query:
            return jsonify({
                'success': False,
                'error': 'No query provided'
            }), 400
        
        # Retrieve documents
        results = chatbot.retrieve_context(query, k=k)
        
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
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'DGMS RAG Chatbot',
        'version': '1.0.0'
    }), 200

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("DGMS RAG Chatbot Server")
    print("=" * 60)
    print(f"Server running on http://localhost:{Config.PORT}")
    print(f"API endpoints:")
    print(f"  POST /api/chat - Send message")
    print(f"  GET  /api/chat/history - Get history")
    print(f"  POST /api/chat/clear - Clear history")
    print(f"  POST /api/search - Direct search")
    print(f"  GET  /api/health - Health check")
    print("=" * 60 + "\n")
    
    app.run(debug=True, port=Config.PORT, host='0.0.0.0')
