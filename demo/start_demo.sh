#!/bin/bash

echo "🐾 MeowLang Demo Startup"
echo "========================================"

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3.7+"
    exit 1
fi

# Install dependencies
echo "🔄 Installing dependencies..."
pip3 install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Choose an option:"
echo "1. Start backend server (for API)"
echo "2. Start frontend server (for web interface)"
echo "3. Start both (requires two terminal windows)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "🚀 Starting backend server..."
        echo "   Backend will be available at: http://localhost:5000"
        python3 app.py
        ;;
    2)
        echo "🌐 Starting frontend server..."
        echo "   Frontend will be available at: http://localhost:8000"
        python3 -m http.server 8000
        ;;
    3)
        echo "🔄 Starting both servers..."
        echo "   Backend: http://localhost:5000"
        echo "   Frontend: http://localhost:8000"
        echo ""
        echo "Starting backend in background..."
        python3 app.py &
        BACKEND_PID=$!
        sleep 3
        echo "Starting frontend..."
        python3 -m http.server 8000
        kill $BACKEND_PID 2>/dev/null
        ;;
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac 