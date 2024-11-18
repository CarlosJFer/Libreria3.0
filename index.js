const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Primer servidor basico!\n');
});

server.listen(3000, () => {
    console.log('Servidor ejecutandose en http://localhost:3000');
});