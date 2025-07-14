#!/usr/bin/env python3
"""
MeowLang Demo Startup Script
Automatically installs dependencies and starts the demo servers
"""

import subprocess
import sys
import os
import time
import webbrowser
from pathlib import Path

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e}")
        print(f"Error output: {e.stderr}")
        return False

def check_python():
    """Check if Python is available"""
    try:
        subprocess.run([sys.executable, "--version"], check=True, capture_output=True)
        return True
    except:
        print("❌ Python not found. Please install Python 3.7+")
        return False

def install_dependencies():
    """Install required Python packages"""
    return run_command(f"{sys.executable} -m pip install -r requirements.txt", "Installing dependencies")

def start_backend():
    """Start the Flask backend server"""
    print("🚀 Starting MeowLang backend server...")
    print("   Backend will be available at: http://localhost:5000")
    print("   Press Ctrl+C to stop the server")
    print()
    
    try:
        subprocess.run([sys.executable, "app.py"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Backend server stopped")
    except Exception as e:
        print(f"❌ Failed to start backend: {e}")

def start_frontend():
    """Start a simple HTTP server for the frontend"""
    print("🌐 Starting frontend server...")
    print("   Frontend will be available at: http://localhost:8000")
    print("   Press Ctrl+C to stop the server")
    print()
    
    try:
        subprocess.run([sys.executable, "-m", "http.server", "8000"], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Frontend server stopped")
    except Exception as e:
        print(f"❌ Failed to start frontend: {e}")

def main():
    """Main startup function"""
    print("🐾 MeowLang Demo Startup")
    print("=" * 40)
    
    # Check if we're in the right directory
    if not os.path.exists("app.py"):
        print("❌ Please run this script from the demo directory")
        print("   cd demo && python start_demo.py")
        return
    
    # Check Python
    if not check_python():
        return
    
    # Install dependencies
    if not install_dependencies():
        print("❌ Failed to install dependencies. Please check your internet connection.")
        return
    
    print()
    print("🎉 Setup complete! Starting servers...")
    print()
    
    # Ask user which server to start
    print("Choose an option:")
    print("1. Start backend server (for API)")
    print("2. Start frontend server (for web interface)")
    print("3. Start both (requires two terminal windows)")
    
    choice = input("\nEnter your choice (1-3): ").strip()
    
    if choice == "1":
        start_backend()
    elif choice == "2":
        start_frontend()
    elif choice == "3":
        print("🔄 Starting both servers...")
        print("   Backend: http://localhost:5000")
        print("   Frontend: http://localhost:8000")
        print()
        
        # Start backend in background
        backend_process = subprocess.Popen([sys.executable, "app.py"])
        
        # Wait a moment for backend to start
        time.sleep(2)
        
        # Open browser
        webbrowser.open("http://localhost:8000")
        
        # Start frontend
        try:
            subprocess.run([sys.executable, "-m", "http.server", "8000"], check=True)
        except KeyboardInterrupt:
            print("\n🛑 Stopping servers...")
            backend_process.terminate()
            print("✅ Servers stopped")
    else:
        print("❌ Invalid choice. Please run the script again.")

if __name__ == "__main__":
    main() 