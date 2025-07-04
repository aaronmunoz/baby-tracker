#!/usr/bin/env python3
"""
Simple local development server for testing Baby Tracker
Run with: python3 dev-server.py
Then visit: http://localhost:8000/test-local.html
"""

import http.server
import socketserver
import webbrowser
import os

PORT = 8000

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers for local development
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    print(f"🧪 Starting development server on port {PORT}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"🌐 Local test page: http://localhost:{PORT}/test-local.html")
    print(f"🌐 Main app: http://localhost:{PORT}/index.html")
    print("🛑 Press Ctrl+C to stop")
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
            print(f"✅ Server started successfully!")
            
            # Automatically open browser to test page
            webbrowser.open(f'http://localhost:{PORT}/test-local.html')
            
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
    except Exception as e:
        print(f"❌ Server error: {e}")