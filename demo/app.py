#!/usr/bin/env python3
"""
MeowLang Web Demo Backend
Provides API endpoints for executing MeowLang code with a professional interface
"""

import os
import sys
import logging
import json
from typing import Dict, Any, Optional
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

# Add the parent directory to the path so we can import the interpreter
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from meowlang import MeowInterpreter
except ImportError:
    # Fallback for development
    sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    from meow_interpreter import MeowInterpreter

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable CORS for all routes

# Configuration
app.config['JSON_SORT_KEYS'] = False
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True

class MeowLangAPI:
    """API handler for MeowLang operations"""
    
    @staticmethod
    def execute_code(code: str) -> Dict[str, Any]:
        """Execute MeowLang code and return structured result"""
        try:
            interpreter = MeowInterpreter()
            result = interpreter.run(code)
            
            return {
                'success': True,
                'output': result,
                'memory': interpreter.memory,
                'pointer': interpreter.pointer,
                'memory_size': len(interpreter.memory),
                'execution_time': 0  # Could be enhanced with timing
            }
        except Exception as e:
            logger.error(f"Error executing code: {str(e)}")
            return {
                'success': False,
                'error': str(e),
                'output': '',
                'memory': [0],
                'pointer': 0,
                'memory_size': 1
            }
    
    @staticmethod
    def get_examples() -> Dict[str, str]:
        """Get available example programs"""
        examples_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'examples')
        examples = {}
        
        if os.path.exists(examples_dir):
            for filename in os.listdir(examples_dir):
                if filename.endswith('.meow'):
                    try:
                        with open(os.path.join(examples_dir, filename), 'r', encoding='utf-8') as f:
                            examples[filename] = f.read()
                    except Exception as e:
                        logger.error(f"Error reading example {filename}: {str(e)}")
        
        return examples

# API Routes
@app.route('/api/execute', methods=['POST'])
def execute_code():
    """Execute MeowLang code and return the result"""
    try:
        data = request.get_json()
        if not data or 'code' not in data:
            return jsonify({
                'success': False,
                'error': 'No code provided'
            }), 400
        
        code = data['code']
        if not isinstance(code, str):
            return jsonify({
                'success': False,
                'error': 'Code must be a string'
            }), 400
        
        result = MeowLangAPI.execute_code(code)
        return jsonify(result)
    
    except Exception as e:
        logger.error(f"API error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Internal server error'
        }), 500

@app.route('/api/examples', methods=['GET'])
def get_examples():
    """Get available example programs"""
    try:
        examples = MeowLangAPI.get_examples()
        return jsonify({
            'success': True,
            'examples': examples
        })
    except Exception as e:
        logger.error(f"Error getting examples: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to load examples'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'MeowLang Web API',
        'version': '0.1.0'
    })

# Web Routes
@app.route('/')
def index():
    """Serve the main web interface"""
    return render_template('index.html')

@app.route('/docs')
def docs():
    """Serve the documentation page"""
    return render_template('docs.html')

@app.route('/examples')
def examples():
    """Serve the examples page"""
    return render_template('examples.html')

@app.route('/playground')
def playground():
    """Serve the playground page"""
    return render_template('playground.html')

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

@app.errorhandler(500)
def internal_error(error):
    logger.error(f"Internal server error: {str(error)}")
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

@app.errorhandler(Exception)
def handle_exception(e):
    logger.error(f"Unhandled exception: {str(e)}")
    return jsonify({
        'success': False,
        'error': 'An unexpected error occurred'
    }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') == 'development'
    
    logger.info(f"Starting MeowLang Web API on port {port}")
    app.run(host='0.0.0.0', port=port, debug=debug) 