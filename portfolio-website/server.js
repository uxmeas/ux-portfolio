const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const port = 3000;
const publicPath = path.join(__dirname);

const server = http.createServer(async (req, res) => {
    try {
        const filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url);
        
        // Check if file exists
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404 Not Found');
        }

        // Set appropriate content type based on file extension
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        }[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error('Error serving file:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
    }
});

server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
