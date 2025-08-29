const http = require('http');


let server = http.createServer((req,res) => {
    // if (req.url === '/' && req.method === "GET") {    
        if (req.url === '/' && req.method === "POST") {
        // res.setHeader('Content-Type', 'text/html');
       
        res.end("home route");
    }

    if (req.url === '/about') {
        res.end("about route");
    }
});

server.listen(3000,  () => {
    console.log('Server is listening on port 3000');
});

