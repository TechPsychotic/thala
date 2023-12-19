const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
rootDir = path.join(__dirname, 'public');
const server = http.createServer((req,res) => {
    let filePath = path.join(rootDir, req.url === '/' ? 'index.html' : req.url);
    let extname = path.extname(filePath);
    let contentType = 'text/html';
    switch(extname){
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
    fs.readFile(filePath, (err, content) => {
        if(err){
            fs.readFile(path.join(rootDir, '404.html'), (err, data) => {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(data, 'utf8');
            });
        }
        else{
            res.writeHead(200, {'Content-Type': contentType});
            res.end(content, 'utf8');
        }
    });
});
server.listen(3000, () => {
    console.log('Server running at port 3000');
});