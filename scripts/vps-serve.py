#!/usr/bin/env python3
"""Tiny threaded static server with gzip + cache headers.
Usage: vps-serve.py <docroot> <port>
Used on the VPS behind Tailscale Funnel (which strips the /alpha path prefix).
"""
import gzip, mimetypes, os, posixpath, sys, urllib.parse
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
PORT = int(sys.argv[2]) if len(sys.argv) > 2 else 8077
TEXT = {".html", ".css", ".js", ".mjs", ".json", ".svg", ".txt", ".xml", ".webmanifest", ".map"}
IMG = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".ico", ".woff", ".woff2", ".ttf"}

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("application/javascript", ".js")


class Handler(BaseHTTPRequestHandler):
    server_version = "aoh-static/1.0"

    def log_message(self, *a):  # quiet
        pass

    def do_HEAD(self):
        self._serve(send_body=False)

    def do_GET(self):
        self._serve(send_body=True)

    def _resolve(self):
        path = urllib.parse.unquote(urllib.parse.urlparse(self.path).path)
        path = posixpath.normpath(path).lstrip("/")
        fs = os.path.join(ROOT, path)
        if os.path.isdir(fs):
            fs = os.path.join(fs, "index.html")
        return fs

    def _serve(self, send_body):
        fs = self._resolve()
        status = 200
        if not (os.path.isfile(fs) and os.path.abspath(fs).startswith(ROOT)):
            nf = os.path.join(ROOT, "404.html")
            if os.path.isfile(nf):
                fs, status = nf, 404
            else:
                self.send_error(404)
                return

        with open(fs, "rb") as f:
            data = f.read()
        ext = os.path.splitext(fs)[1].lower()
        ctype = mimetypes.guess_type(fs)[0] or "application/octet-stream"
        rel = "/" + os.path.relpath(fs, ROOT).replace(os.sep, "/")

        if rel.startswith("/_next/static/"):
            cache = "public, max-age=31536000, immutable"
        elif ext in IMG:
            cache = "public, max-age=86400"
        else:
            cache = "public, max-age=300"

        enc = None
        if ext in TEXT and "gzip" in self.headers.get("Accept-Encoding", "") and len(data) > 256:
            data = gzip.compress(data, 6)
            enc = "gzip"

        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(data)))
        self.send_header("Cache-Control", cache)
        if enc:
            self.send_header("Content-Encoding", enc)
            self.send_header("Vary", "Accept-Encoding")
        self.end_headers()
        if send_body:
            self.wfile.write(data)


if __name__ == "__main__":
    print(f"serving {ROOT} on 127.0.0.1:{PORT}", flush=True)
    ThreadingHTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
