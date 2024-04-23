'use strict';
const express = require('express');
const fs = require('fs');
const app = express();
const viewsFile = 'views.json';
let viewsCounter = {};
if (fs.existsSync(viewsFile)) {
    const data = fs.readFileSync(viewsFile);
    viewsCounter = JSON.parse(data);
}
const saveViews = () => {
    fs.writeFileSync(viewsFile, JSON.stringify(viewsCounter), 'utf8');
};
app.use((req, res, next) => {
    if (!viewsCounter[req.path]) {
        viewsCounter[req.path] = 1;
    } else {
        viewsCounter[req.path]++;
    }
    saveViews();
    next();
});
app.get('/', (req, res) => {
    res.send(`<h1>Head page</h1>
    <p>Счетчик просмотров: ${viewsCounter['/']}</p>
    <a href="/about">Ссылка на страницу /about</a>`);
})

app.get('/about', (req, res) => {
    res.send(`<h1>About</h1>
    <p>Счетчик просмотров: ${viewsCounter['/about']}</p>
    <a href="/">Ссылка на главную страницу</a>`);
});

const PORT = 3000;
app.listen(PORT, () => console.log('Started'));