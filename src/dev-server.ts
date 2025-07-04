import { createServer, IncomingMessage, ServerResponse } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { exec } from 'child_process';

/**
 * TypeScript Development Server for Baby Tracker
 * Serves static files with proper CORS headers and mime types
 */

interface MimeTypes {
  [key: string]: string;
}

class DevServer {
  private port: number;
  private root: string;
  private mimeTypes: MimeTypes;

  constructor(port: number = 8000, root: string = process.cwd()) {
    this.port = port;
    this.root = root;
    this.mimeTypes = {
      '.html': 'text/html',
      '.js': 'application/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.ico': 'image/x-icon',
      '.woff': 'font/woff',
      '.woff2': 'font/woff2',
      '.ttf': 'font/ttf',
      '.eot': 'application/vnd.ms-fontobject'
    };
  }

  private getMimeType(filePath: string): string {
    const ext = extname(filePath).toLowerCase();
    return this.mimeTypes[ext] || 'application/octet-stream';
  }

  private setHeaders(res: ServerResponse, filePath: string): void {
    // CORS headers for local development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    // Content type
    res.setHeader('Content-Type', this.getMimeType(filePath));
    
    // Cache control for development
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  private logRequest(method: string, url: string, statusCode: number): void {
    const timestamp = new Date().toISOString();
    const statusEmoji = statusCode >= 200 && statusCode < 300 ? '✅' : '❌';
    console.log(`${statusEmoji} [${timestamp}] ${method} ${url} - ${statusCode}`);
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse): void {
    const url = req.url || '/';
    const method = req.method || 'GET';

    // Handle OPTIONS requests for CORS
    if (method === 'OPTIONS') {
      this.setHeaders(res, '');
      res.writeHead(200);
      res.end();
      this.logRequest(method, url, 200);
      return;
    }

    // Parse URL and determine file path
    let filePath = url === '/' ? '/index.html' : url;
    
    // Remove query parameters
    const queryIndex = filePath.indexOf('?');
    if (queryIndex !== -1) {
      filePath = filePath.substring(0, queryIndex);
    }

    const fullPath = join(this.root, filePath);

    // Check if file exists
    if (!existsSync(fullPath)) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end(this.get404Page());
      this.logRequest(method, url, 404);
      return;
    }

    // Check if it's a directory
    const stats = statSync(fullPath);
    if (stats.isDirectory()) {
      const indexPath = join(fullPath, 'index.html');
      if (existsSync(indexPath)) {
        this.serveFile(indexPath, res);
        this.logRequest(method, url, 200);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(this.get404Page());
        this.logRequest(method, url, 404);
      }
      return;
    }

    // Serve the file
    try {
      this.serveFile(fullPath, res);
      this.logRequest(method, url, 200);
    } catch (error) {
      console.error('Error serving file:', error);
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(this.get500Page());
      this.logRequest(method, url, 500);
    }
  }

  private serveFile(filePath: string, res: ServerResponse): void {
    this.setHeaders(res, filePath);
    const content = readFileSync(filePath);
    res.writeHead(200);
    res.end(content);
  }

  private get404Page(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 - File Not Found</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #e74c3c; }
        .links { margin-top: 30px; }
        a { color: #3498db; text-decoration: none; margin: 0 10px; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>404 - File Not Found</h1>
    <p>The requested file could not be found on this server.</p>
    <div class="links">
        <a href="/">🏠 Home</a>
        <a href="/test-local.html">🧪 Test Page</a>
        <a href="/index.html">👶 Baby Tracker</a>
    </div>
</body>
</html>`;
  }

  private get500Page(): string {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>500 - Server Error</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
        h1 { color: #e74c3c; }
    </style>
</head>
<body>
    <h1>500 - Internal Server Error</h1>
    <p>An error occurred while processing your request.</p>
</body>
</html>`;
  }

  private openBrowser(url: string): void {
    const commands = {
      darwin: 'open',
      win32: 'start',
      linux: 'xdg-open'
    };

    const command = commands[process.platform as keyof typeof commands];
    if (command) {
      exec(`${command} ${url}`, (error) => {
        if (error) {
          console.log(`⚠️  Could not open browser automatically. Please visit: ${url}`);
        }
      });
    } else {
      console.log(`⚠️  Please open your browser and visit: ${url}`);
    }
  }

  public start(): void {
    const server = createServer((req, res) => this.handleRequest(req, res));

    server.listen(this.port, () => {
      console.log('🧪 Baby Tracker Development Server');
      console.log('=====================================');
      console.log(`📁 Serving files from: ${this.root}`);
      console.log(`🌐 Server running at: http://localhost:${this.port}`);
      console.log('');
      console.log('Available pages:');
      console.log(`  🏠 Main app: http://localhost:${this.port}/`);
      console.log(`  🧪 Test page: http://localhost:${this.port}/test-local.html`);
      console.log('');
      console.log('🛑 Press Ctrl+C to stop the server');
      console.log('');

      // Auto-open browser to test page
      setTimeout(() => {
        this.openBrowser(`http://localhost:${this.port}/test-local.html`);
      }, 1000);
    });

    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${this.port} is already in use. Try a different port.`);
        process.exit(1);
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down development server...');
      server.close(() => {
        console.log('✅ Server stopped');
        process.exit(0);
      });
    });
  }
}

// CLI usage
if (require.main === module) {
  const port = parseInt(process.argv[2]) || 8000;
  const server = new DevServer(port);
  server.start();
}

export default DevServer;