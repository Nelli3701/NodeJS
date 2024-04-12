'use strict';

const http = require('http');

let viewsCounter = {
    '/': 0,
    '/about': 0
};

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        viewsCounter['/']++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end(`<h1>Head page</h1>
        <p>Счетчик просмотров: ${viewsCounter['/']}</p>
        <a href="/about">Ссылка на страницу /about</a>`);
    } else if (req.url === '/about') {
        viewsCounter['/about']++;
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end(`<h1>About</h1>
        <p>Счетчик просмотров: ${viewsCounter['/about']}</p>
        <a href="/">Ссылка на главную страницу</a>`);
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8'
        });
        res.end('<h1>404</h1>');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log('server on port' + port);
});