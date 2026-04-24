import http.server
import socketserver
import mimetypes
import os

# Ensure .js files are served with the correct MIME type
mimetypes.add_type('application/javascript', '.js')
mimetypes.add_type('application/manifest+json', '.json')

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers for PWA support
        self.send_header('Cache-Control', 'no-cache')
        self.send_header('Service-Worker-Allowed', '/')
        super().end_headers()
    
    def do_GET(self):
        # Serve index.html for SPA routing
        if self.path == '/' or not os.path.splitext(self.path)[1]:
            self.path = '/index.html'
        return super().do_GET()

Handler = MyHTTPRequestHandler

os.chdir('public')  # Serve from public directory

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving HTTP on 0.0.0.0 port {PORT} (http://localhost:{PORT}/) ...")
    httpd.serve_forever()
