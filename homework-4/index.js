const express = require('express');
const fs = require('fs');
const path = require('path');
const joi = require('joi');
const filePath = path.join(__dirname, 'users.json');
let customId = 1;

const schema = joi.object({
    firstName: joi.string().min(1).required(),
    lastName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(3),
});
const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.send({
        users
    });
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        res.send({
            user
        });
    } else {
        res.send({
            error: 'User not found'
        });
    }
});

app.put('/users/:id', (req, res) => {
    const result = schema.validate(req.body);
    if (result.error) {
        return res.send({
            error: result.error.details
        });
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = users.find(user => user.id === Number(req.params.id));
    if (user) {
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.age = req.body.age;
        user.city = req.body.city;
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({
            user
        });
    } else {
        res.send({
            error: 'User not found'
        });
    }
});

app.post('/users', (req, res) => {
    const result = schema.validate(req.body);
    if (result.error) {
        return res.send({
            error: result.error.details
        });
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const user = {
        id: ++customId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        city: req.body.city,
    }
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users));
    res.send({
        user
    });
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const userIndex = users.findIndex(user => user.id === Number(req.params.id));
    if (userIndex >= 0) {
        users.splice(userIndex, 1);
        fs.writeFileSync(filePath, JSON.stringify(users));
        res.send({
            message: 'User deleted'
        });
    } else {
        res.send({
            error: 'User not found'
        });
    }
});
app.listen(8080, () => console.log('Started'));