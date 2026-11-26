#!/usr/bin/env python3
"""Cave Slam dev server (alternative to serve.ps1).

Serves the project folder (the one holding assets/ and software/) and lists
every file under assets/ at /__assets.json so the game can see new art.
Usage: python serve.py [port]   then open http://localhost:8080/software/
"""
import http.server, json, os, sys, functools

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()
    def do_GET(self):
        if self.path.split('?')[0] == '/__assets.json':
            base = os.path.join(ROOT, 'assets')
            files = []
            for d, _, names in os.walk(base):
                for n in names:
                    files.append(os.path.relpath(os.path.join(d, n), base).replace(os.sep, '/'))
            body = json.dumps(sorted(files)).encode()
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()
    def log_message(self, *a):
        pass

if __name__ == '__main__':
    Handler.extensions_map = {**Handler.extensions_map, '.js': 'text/javascript', '.webp': 'image/webp'}
    h = functools.partial(Handler, directory=ROOT)
    print(f'Cave Slam: http://localhost:{PORT}/software/')
    http.server.ThreadingHTTPServer(('127.0.0.1', PORT), h).serve_forever()
